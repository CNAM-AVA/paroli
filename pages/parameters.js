import React from 'react'
import Layout from '../src/components/common/Layout';
import { Grid, Typography, withStyles, Button, Paper, Divider, TextField, Snackbar } from '@material-ui/core';
import Router from 'next/router'
import firebase from '../lib/firebase'
import { topMargin } from '../lib/constants'
import LoginModal from '../src/components/common/LoginModal';


/**
 * This is a temporary solution.
 * The login should be performed on the server and set a session coockie, then check it in getInitialProps.
 *  
 * Here, we only set a boolean to localstorage since our
 * firebase auth instance is set on the client. This will prevent
 * any component to load if the user is not logged in.
 * 
 * Also, if the localstorage cache is destroyed manually,
 * the user will be redirected but components will be loaded.
 * 
 * Reference: https://firebase.google.com/docs/auth/admin
 */

const styles = theme => ({
    root: {
        paddingTop: theme.spacing.unit * topMargin
    },
    redirectRoot: {
        textAlign: 'center'
    },
    loginButton: {
        marginTop: 15
    },
    paperRoot: {
        padding: 20
    },
    divider: {
        marginTop: 15,
        marginBottom: 15
    },
    snackBack: {
        backgroundColor: '#50C878'
    }
})

class Parameters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showLoginModal: false,
            emailEdit: '',
            showEmailError: false,
            errorMessage: '',
            currentEmail: firebase.auth().currentUser ? firebase.auth().currentUser.email : '',
            showSnackBar: false
        };

        this.visibilityHandler = this.visibilityHandler.bind(this);
    }

    visibilityHandler() {
        this.setState(prevState => ({
            showLoginModal: !prevState.showLoginModal
        }))
    }

    changePassword() {

    }

    changeEmail() {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValidEmail = !emailRegex.test(String(this.state.emailEdit).toLocaleLowerCase());

        if (isValidEmail) {
            this.setState({
                errorMessage: 'Email invalide',
                showEmailError: true
            })
        } else {
            firebase.auth().currentUser.updateEmail(this.state.emailEdit).then(() => {
                this.setState(prevState => ({
                    currentEmail: prevState.emailEdit,
                    snackbarContent: 'Email modifié !',
                    showSnackBar: true
                }))
            }).catch((error) => {
                console.log(error)
                this.setState({
                    showEmailError: true
                })
            })
        }
    }

    renderRedirectMessage() {

        const { classes } = this.props;

        return (
            <Grid container alignItems={'center'} className={classes.redirectRoot}>
                <Grid item xs={12}>
                    <Typography variant='body2'>
                        Connectez-vous pour accéder à cette page ou retournez à l'accueil.
                    </Typography>
                    <Button
                        onClick={() => this.visibilityHandler()}
                        className={classes.loginButton}
                        variant="contained"
                        color="primary"
                    >
                        Connexion
                    </Button>
                    <LoginModal visible={this.state.showLoginModal} visibilityHandler={this.visibilityHandler} />
                </Grid>
            </Grid>
        )
    }

    renderParameters() {
        const { classes } = this.props;

        return (
            <Paper className={classes.paperRoot}>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={this.state.showSnackBar}
                    onClose={() => this.setState({showSnackBar: false})}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                        classes: {
                            root: classes.snackBack
                        }
                    }}
                    message={<span id="message-id">{this.state.snackbarContent}</span>}
                />
                <Grid container alignItems={"center"}>
                    <Grid item xs={8} sm={8} md={9}>
                        <Typography variant='subtitle1'>
                            Adresse email
                        </Typography>

                        <TextField
                            id="emailinput"
                            label={this.state.currentEmail}
                            className={classes.textField}
                            type="email"
                            autoComplete="current-email"
                            onChange={(e) => this.setState({ emailEdit: e.target.value })}
                        />
                        {
                            this.state.showEmailError
                                ? <Typography variant={"body2"} color={"secondary"}>{this.state.errorMessage}</Typography>
                                : ''
                        }

                    </Grid>
                    <Grid item xs={12} sm={4} md={2}>
                        <Button
                            variant={"contained"}
                            color={"primary"}
                            onClick={() => this.changeEmail()}
                        >
                            Modifier
                        </Button>
                    </Grid>
                </Grid>

                <Divider className={classes.divider} />

                <Grid container alignItems={"center"}>
                    <Grid item xs={8} sm={8} md={9}>
                        <Typography variant='subtitle1'>
                            Mot de passe
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={2}>
                        <Button variant={"contained"} color={"primary"}>Modifier</Button>
                    </Grid>
                </Grid>
            </Paper>
        )
    }

    render() {

        const { classes } = this.props;

        return (
            <Layout>
                <Grid container alignItems={"center"} justify={"center"} className={classes.root}>
                    <Grid item xs={11} md={6}>
                        {
                            !firebase.auth().currentUser
                                ? this.renderRedirectMessage()
                                : this.renderParameters()
                        }
                    </Grid>
                </Grid>
            </Layout>
        );
    }
}

export default withStyles(styles)(Parameters);