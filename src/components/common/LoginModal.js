import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import firebase from '../../../lib/firebase'
import {
    Dialog,
    DialogTitle,
    DialogContentText,
    DialogContent,
    TextField,
    Typography,
    Fab,
}from '@material-ui/core'

const styles = {
    loginButton: {
        margin: '20px 0px 0px 0px'
    },
    fab: {
        marginTop: 20,
        width: '100%'
    }
}

class LoginModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            showLogginError: false
        }
    }

    classicLogin() {

        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .catch((e) => {
                this.setState({showLogginError: true})
            })

    }

    googleLogin() {

        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth.languageCode = 'fr';

        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }

    render() {

        const { classes } = this.props;

        return(
            <Dialog
                open={this.props.visible}
                onClose={this.props.visibilityHandler}
            >
                <DialogTitle id="form-dialog-title">Connexion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send
                        updates occasionally.
                    </DialogContentText>
                    <br/>
                    <TextField
                        onChange={(e) => this.setState({email: e.target.value})}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        required
                        variant="outlined"
                    />
                    <TextField
                        onChange={(e) => this.setState({password: e.target.value})}
                        margin="dense"
                        id="name"
                        label="Mot de passe"
                        type="password"
                        fullWidth
                        required
                        variant="outlined"
                    />
                    {this.state.showLogginError
                        ? <Typography variant={'body2'} color="secondary">Adresse email ou mot de passe invalide</Typography>
                        : ''
                    }
                    <Typography variant={'body2'}>Mot de passe oublié</Typography>
                    <Fab onClick={() => this.classicLogin()} variant="extended" color="primary" className={classes.fab}>Connexion</Fab>
                    <Fab onClick={() => this.googleLogin()} variant="extended" aria-label="Delete" color={"secondary"} className={classes.fab}>Connexion avec Google</Fab>
                </DialogContent>
            </Dialog>
        );
    }
}

LoginModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginModal);
