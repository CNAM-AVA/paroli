import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import VoteComponent from '../common/VoteComponent';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CommentIcon from '@material-ui/icons/Comment';
import ShareIcon from '@material-ui/icons/Share';
import { Grid, Button, Avatar, Snackbar, Link } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	media: {
		marginTop: 0,
		marginLeft: 'auto',
		marginRight: 'auto',
		width: 500,
		height: 700,
	},
	container: {
		direction: 'row',
		justify: 'center',
		alignItems:'center',
		marginTop: theme.spacing.unit * 4,
		marginBottom: theme.spacing.unit * 4,
	},
	cardHeader: {
		backgroundColor: blue[500],
	},
	typoHeader: {
		color: 'white',
	},
	avatar: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 30,
		height: 30,
	},
	button: {
		margin: theme.spacing.unit,
	},
	leftIcon: {
		marginRight: theme.spacing.unit,
	},
	snackBar: {
        backgroundColor: '#43a047'
    },
});

function DisplayMedia(props){
	const media = props.media;
	const content = props.content;
	const classes = props.className;

	switch(media){
		case 'img': return (
			<Grid container justify="center">
				<img className={classes.media} src={content} title={content}/>
			</Grid>
		);
		case 'video': return (
			<Grid container justify="center">
				<video className={classes.media} autoPlay controls loop>
					<source src={content} type="video/mp4"/>
					Your browser does not support the video tag
				</video>
			</Grid>
		);
		case 'video': return (
			<video autoPlay controls loop>
				<source src={content} type="video/mp4"/>
				Your browser does not support the video tag
			</video>
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

class PostCardComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showSnackBar: false,
			snackbarContent: '',
		}
	}

	copyToCB = () => {
		let el = document.createElement('textarea');
		el.value = window.location.href;
		el.setAttribute('readonly', '');
		el.style.position = 'absolute';
		el.style.left = '-9999px';
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
		this.setState({
			showSnackBar: true,
			snackbarContent: 'le lien du post a été copié dans le presse-papier',
		});
	}

	render() {
		const {classes} = this.props;
		const post = this.props.post;
		const sub = post.sub;
		const user = this.props.user;

		return(
			<Grid container className={classes.container}>
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
				<Grid item xs={1} className={classes.vote}>
					<VoteComponent 
						user={user} 
						postId={post.id} 
						upvote={this.props.upvote} 
						downvote={this.props.downvote} 
						upvotes={post.upvotes} 
						downvotes={post.downvotes}
					/>
				</Grid>
				<Grid item xs={11}>
					<Card className={classes.card}>
							<CardHeader className={classes.cardHeader}
								title={
									<div>
										<Grid container direction={'row'} alignItems={'center'} justify={'space-between'}>
											
											<Grid item>
												<Grid container alignItems={'center'}>
													<Grid item>
														<Link href={`./`}>
															<Avatar alt="Avatar" src="/static/img/logo.png" className={classes.avatar}/>
														</Link>
													</Grid>
													<Grid item>
														<Link href={`./`}>
															<Typography className={classes.typoHeader}>{sub +' - '+ post.created}</Typography>
														</Link>
													</Grid>

												</Grid>
											</Grid>
											
											<Grid item>
												<Grid container alignItems={'center'}>
													<Grid item>
														<Link href={`/user/${post.creator}`}>
															<Typography className={classes.typoHeader}>{post.creator}</Typography>
														</Link>
													</Grid>
													<Grid item>
														<Link href={`/user/${post.creator}`}>
															<Avatar alt="Avatar" src={post.creatorAvatar} className={classes.avatar}/>
														</Link>
													</Grid>
												</Grid>
											</Grid>

										</Grid>
										<Typography className={classes.typoHeader} variant="h6">
											{post.title}
										</Typography>
									</div>
								}
							/>
							<CardContent style={{paddingBottom: 0}}>
								<DisplayMedia className={classes} media={post.type} content={post.content}/>
								<Button color="default" className={classes.button}>
									<CommentIcon className={classes.leftIcon}/> {this.props.nbComments + ' Commentaires'}
								</Button>
								<Button className={classes.button} onClick={() => this.copyToCB()}>
									<ShareIcon className={classes.leftIcon}/>Partager
								</Button>
							</CardContent>
						</Card>
				</Grid>
			</Grid>
		)
	}
}

export default withStyles(styles)(PostCardComponent);