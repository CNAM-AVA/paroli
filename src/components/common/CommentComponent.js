import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Card, Typography, CardContent, CardActions, Button, TextField, CardHeader, Divider } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';


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
		margin: theme.spacing.unit,
	},
	bullet: {
    display: 'inline-block',
    margin: '0 2px',
		transform: 'scale(0.8)',
	},
	card: {
		marginBottom: theme.spacing.unit,
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
		const comments = this.props.comments;

		const commentsCard = comments.map((item) => {
			return (
				<Grid container>
					<Card className={classes.card} key={Math.random().toString(36).substr(2, 9)}>
						<CardContent>
							<Typography variant="subtitle2" color="textSecondary">
								{item.author} {bull} {item.date}
							</Typography>
							<Typography variant="body1">
								{item.content}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			);
		})

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
					/>
					<Grid container justify="flex-end">
						<Button variant="contained" color="primary" className={classes.button}>
							Commenter
							{/* This Button uses a Font Icon, see the installation instructions in the docs. */}
							<SendIcon className={classes.rightIcon}/>
						</Button>
					</Grid>
					<Divider variant="middle" className={classes.divider}/>
					{commentsCard}
			</div>
		)
	}
}

export default withStyles(styles)(CommentComponent);