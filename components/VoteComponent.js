import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { IconButton, Grid } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDownAlt';


const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	grid: {
		display: 'flex',
		flexDirection: 'column',
		justify: 'flex-start',
	},
});

class CommentComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			vote: ''
		};
	}

	state = { expanded: false };

  handleVoteClick = (vote) => {
    this.setState({vote : vote});
	};

	render() {
		const {classes} = this.props;

		return(
			<div className={classes.root}>
				<Grid container direction="column" alignItems="center" justify="flex-start">
					<IconButton className={classes.vote} color={(this.state.vote === 'up') ? 'primary' : ''} onClick={() => this.handleVoteClick('up')} aria-pressed="false" aria-label="upvote">
						<ThumbUpIcon/>
					</IconButton>
					<center>???</center>
					<IconButton className={classes.vote} color={(this.state.vote === 'down') ? 'secondary' : ''} onClick={() => this.handleVoteClick('down')} aria-pressed="false" aria-label="downvote">
						<ThumbDownIcon/>
					</IconButton>
				</Grid>
			</div>
		)
	}
}

export default withStyles(styles)(CommentComponent);