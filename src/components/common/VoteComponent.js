import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
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

class VoteComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			vote: '',
			upvotes: 0,
			downvotes: 0,
			user: this.props.user,
			postId: this.props.postId,
		};
	}

	componentDidUpdate(prevProps){		
		if(this.props.postId !== prevProps.postId){
			this.setState({postId: this.props.postId});
		}
		if(this.props.user !== prevProps.user){
			this.setState({user: this.props.user});
			if(this.props.user.upvotedPosts || this.props.props.downvotedPosts){
				
				if(this.props.user.upvotedPosts.includes(this.props.postId)){
					this.setState({vote: 'up'});
				}
				if(this.props.user.downvotedPosts.includes(this.props.postId)){
					this.setState({vote: 'down'});
				}
			}
		}
		if(this.props.upvotes !== prevProps.upvotes){
			this.setState({upvotes: this.props.upvotes});
		}
		if(this.props.downvotes !== prevProps.downvotes){
			this.setState({downvotes: this.props.downvotes});
		}
		
	}

	// state = { expanded: false };

  	handleUpvoteClick = () => {
	  	if(this.state.vote !== 'up'){
			let upvotes = this.state.upvotes
			this.setState({
				vote: 'up',
				upvotes: upvotes+1,
			});
			if(this.state.vote)
				this.setState({downvotes : this.state.downvotes - 1});
			this.props.upvote();
		}
	};

	handleDownvoteClick = () => {
		if(this.state.vote !== 'down'){
			let downvotes = this.state.downvotes;
			this.setState({
				vote: 'down',
				downvotes: downvotes+1,
			});
			if(this.state.vote)
				this.setState({upvotes : this.state.upvotes - 1});
			this.props.downvote();
		}
	};

	render() {
		const {classes} = this.props;
		let user = this.state.user;

		return(
			<div className={classes.root}>
				<Grid container direction="column" alignItems="center" justify="flex-start">
					<IconButton className={classes.vote} color={(this.state.vote === 'up') ? 'primary' : 'default'} onClick={() => this.handleUpvoteClick()} aria-pressed="false" aria-label="upvote">
						<ArrowUpIcon/>
					</IconButton>
					<center><Typography style={{fontWeight: 'bold'}}>{this.state.upvotes - this.state.downvotes}</Typography></center>
					<IconButton className={classes.vote} color={(this.state.vote === 'down') ? 'secondary' : 'default'} onClick={() => this.handleDownvoteClick()} aria-pressed="false" aria-label="downvote">
						<ArrowDownIcon/>
					</IconButton>
				</Grid>
			</div>
		)
	}
}

export default withStyles(styles)(VoteComponent);