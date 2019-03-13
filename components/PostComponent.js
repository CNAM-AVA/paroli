import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Grid, Paper } from '@material-ui/core';

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
  avatar: {
    backgroundColor: red[500],
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
					<Grid container spacing={24}>
						<Grid item xs>
							{/* <Paper className={classes.paper}>
							</Paper> */}
						</Grid>
						<Grid item xs={9}>
							<Paper className={classes.paper}>
							<Card className={classes.card}>
									<CardHeader
										avatar={
											<Avatar aria-label="Recipe" className={classes.avatar}>
												R
											</Avatar>
										}
										action={
											<IconButton>
												<MoreVertIcon />
											</IconButton>
										}
										title="Titre de la publication"
										subheader="Auteur et date de la publication"
									/>
									<CardMedia
										className={classes.media}
										image="/static/img/image-publication.png"
										title="contenu publication"
									/>
									<CardContent>
										<Typography component="p">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, 
											dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.
										</Typography>
									</CardContent>
									<CardActions className={classes.actions} disableActionSpacing>
										<IconButton aria-label="Add to favorites">
											<FavoriteIcon />
										</IconButton>
										<IconButton aria-label="Share">
											<ShareIcon />
										</IconButton>
										<IconButton
											className={classnames(classes.expand, {
												[classes.expandOpen]: this.state.expanded,
											})}
											onClick={this.handleExpandClick}
											aria-expanded={this.state.expanded}
											aria-label="Show more"
										>
											<ExpandMoreIcon />
										</IconButton>
									</CardActions>
									<Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
										<CardContent>
											<Typography paragraph>Lorem ipsum :</Typography>
											<Typography paragraph>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											</Typography>
											<Typography paragraph>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, 
													dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, 
											varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non 
											fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, 
											enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. 
											Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. 
											Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices 
											posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante 
											non diam sodales hendrerit. Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel 
											massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, 
											in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis. Curabitur aliquet pellentesque diam. 
											Integer quis metus vitae elit lobortis egestas. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi vel erat non mauris convallis vehicula. Nulla et sapien. Integer tortor tellus, aliquam faucibus, convallis id, congue eu, quam. Mauris ullamcorper felis vitae erat. Proin feugiat, augue non elementum posuere, metus purus iaculis lectus, et tristique ligula justo vitae magna. Aliquam convallis sollicitudin purus. Praesent aliquam, enim at fermentum mollis, ligula massa adipiscing nisl, ac euismod nibh nisl eu lectus. Fusce vulputate sem at sapien. Vivamus leo. Aliquam euismod libero eu enim. Nulla nec felis sed leo placerat imperdiet. Aenean suscipit nulla in justo. Suspendisse cursus rutrum augue. Nulla tincidunt tincidunt mi. Curabitur iaculis, lorem vel rhoncus faucibus, felis magna fermentum augue, et ultricies lacus lorem varius purus. Curabitur eu amet.
											</Typography>
											<Typography paragraph>
												Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											</Typography>
											<Typography>
												Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											</Typography>
										</CardContent>
									</Collapse>
								</Card>
							</Paper>
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