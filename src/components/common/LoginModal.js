import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import firebase from '../../../lib/firebase'
import anime from 'animejs'
import {
    Dialog,
    DialogTitle,
    DialogContentText,
    DialogContent,
    TextField,
    Typography,
    Fab,
}from '@material-ui/core'
import Link from "@material-ui/core/Link";

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
            forgotEmail: '',
            forgotFabText: 'Envoyer l\'email',
            showLoginError: false,
            showForgotPassword: false,
            emailVerificationButtonDisabled: true,
            showForgotEmailError: false
        }
    }

    classicLogin() {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.props.visibilityHandler()
            })
            .catch((e) => {
                this.setState({showLoginError: true})
            })
    }

    toggleForgotPassword() {
        this.setState(prevState => ({
            showForgotPassword: !prevState.showForgotPassword
        }))

        console.log(this.state.showForgotPassword)
    }

    googleLogin() {

        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth.languageCode = 'fr';

        firebase.auth().signInWithPopup(provider).then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // Hide the dialog
            this.props.visibilityHandler();
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            console.error('error with google login ' + errorMessage)
        });
    }

    sendVerificationEmail() {

        firebase.auth().sendPasswordResetEmail(this.state.forgotEmail).then(() => {
            anime({
                targets: '#forgotPasswordFab',
                backgroundColor: "#32CD32",
                duration: 500
            })
            this.setState({
                forgotFabText: 'Email envoyé',
                showForgotEmailError: false
            })
        }).catch((e) => {
            this.setState({showForgotEmailError: true})
        })
    }

    editForgotPasswordField(e) {

        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValidEmail = !emailRegex.test(String(e.target.value).toLocaleLowerCase());

        this.setState({
            forgotEmail: e.target.value,
            emailVerificationButtonDisabled: isValidEmail
        })
    }

    editEmailField(e) {
        if (this.state.showLoginError) this.setState({showLoginError: false});
        this.setState({email: e.target.value})
    }

    editPasswordField(e) {
        if (this.state.showLoginError) this.setState({showLoginError: false});
        this.setState({password: e.target.value})
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
                        onChange={(e) => this.editEmailField(e)}
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Addresse email"
                        type="email"
                        fullWidth
                        required
                        variant="outlined"
                    />
                    <TextField
                        onChange={(e) => this.editPasswordField(e)}
                        margin="dense"
                        id="name"
                        label="Mot de passe"
                        type="password"
                        fullWidth
                        required
                        variant="outlined"
                    />
                    {this.state.showLoginError
                        ? <Typography variant={'body2'} color="secondary">Adresse email ou mot de passe invalide</Typography>
                        : ''
                    }
                    <Link onClick={() => this.toggleForgotPassword()} component={"button"} variant={'body2'}>Mot de passe oublié</Link>
                    <Fab onClick={() => this.classicLogin()} variant="extended" color="primary" className={classes.fab}>Connexion</Fab>
                    <Fab onClick={() => this.googleLogin()} variant="extended" aria-label="Delete" color={"secondary"} className={classes.fab}>Connexion avec Google</Fab>
                    <Dialog
                        open={this.state.showForgotPassword}
                        onClose={() => this.toggleForgotPassword()}
                    >
                        <DialogTitle>Mot de passe oublié</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Vous avez oublié votre mot de passe ? <br/>Remplissez le champ ci-dessous.
                                Vous recevrez un email de réinitialisation du mot de passe.
                            </DialogContentText>
                            <br/>
                            <TextField
                                onChange={(e) => this.editForgotPasswordField(e)}
                                margin="dense"
                                id="forgot"
                                label="Adresse email"
                                fullWidth
                                variant="outlined"
                                type={"email"}
                                required
                                autoFocus
                            />
                            {this.state.showForgotEmailError
                                ? <Typography variant={'body2'} color="secondary">Utilisateur inexistant</Typography>
                                : ''
                            }
                            <Fab id="forgotPasswordFab" disabled={this.state.emailVerificationButtonDisabled} onClick={() => this.sendVerificationEmail()} variant="extended" color="primary" className={classes.fab}>{this.state.forgotFabText}</Fab>
                        </DialogContent>
                    </Dialog>
                </DialogContent>
            </Dialog>
        );
    }
}

LoginModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginModal);
