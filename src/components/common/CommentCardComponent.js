import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Grid, Card, Typography, CardContent, Button, Collapse, TextField } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import VoteComponent from './VoteComponent';
import SendIcon from '@material-ui/icons/Send';


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
		this.upvote = this.upvote.bind(this);
		this.downvote = this.downvote.bind(this);
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
									// onChange={this.handleChange('multiline')}
									className={classes.textField}
									fullWidth
									variant="outlined"
								/>
								<Button variant="contained" color="primary" className={classes.button}>
									Reply
									<SendIcon className={classes.rightIcon}/>
								</Button>
							</Collapse>
						</Grid>
					</Grid>
			</Grid>
		)
	}
}

export default withStyles(styles)(CommentCardComponent);