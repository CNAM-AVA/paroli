import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Grid, Card, Typography, CardContent, Button, Collapse, TextField } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import VoteComponent from './VoteComponent';
import SendIcon from '@material-ui/icons/Send';
import ComDB from '../../../database/models/Comment';
import firebase from "../../../lib/firebase";

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
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
});

class CommentCardComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			multiline : '',
		}
		this.upvote = this.upvote.bind(this);
		this.downvote = this.downvote.bind(this);
		this.getSubComments(props.comment.post, props.comment.id);

		this.handleMultiline = this.handleMultiline.bind(this)
	}

	componentDidMount = async () => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user)
				this.setState({uid: user.uid})
			else
				this.setState({uid: null})
		});
	}

	handleMultiline(event) {
		this.setState({multiline: event.target.value});
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
			console.log('you must log in to comment !');
		}
	}

	getSubComments(postId, commentId){
		let subComments = ComDB.getSubComments(postId, commentId);
		subComments.then(snapshot => {
			if (snapshot.empty) {
				console.log('No matching sub comments.');
				return;
			}
			console.log('sub comments : ', snapshot);
			// this.setState({comments : []});
			// snapshot.forEach(doc => {
			// 	let comments = this.state.comments;
			// 	let comment = doc.data();
			// 	comment.id = doc.id;
			// 	comment.created = moment.unix(comment.created.seconds).fromNow();
			// 	comments.push(comment);
			// 	this.setState({comments : comments});
			// });
		})
		.catch(err => {
			console.log('Error getting sub comments', err);
		});
	}

	state = { expanded: false };

  	handleExpandClick = () => {
		this.setState(state => ({ expanded: !state.expanded }));
		console.log("test");
	};	

	render() {
		const {classes} = this.props;
		const bull = <span>•</span>;
		const comment = this.props.comment;
		const {expanded} = this.state;

		return(
			<Grid container>
					<Grid container>
						<Grid item xs={1}>
							<VoteComponent className={classes.voteComment} upvote={this.upvote} downvote={this.downvote} upvotes={comment.upvotes} downvotes={comment.downvotes} />
						</Grid>
						<Grid item xs={11}>
							<Typography variant="subtitle2" color="textSecondary">
								{comment.creator} {bull} {comment.created}
							</Typography>
							<Typography variant="body1">
								{comment.content}
							</Typography>
							<Button color="default" className={classes.button} onClick={() => this.handleExpandClick()}>
								<CommentIcon className={classes.leftIcon} /><Typography className={classes.small}>Reply</Typography>
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
								<Button variant="contained" color="primary" className={classes.button} onClick={() => this.handleSubComment()}>
									Reply
									<SendIcon className={classes.rightIcon}/>
								</Button>
							</Collapse>
							{/* <CommentCardComponent comment={item} key={Math.random().toString(36).substr(2, 9)}/> */}
						</Grid>
					</Grid>
			</Grid>
		)
	}
}

export default withStyles(styles)(CommentCardComponent);