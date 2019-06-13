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
    Fab
} from '@material-ui/core'
import Link from "@material-ui/core/Link";
import Auth from '../../../lib/Auth';

const styles = {
    loginButton: {
        margin: '20px 0px 0px 0px'
    },
    fab: {
        marginTop: 20,
        width: '100%'
    },
    registerLink: {
        marginTop: 20,
        textAlign: 'center',
        width: '100%'
    }
}

class RegisterModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordVerif: '',
            error: '',
        }
    }

    editEmailField(e) {
        this.setState({
            email: e.target.value,
            error: ''
        })
    }

    editPasswordField(e) {
        this.setState({
            password: e.target.value,
            error: ''
        })
    }

    editPasswordVerifField(e) {
        this.setState({
            passwordVerif: e.target.value,
            error: ''
        })
    }

    editUsernameField(e) {
        this.setState({
            username: e.target.value,
            error: ''
        })
    }

    register() {

        if (this.state.password !== this.state.passwordVerif) {
            this.setState({error: 'Les mots de passe ne correspondent pas.'});
            return;
        }

        Auth.register(this.state.email, this.state.password)
            .then((r) => {
                let user = r.user;

                let docUser = new User({
                    username: this.state.username,
                    created: user.metadata.creationTime,
                    mail: user.email,
                }, user.uid);

                docUser.save();

                this.props.visibilityHandler();
            })
            .catch((error) => {

                let errorMessage = '';

                switch (error.code) {
                    case 'auth/email-already-in-use':
                        errorMessage = 'Cet email existe déjà.'
                    break;
                    case 'auth/invalid-email':
                        errorMessage = 'Adresse email invalide.'
                    break;
                    case 'auth/operation-not-allowed':
                        errorMessage = 'Opération non permise.'
                    break;
                    case 'auth/weak-password':
                        errorMessage = 'Mot de passe trop faible.'
                    break;

                }

                this.setState({error: errorMessage});
            });
    }

    render() {

        const { classes } = this.props;

        return(
            <Dialog
                open={this.props.visible}
                onClose={this.props.visibilityHandler}
            >
                <DialogTitle id="form-dialog-title">Inscription</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send
                        updates occasionally.
                    </DialogContentText>
                    <br/>
                    <TextField
                        onChange={(e) => this.editUsernameField(e)}
                        autoFocus
                        margin="dense"
                        id="username"
                        label="Pseudo"
                        type="text"
                        fullWidth
                        required
                        variant="outlined"
                    />
                    <TextField
                        onChange={(e) => this.editEmailField(e)}
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
                    <TextField
                        onChange={(e) => this.editPasswordVerifField(e)}
                        margin="dense"
                        id="name"
                        label="Vérifier mot de passe"
                        type="password"
                        fullWidth
                        required
                        variant="outlined"
                    />
                    {this.state.error !== ''
                        ? <Typography variant={'body2'} color="secondary">{this.state.error}</Typography>
                        : ''
                    }
                    <Fab onClick={() => this.register()} variant="extended" color="primary" className={classes.fab}>Inscription</Fab>
                </DialogContent>
            </Dialog>
        )
    }

}

RegisterModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterModal);