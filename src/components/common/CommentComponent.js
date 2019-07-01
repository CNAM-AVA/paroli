import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button, TextField, Divider, Snackbar } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import firebase from "../../../lib/firebase";


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
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit,
		marginLeft: 0,
		marginRight: 0,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	card: {
		marginBottom: theme.spacing.unit,
	},
	textField: {
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit,
	},
	snackBar: {
        backgroundColor: '#ffa000'
    },
});

class CommentComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			uid : null,
			multiline : '',
			disabled : true,
			showSnackBar: false,
            snackbarContent: '',

		};
		this.handleMultiline = this.handleMultiline.bind(this);
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user)
				this.setState({uid: user.uid})
			else
				this.setState({uid: null})
		});
	}

	handleMultiline(event) {
		let multiline = event.target.value;
		this.setState({multiline : multiline});
		if(event.target.value === null || event.target.value.trim() === ''){
			this.state.disabled = true;
		} else {
			this.state.disabled = false;
		}
	}
	
	handleComment = () => {
		if(this.state.uid){
			this.props.event(this.state.multiline, this.state.uid);
			this.setState({multiline: ''});
		} else {
			this.setState({
                showSnackBar: true,
                snackbarContent: 'Vous devez vous connecter pour pouvoir commenter'
            });
			console.log('you must log in to comment !');
		}
	}

	render() {
		const {classes} = this.props;
		const bull = <span className={classes.bullet}>•</span>;
		const comments = this.props.comments;

		return(
			<div className={classes.root}>
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
				<TextField
					id="outlined-multiline-flexible"
					label="Commenter"
					multiline
					rows="3"
					value={this.state.multiline}
					onChange={this.handleMultiline}
					className={classes.textField}
					fullWidth
					variant="outlined"
				/>
				<Grid container justify="flex-end">
					<Button variant="contained" color="primary" className={classes.button} disabled={this.state.disabled} onClick={() => this.handleComment()}>
						Commenter
						{/* This Button uses a Font Icon, see the installation instructions in the docs. */}
						<SendIcon className={classes.rightIcon}/>
					</Button>
				</Grid>
				<Divider variant="middle" className={classes.divider}/>
			</div>
		)
	}
}

export default withStyles(styles)(CommentComponent);