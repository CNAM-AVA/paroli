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
		backgroundColor: 'grey'
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

class PostComponent extends React.Component {

	constructor(props) {
		super(props);
	}

	state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

	render() {
		const {classes} = this.props;

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
											<Typography variant="h5" gutterBottom>
												Titre de la publication
											</Typography>
										}
										subheader="Auteur et date de la publication"
									/>
									<CardMedia
										className={classes.media}
										image="/static/img/landscape-img-test.jpg"
										title="contenu publication"
									/>
									<CardContent>
										<Button color="default" className={classes.button}>
											<CommentIcon className={classes.leftIcon}/> ??? Comments
										</Button>
										<Button className={classes.button}>
											<ShareIcon className={classes.leftIcon}/>Share
										</Button>
										<CommentComponent/>
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