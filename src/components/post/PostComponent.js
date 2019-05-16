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
	cardHeader: {
		
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
			post: {title : 'Titre', author: 'John Doe', media: 'img', content : '/static/img/landscape-img-test.jpg', date: '??/??/????'},
			comments: Array(9).fill(
				{author: 'John Doe', date: '??/??/????', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.'},
			)
		}
	}

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

	render() {
		const {classes} = this.props;
		const post = this.state.post;
		const comments = this.state.comments;

		return(
			<div className={classes.root}>
					<Grid container className={classes.container}>
							<Grid item xs={2}></Grid>
								<Grid item xs={8}>
									<PostCardComponent post={post}/>
								</Grid>
							<Grid item xs={2}></Grid>
					</Grid>
					<Grid container>
						<Grid item xs={2}></Grid>
						<Grid item xs={1}></Grid>
						<Grid item xs={7}>
							<Card className={classes.card}>
								<CardHeader>

								</CardHeader>
								<CardContent>
									<CommentComponent comments={comments}/>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={2}>
						</Grid>
					</Grid>
			</div>
		)
	}
}

export default withStyles(styles)(PostComponent);