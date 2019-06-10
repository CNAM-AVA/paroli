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
			// comments: Array(4).fill(
			// 	{
			// 		id: 6516,
			// 		author: 'r/johnDoe', 
			// 		date: '5 min. ago', 
			// 		content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, \
			// 		dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. \
			// 		Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.',
			// 		upvotes: 10,
			// 		downvotes: 3,
			// 		subComments: [],
			// 	},
			// ),
		}
		this.upvote = this.upvote.bind(this);
		this.downvote = this.downvote.bind(this);
	}

	

	upvote() {
		let post = {...this.props.post};
		post.upvotes = post.upvotes + 1;
		this.setState({post : post});
		console.log('up');
	}

	downvote() {
		let post = {...this.props.post};
		post.downvotes = post.downvotes + 1;
		this.setState({post : post});
		console.log('down');
	}

	render() {
		const {classes} = this.props;
		const post = this.props.post;
		const comments = this.props.comments;

		console.log('post : ', post);

		return(
			<Grid container className={classes.root} justify={"center"}>
				<Grid item md={8} xs={12}>
					<PostCardComponent post={post} upvote={this.upvote} downvote={this.downvote} upvotes={post.upvotes} downvotes={post.downvotes}/>
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
								<CommentComponent comments={comments} post={post}/>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Grid>
		)
	}
}

export default withStyles(styles)(PostComponent);