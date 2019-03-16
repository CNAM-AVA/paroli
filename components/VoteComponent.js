import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDownAlt';


const styles = theme => ({
	root: {
		marginTop : theme.spacing.unit * 2,
		flexGrow: 1,
	},
	vote: {
		display: 'flex',
		flexDirection: 'column',
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
				<IconButton className={classes.voteButton} color={(this.state.vote === 'up') ? 'primary' : ''} onClick={() => this.handleVoteClick('up')} aria-pressed="false" aria-label="upvote">
					<ThumbUpIcon/>
				</IconButton>
				<center>???</center>
				<IconButton className={classes.voteButton} color={(this.state.vote === 'down') ? 'secondary' : ''} onClick={() => this.handleVoteClick('down')} aria-pressed="false" aria-label="downvote">
					<ThumbDownIcon/>
				</IconButton>
			</div>
		)
	}
}

export default withStyles(styles)(CommentComponent);