import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Card, Typography, CardContent, CardActions, Button, TextField, CardHeader, Divider } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import CommentCardComponent from './CommentCardComponent';
import Comment from "../../../database/models/Comment";
import firebase from "../../../lib/firebase";


const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	paper: {
  	padding: theme.spacing.unit * 2,
    // margin: 'auto',
    // maxWidth: 500,
  },
	cardsContainer: {
		marginTop: 20
	},
	link: {
		textDecoration: 'none',
		color: theme.primary
	},
	rightIcon: {
		marginLeft: theme.spacing.unit,
	},
	control: {
		padding: theme.spacing.unit * 2,
	},
	card: {
    // maxWidth: 400,
  },
  media: {
		marginTop: 0,
		marginLeft: 'auto',
		marginRight: 'auto',
		width: 500,
    height: 700,
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
	},
	divider: {
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit,
		marginLeft: 0,
		marginRight: 0,
	},
	bullet: {
    display: 'inline-block',
    margin: '0 2px',
		transform: 'scale(0.8)',
	},
	card: {
		marginBottom: theme.spacing.unit,
	},
	textField: {
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit,
	},
});

class CommentComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			multiline : '',
		}
		this.handleMultiline = this.handleMultiline.bind(this);
	}

	componentDidMount = async () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user)
                this.setState({uid: user.uid})
            else
                this.setState({uid: null})
        })
    }

	handleMultiline(event) {
        this.setState({multiline: event.target.value});
    }
	
	createComment() {
        if (this.state.uid) {
            let comment = new Comment({
                creator: this.state.uid,
				created: new Date(),
				post: this.props.post.id,
                content: this.state.multiline
            });
			comment.save();
			this.setState({multiline: ''});
        }
    }

	render() {
		const {classes} = this.props;
		const bull = <span className={classes.bullet}>•</span>;
		const comments = this.props.comments;
		console.log('toto: ', comments);

		const commentsCard = comments.map((item) => {
			return (<CommentCardComponent comment={item} key={Math.random().toString(36).substr(2, 9)}/>);
		});

		console.log(commentsCard);

		return(
			<div className={classes.root}>
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
					<Grid container justify="flex-end">
						<Button variant="contained" color="primary" className={classes.button} onClick={() => this.createComment()}>
							Commenter
							{/* This Button uses a Font Icon, see the installation instructions in the docs. */}
							<SendIcon className={classes.rightIcon}/>
						</Button>
					</Grid>
					<Divider variant="middle" className={classes.divider}/>
						{ commentsCard.length 
							? (commentsCard)
							: <center><Typography variant="body1" style={{margin: '30px'}}>Be the first to comment !</Typography></center> 
						}
					
			</div>
		)
	}
}

export default withStyles(styles)(CommentComponent);