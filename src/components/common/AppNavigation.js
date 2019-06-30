import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import MenuIcon from '@material-ui/icons/Menu';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import Link from 'next/link';
import Button from '@material-ui/core/Button'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import firebase from '../../../lib/firebase'
import Select from '@material-ui/core/Select';
import { MenuItem, FormControl, InputLabel, Avatar, Snackbar, Grid } from '@material-ui/core';
import { appName } from '../../../lib/constants'
import { getUserPictureWithID } from '../../../lib/user'
import Router from 'next/router'

const styles = theme => ({
	root: {
		width: '100%',
		height: 'auto',
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		marginRight: theme.spacing.unit,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing.unit,
			width: 'auto',
		},
	},
	searchIcon: {
		width: theme.spacing.unit * 9,
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
		width: '100%',
	},
	inputInput: {
		paddingTop: theme.spacing.unit,
		paddingRight: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
		paddingLeft: theme.spacing.unit * 8,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: 120,
			'&:focus': {
				width: 200,
			},
		},
	},
	list: {
		width: 250,
	},
	fullList: {
		width: 'auto',
	},
	appBar: {
		[theme.breakpoints.down('sm')]: {
			paddingBottom: 50,
		},
		[theme.breakpoints.up('sm')]: {
			paddingBottom: 60,
		},
	},
	avatar: {
		cursor: 'pointer'
	}
});

class AppNavigation extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			left: false,
			showLogin: false,
			showRegister: false,
			showSnackbar: false,
			ppUrl: null,
			textFieldContent: ''
		}
		this.toggleModal = this.toggleModal.bind(this);
		this.toggleRegisterModal = this.toggleRegisterModal.bind(this);
	}

	componentWillMount() {
		// Load the user profilePicture
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				getUserPictureWithID(user.uid).then((url) => {
					this.setState({
						ppUrl: url
					})
				}).catch((error) => {
					console.log(error)
					this.setState({
						ppUrl: null
					})
				})
			}
		})
	}

	componentDidMount() {
		// Add key listener on the search bar
		window.onkeypress = (e) => {
			if (e.keyCode == 13) {
				if (this.state.textFieldContent !== '') {
					if (document.getElementById("searchBar") === document.activeElement) {
						// Search the content
						Router.push({
							pathname: '/search',
							query: { q: this.state.textFieldContent }
						})
					}
				}
			}
		}
	}

	toggleDrawer = (open) => () => {
		this.setState({
			left: open,
		});
	};

	toggleModal(e) {
		// If the user is logged in
		if (e != null && e.target.textContent === 'Déconnexion') {
			firebase.auth().signOut().then(() => {
				// Dummy call to setState to update the UI
				this.setState({ showLogin: false });
			})
			return;
		}

		// User is not logged in, open dialog
		this.setState(prevState => ({
			showLogin: !prevState.showLogin
		}))
	}

	toggleRegisterModal(e) {

		this.setState(prevState => ({
			showLogin: false,
			showRegister: !prevState.showRegister
		}))
	}

	toggleSnackbar() {
		this.setState(prevState => ({
			showSnackbar: !prevState.showSnackbar
		}))
	}

	render() {
		const { classes } = this.props;

		const sideList = (
			<div className={classes.list}>
				<List>
					<Link href="/">
						<ListItem button key={'Accueil'}>
							<ListItemIcon><HomeIcon /></ListItemIcon>
							<ListItemText primary={'Accueil'} />
						</ListItem>
					</Link>
				</List>
			</div>
		);

		const appBar = (
			<div className={classes.root}>
				<AppBar position="fixed">
					<Toolbar>
						<IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer" onClick={this.toggleDrawer(true)}>
							<MenuIcon />
						</IconButton>
						<Typography className={classes.title} variant="h6" color="inherit" noWrap>
							<Link href="/">
								<a>{appName}</a>
							</Link>
						</Typography>
						<div className={classes.grow} />
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								id="searchBar"
								placeholder="Rechercher…"
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								onChange={(e) => this.setState({ textFieldContent: e.target.value })}
							/>
						</div>
						{
							firebase.auth().currentUser
								? <Avatar className={classes.avatar} onClick={() => this.toggleSnackbar()} src={this.state.ppUrl}></Avatar>
								: <Button onClick={(e) => this.toggleModal(e)} variant={"outlined"} color={"inherit"}>Connexion</Button>
						}
						<Snackbar
							anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
							open={this.state.showSnackbar}
							onClose={() => this.toggleSnackbar()}
							ContentProps={{
								'aria-describedby': 'message-id',
							}}
							message={
								<Grid container spacing={16}>
									<Grid item>
										<Link href="/parameters">
											<Button color={"primary"} variant={"contained"}>Paramètres</Button>
										</Link>
									</Grid>
									<Grid item>
										<Button onClick={(e) => { this.toggleSnackbar(); this.toggleModal(e) }} color={"secondary"} variant={"contained"}>Déconnexion</Button>
									</Grid>
								</Grid>
							}
						/>
					</Toolbar>
				</AppBar>
				<style jsx global>{`
					a {
						text-decoration: none;
						color: inherit;
					}
				`}
				</style>
				<LoginModal visible={this.state.showLogin} visibilityHandler={this.toggleModal} registerHandle={this.toggleRegisterModal} />
				<RegisterModal visible={this.state.showRegister} visibilityHandler={this.toggleRegisterModal} />
			</div>
		)

		return (
			<div className={classes.appBar}>
				{appBar}
				<Drawer open={this.state.left} onClose={this.toggleDrawer(false)} >
					<div
						tabIndex={0}
						role="button"
						onClick={this.toggleDrawer(false)}
						onKeyDown={this.toggleDrawer(false)}
					>
						{sideList}
					</div>
				</Drawer>
			</div>
		);
	}
}

AppNavigation.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppNavigation);
