import React from 'react'
import Layout from '../src/components/common/Layout';
import { Grid, Typography, withStyles, Button, Paper, Divider, TextField, Snackbar, Avatar,CircularProgress } from '@material-ui/core';
import Router from 'next/router'
import firebase from '../lib/firebase'
import { topMargin } from '../lib/constants'
import LoginModal from '../src/components/common/LoginModal';
import yellow from '@material-ui/core/colors/yellow';


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
    },
    buttonProgress: {
        color: yellow[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
})

class Parameters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            showLoginModal: false,
            emailEdit: '',
            showEmailError: false,
            errorMessage: '',
            currentEmail: '',
            showSnackBar: false,
            password: '',
            passwordConfirm: '',
            passErrorMessage: '',
            showPasswordError: false,
            profilePicture: null,
            rawFile: null,
            isLoadingUpload: false

        };

        this.visibilityHandler = this.visibilityHandler.bind(this);
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {

                // Download the profile picture
                const ppRef = firebase.storage().ref(`profile_pictures/${user.uid}.png`);
                
                ppRef.getDownloadURL().then((url) => {
                    this.setState({
                        user: user,
                        currentEmail: user.email,
                        profilePicture: url
                    })
                }).catch((error) => {
                    this.setState({
                        user: user,
                        currentEmail: user.email,
                        profilePicture: null
                    })  
                })
            }
            else {
                this.setState({ user: null })
            }
        })
    }

    visibilityHandler() {
        this.setState(prevState => ({
            showLoginModal: !prevState.showLoginModal
        }))
    }

    changePassword() {
        if (this.state.password !== this.state.passwordConfirm) {
            this.setState({
                passErrorMessage: 'Les mots de passe ne correpondent pas.',
                showPasswordError: true
            })
        } else {
            this.state.user.updatePassword(this.state.passwordConfirm).then(() => {
                this.setState(prevState => ({
                    snackbarContent: 'Mot de passe mis à jours !',
                    showSnackBar: true
                }))
            }).catch((error) => {
                console.log(error);
                this.setState({
                    passErrorMessage: 'Une erreur est survenue'
                })
            });
        }
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

    handleUpload(event) {
        const file = event.target.files[0];
        this.setState({
            profilePicture: URL.createObjectURL(file),
            rawFile: file
        })
    }

    changeProfilePicture() {

        const file = this.state.rawFile;

        if (file == null) return;

        this.setState({
            isLoadingUpload: true
        })

        const uuid = this.state.user.uid;
        const fileExtension = file.type.split('/').pop();

        // Create the path reference to the user image
        const storageRef = firebase.storage().ref(`profile_pictures/${uuid}.${fileExtension}`);

        const profilePictureRef = storageRef.put(file).then((snapshot) => {
            console.log('done uploading');
            this.setState({
                showSnackBar: true,
                snackbarContent: 'Image de profil mise à jours !'
            })
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            this.setState({
                isLoadingUpload: false
            })
        })
    }

    renderParameters() {
        const { classes } = this.props;

        return (
            <Paper className={classes.paperRoot}>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={this.state.showSnackBar}
                    onClose={() => this.setState({ showSnackBar: false })}
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
                        <TextField
                            id="emailinput"
                            label={'Nouveau mot de passe'}
                            className={classes.textField}
                            type="password"
                            onChange={(e) => this.setState({ password: e.target.value })}
                        />
                        <br/>
                        <TextField
                            id="emailinput"
                            label={'Confirmer mot de passe'}
                            className={classes.textField}
                            type="password"
                            autoComplete="current-email"
                            onChange={(e) => this.setState({ passwordConfirm: e.target.value })}
                        />
                        <br/>
                        {
                            this.state.showPasswordError
                                ? <Typography variant={"body2"} color={"secondary"}>{this.state.passErrorMessage}</Typography>
                                : ''
                        }
                    </Grid>
                    <Grid item xs={12} sm={4} md={2}>
                        <Button variant={"contained"} color={"primary"} onClick={() => this.changePassword()}>Modifier</Button>
                    </Grid>
                </Grid>

                <Divider className={classes.divider} />

                <Grid container alignItems={"center"}>
                    <Grid item xs={6}>
                        <Typography variant='subtitle1'>
                            Photo
                        </Typography>
                        <input
                            accept="image/png"
                            className={classes.input}
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            type="file"
                            onChange={(e) => this.handleUpload(e)}
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" component="span" className={classes.button}>
                                Télécharger
                            </Button>
                        </label>
                        {
                            this.state.showPasswordError
                                ? <Typography variant={"body2"} color={"secondary"}>{this.state.passErrorMessage}</Typography>
                                : ''
                        }
                    </Grid>
                    <Grid item xs={6}>
                        <Avatar alt="Nouvelle PP" src={this.state.profilePicture} style={{marginTop: 25}}></Avatar>
                    </Grid>
                    <Grid item xs={12} style={{marginTop: 25}}>
                        <div className={classes.wrapper}>
                            <Button variant={"contained"} color={"primary"} fullWidth onClick={() => this.changeProfilePicture()}>Modifier</Button>
                            {this.state.isLoadingUpload && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </div>
                        
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
                            !this.state.user
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