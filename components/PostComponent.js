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
import CommentComponent from './CommentComponent';
import VoteComponent from './VoteComponent';

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
});

function DisplayMedia(props){
	const media = props.media;
	const content = props.content;
	const classes = props.className;

	switch(media){
		case 'img': return (
			<CardMedia
				className={classes.media}
				image={content}
				title="contenu publication"
			/>
		);
		case 'link': return (
			<CardContent className={classes.cardContent2}>
				<Typography variant="subtitle1">
					<Link href={content}>{content}</Link>
				</Typography>
			</CardContent>
		);
		default : return (
			<CardContent className={classes.cardContent2}>
				<Typography variant="subtitle1">
					{content}
				</Typography>
			</CardContent>
		);
	}
}

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
					<Grid container>
						<Grid item xs>
							{/* <Paper className={classes.paper}>
							</Paper> */}
						</Grid>
						<Grid item xs={9}>
							<Card className={classes.card}>
									<CardHeader
										avatar={
											<VoteComponent/>
										}
										title={
											<div>
												<Typography variant="subtitle2" color="textSecondary">
												{'Posté par '+post.author+' le '+post.date}
												</Typography>
												<Typography variant="h5" gutterBottom>
													{post.title}
												</Typography>
											</div>
										}
										subheader={
											<DisplayMedia className={classes} media={post.media} content={post.content}/>											
										}
									/>
									<CardContent>
										<Button color="default" className={classes.button}>
											<CommentIcon className={classes.leftIcon}/> ??? Comments
										</Button>
										<Button className={classes.button}>
											<ShareIcon className={classes.leftIcon}/>Share
										</Button>
										<CommentComponent comments={comments}/>
									</CardContent>
								</Card>
						</Grid>
						<Grid item xs>
							{/* <Paper className={classes.paper}>
							</Paper> */}
						</Grid>
					</Grid>
			</div>
		)
	}
}

export default withStyles(styles)(PostComponent);