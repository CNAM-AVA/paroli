import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDownAlt';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import ArrowUpIcon from '@material-ui/icons/KeyboardArrowUpRounded';


const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	grid: {
		display: 'flex',
		flexDirection: 'column',
		justify: 'flex-start',
	},
	vote: {
		padding: '7px'
	}
});

class CommentComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			vote: '',
		};
	}

	state = { expanded: false };

  handleUpvoteClick = () => {
		this.setState({vote: 'up'});
		this.props.upvote();
	};

	handleDownvoteClick = () => {
		this.setState({vote: 'down'});
		this.props.downvote();
	};

	render() {
		const {classes} = this.props;

		return(
			<div className={classes.root}>
				<Grid container direction="column" alignItems="center" justify="flex-start">
					<IconButton className={classes.vote} color={(this.state.vote === 'up') ? 'primary' : 'default'} onClick={() => this.handleUpvoteClick()} aria-pressed="false" aria-label="upvote">
						<ArrowUpIcon/>
					</IconButton>
					<center><Typography style={{fontWeight: 'bold'}}>{this.props.upvotes - this.props.downvotes}</Typography></center>
					<IconButton className={classes.vote} color={(this.state.vote === 'down') ? 'secondary' : 'default'} onClick={() => this.handleDownvoteClick()} aria-pressed="false" aria-label="downvote">
						<ArrowDownIcon/>
					</IconButton>
				</Grid>
			</div>
		)
	}
}

export default withStyles(styles)(CommentComponent);