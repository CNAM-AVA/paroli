import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CommentIcon from '@material-ui/icons/Comment';
import ShareIcon from '@material-ui/icons/Share';
import { Grid, Paper, Icon, Button } from '@material-ui/core';
import CommentComponent from '../common/CommentComponent';
import PostCardComponent from '../common/PostCardComponent';
import CommentCardComponent from '../common/CommentCardComponent';
import pink from '@material-ui/core/colors/pink';


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
	cardHeaderCom: {
		backgroundColor: pink[500],
	},
	typoHeader: {
		color: 'white',
	},
	button: {
		margin: theme.spacing.unit,
	},
	leftIcon: {
		marginRight: theme.spacing.unit,
	},
	control: {
		padding: theme.spacing.unit * 2,
	},
	card: {
		color: 'secondary',
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
	container: {
		alignItems:'center',
		justify: 'center',
		marginTop: theme.spacing.unit * 4,
		marginBottom: theme.spacing.unit * 4,
	},
});

class PostComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		}
		// this.upvote = this.upvote.bind(this);
		// this.downvote = this.downvote.bind(this);
	}

	// upvote() {
	// 	let post = this.props.post;
	// 	post.upvotes = post.upvotes + 1;
	// 	this.setState({post : post});
	// 	console.log('up');
	// }

	// downvote() {
	// 	let post = this.props.post;
	// 	post.downvotes = post.downvotes + 1;
	// 	this.setState({post : post});
	// 	console.log('down');
	// }

	render() {
		const {classes} = this.props;
		const post = this.props.post;
		const comments = this.props.comments;
		const user = this.props.user;

		const commentsCard = comments.map((item) => {
			return (<CommentCardComponent comment={item} key={Math.random().toString(36).substr(2, 9)} event={this.props.event}/>);
		});

		return(
			<Grid container className={classes.root} justify={"center"}>
				<Grid item md={8} xs={12}>
					<PostCardComponent post={post} upvote={this.props.upvote} downvote={this.props.downvote} upvotes={post.upvotes} downvotes={post.downvotes} user={user}/>
				</Grid>
				<Grid container item md={8} xs={12} >
					<Grid item md={1}></Grid>
					<Grid item md={11} xs={12}>
						<Card className={classes.card}>
							<CardHeader className={classes.cardHeaderCom}
							title={
								<Typography className={classes.typoHeader} variant="h6" >
									{'Comments'}
								</Typography>
							}>
							</CardHeader>
							<CardContent>
								<CommentComponent comments={comments} post={post} upvote={this.upvote} downvote={this.downvote} upvotes={post.upvotes} downvotes={post.downvotes} event={this.props.event}/>
								{ commentsCard.length 
									? (commentsCard)
									: <center style={{margin: '30px'}}><Typography variant="h6">No comments yet</Typography><Typography variant="body1">Be the first to comment !</Typography></center> 
								}
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Grid>
		)
	}
}

export default withStyles(styles)(PostComponent);