import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Grid, Card, Typography, CardContent, Button } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import VoteComponent from './VoteComponent';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	button: {
	},
	leftIcon: {
		marginRight: theme.spacing.unit,
	},
	voteComment: {
	},
});

class CommentCardComponent extends React.Component {

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
		const comment = this.props.comment;

		return(
			<Grid container>
				<div key={Math.random().toString(36).substr(2, 9)}>
					<Grid container>
						<Grid item xs={1}>
							<VoteComponent className={classes.voteComment}/>
						</Grid>
						<Grid item xs={11}>
							<Typography variant="subtitle2" color="textSecondary">
								{comment.author} {bull} {comment.date}
							</Typography>
							<Typography variant="body1">
								{comment.content}
							</Typography>
							<Button color="default" className={classes.button}>
								<CommentIcon className={classes.leftIcon}/>Reply
							</Button>
						</Grid>
					</Grid>
				</div>
			</Grid>
		)
	}
}

export default withStyles(styles)(CommentCardComponent);