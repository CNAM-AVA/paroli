import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Card, Typography, CardContent, CardActions, Button, TextField, CardHeader, Divider } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';


const styles = theme => ({
	root: {
		marginTop : theme.spacing.unit * 2,
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
		margin: theme.spacing.unit,
	},
});

class CommentComponent extends React.Component {

	constructor(props) {
		super(props);
	}

	state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

	render() {
		const {classes} = this.props;
		const bull = <span className={classes.bullet}>•</span>;

		return(
			<div className={classes.root}>
				<TextField
					id="outlined-multiline-flexible"
					label="Commenter"
					multiline
					rows="3"
					value={this.state.multiline}
					// onChange={this.handleChange('multiline')}
					className={classes.textField}
					fullWidth
					margin="dense"
					variant="outlined"
					gutterBottom
				/>
				<Grid container justify="flex-end">
					<Button variant="contained" color="primary" className={classes.button}>
						Commenter
						{/* This Button uses a Font Icon, see the installation instructions in the docs. */}
						<SendIcon className={classes.rightIcon}/>
					</Button>
				</Grid>
				<Divider variant="middle" className={classes.divider}/>
				<Typography variant="subtitle1" gutterBottom>
					Commentaires
				</Typography>
				<Card>
					<CardContent>
						<Typography variant="subtitle2" color="textSecondary">
							John Doe {bull} date du commentaire
						</Typography>
						<Typography variant="body1">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, 
							dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.
						</Typography>
					</CardContent>
				</Card>
			</div>
		)
	}
}

export default withStyles(styles)(CommentComponent);