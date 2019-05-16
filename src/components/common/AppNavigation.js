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
import SearchIcon from '@material-ui/icons/Search';
import Link from 'next/link';
import Button from '@material-ui/core/Button'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import firebase from '../../../lib/firebase'
import Select from '@material-ui/core/Select';
import { MenuItem, FormControl, InputLabel } from '@material-ui/core';

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
			showRegister: false
		}
		this.toggleModal = this.toggleModal.bind(this);
		this.toggleRegisterModal = this.toggleRegisterModal.bind(this);

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
				this.setState({showLogin: false});
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

	render() {
		const { classes } = this.props;

		const sideList = (
			<div className={classes.list}>
				<List>
					<Link href="/">
						<ListItem button key={'Dashboard'}>
							<ListItemIcon><InboxIcon /></ListItemIcon>
							<ListItemText primary={'Dashboard'} />
						</ListItem>
					</Link>
					<Link href="/vled">
						<ListItem button key={'Board Builder'}>
							<ListItemIcon><InboxIcon/></ListItemIcon>
							<ListItemText primary={'Board Builder'} />
						</ListItem>
					</Link>
					<Link href="/">
						<ListItem button key={'Configs'}>
							<ListItemIcon><InboxIcon/></ListItemIcon>
							<ListItemText primary={'Configs'} />
						</ListItem>
					</Link>
					<Link href="/sub">
						<ListItem button key={'Sub'}>
							<ListItemIcon><InboxIcon/></ListItemIcon>
							<ListItemText primary={'Sub'} />
						</ListItem>
					</Link>
					<Link href="/post">
						<ListItem button key={'Post'}>
							<ListItemIcon><InboxIcon/></ListItemIcon>
							<ListItemText primary={'Post'} />
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
								<a>Reddit</a>
							</Link>
						</Typography>
						<div className={classes.grow} />
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder="Rechercher…"
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
							/>
						</div>
						{
							firebase.auth().currentUser
							? <Button onClick={(e) => this.toggleModal(e)} variant={"outlined"} color={"inherit"}>Déconnexion</Button>
							: <Button onClick={(e) => this.toggleModal(e)} variant={"outlined"} color={"inherit"}>Connexion</Button>
						}
						
					</Toolbar>
				</AppBar>
				<style jsx global>{`
					a {
						text-decoration: none;
						color: inherit;
					}
				`}
				</style>
				<LoginModal visible={this.state.showLogin} visibilityHandler={this.toggleModal} registerHandle={this.toggleRegisterModal}/>
				<RegisterModal visible={this.state.showRegister} visibilityHandler={this.toggleRegisterModal}/>
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
