import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Grid, Card, Typography, CardContent, Button, Collapse, TextField, Snackbar } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import VoteComponent from './VoteComponent';
import SendIcon from '@material-ui/icons/Send';
import UserDB from '../../../database/models/User';
import ComDB from '../../../database/models/Comment';
import firebase from "../../../lib/firebase";
import moment from 'moment';


const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	button: {
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit,
	},
	leftIcon: {
		marginRight: theme.spacing.unit,
		fontSize: theme.spacing.unit * 2,
	},
	rightIcon: {
		marginLeft: theme.spacing.unit,
		fontSize: theme.spacing.unit * 2,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	sub: {
		marginLeft : '20px',
	},
	snackBar: {
        backgroundColor: '#ffa000'
    },
});

class CommentCardComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			subComments: [],
			multiline : '',
			disabled: true,
			showSnackBar: false,
            snackbarContent: '',
		}
		this.handleMultiline = this.handleMultiline.bind(this)
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user)
				this.setState({uid: user.uid})
			else
				this.setState({uid: null})
		});
		this.getSubComments(this.props.comment.post, this.props.comment.id);
	}

	handleMultiline(event) {
		this.setState({multiline: event.target.value});
		if(event.target.value === null || event.target.value.trim() === ''){
			this.setState({disabled: true});
		} else {
			this.setState({disabled: false});
		}
	}

	upvote(){
		let comment = this.props.comment;
		comment.upvotes = comment.upvotes + 1;
		this.setState({comment : comment});
		console.log('up');
	}

	downvote(){
		let comment = this.props.comment;
		comment.downvotes = comment.downvotes + 1;
		this.setState({comment : comment});
		console.log('down');
	}

	handleSubComment = () => {
		if(this.state.uid != null){
			this.props.event(this.state.multiline, this.state.uid, this.props.comment.id);
			this.setState({multiline: ''});
		} else {
			this.setState({
                showSnackBar: true,
                snackbarContent: 'Vous devez vous connecter pour pouvoir commenter'
            });
			console.log('you must log in to comment !');
		}
	}

	loadSubCommentCreator(creatorId, index){
		UserDB.getById(creatorId).then(doc => {
			if (!doc.exists) {
				console.log('No such creator!');
			} else {
				let subComments = this.state.subComments;
				subComments[index].creator = doc.data().username; 
				this.setState({subComments : subComments});
			}
		})
		.catch(err => {
			console.log('Error getting subCommentCreator', err);
		});
	}

	getSubComments(postId, commentId){
		let subComments = ComDB.getSubComments(postId, commentId);
		subComments.then(snapshot => {
			if (snapshot.empty) {
				console.log('No matching sub comments.');
				return;
			}
			snapshot.forEach(doc => {
				let subComments = this.state.subComments;
				let subComment = doc.data();
				subComment.id = doc.id;
				subComment.created = moment.unix(subComment.created.seconds).fromNow();
				let length = subComments.push(subComment);
				this.setState({subComments : subComments});
				this.loadSubCommentCreator(subComment.creator, length-1);
			});
		})
		.catch(err => {
			console.log('Error getting sub comments', err);
		});
	}

	state = { expanded: false };

  	handleExpandClick = () => {
		this.setState(state => ({ expanded: !state.expanded }));
	};	

	render() {
		const {classes} = this.props;
		const bull = <span>•</span>;
		const comment = this.props.comment;
		const subComments = this.state.subComments;
		const {expanded} = this.state;
		const disabled = this.state.disabled;
		const sub = this.props.sub;

		const commentsCard = subComments.map((item) => {
			return <CommentCardComponent sub={true} comment={item} key={Math.random().toString(36).substr(2, 9)} event={this.props.event} classes={classes} />;
		});

		return(
			<Grid container>
				<Snackbar
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					open={this.state.showSnackBar}
					autoHideDuration={6000}
					onClose={() => this.setState({ showSnackBar: false })}
					ContentProps={{
						'aria-describedby': 'message-id',
						classes: {
							root: classes.snackBar
						}
					}}
					message={<span id="message-id">{this.state.snackbarContent}</span>}
				/>
				<Grid item xs={sub ? 1 : false}>

				</Grid>
					{/* <VoteComponent className={classes.voteComment} upvote={this.upvote} downvote={this.downvote} upvotes={comment.upvotes} downvotes={comment.downvotes} /> */}
 				<Grid item xs={sub ? 11 : true}>
				
					<Typography variant="subtitle2" color="textSecondary">
						{comment.creator} {bull} {comment.created}
					</Typography>
					<Typography variant="body1">
						{comment.content}
					</Typography>
					<Button color="default" onClick={() => this.handleExpandClick()}>
						<CommentIcon className={classes.leftIcon}/><Typography >Répondre</Typography>
					</Button>
					<Collapse in={expanded}>
						<TextField
							id="outlined-multiline-flexible"
							label="Commenter"
							multiline
							rows="3"
							value={this.state.multiline}
							onChange={this.handleMultiline}
							className={classes.textField}
							fullWidth
							variant="outlined"
						/>
						<Button variant="contained" color="primary" className={classes.button} disabled={disabled} onClick={() => this.handleSubComment()}>
							Répondre
							<SendIcon className={classes.rightIcon}/>
						</Button>
					</Collapse>
					{commentsCard}
				</Grid>
			</Grid>
		)
	}
}

export default withStyles(styles)(CommentCardComponent);