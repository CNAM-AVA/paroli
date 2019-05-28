import React from 'react'
import Layout from '../src/components/common/Layout';
import { Grid, Typography, withStyles, Button } from '@material-ui/core';
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
    }
})

class Parameters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showLoginModal: false
        };

        this.visibilityHandler = this.visibilityHandler.bind(this);
    }

    visibilityHandler() {
        this.setState(prevState => ({
            showLoginModal: !prevState.showLoginModal
        }))
    }

    renderRedirectMessage() {

        const { classes } = this.props;

        return(
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
                    <LoginModal visible={this.state.showLoginModal} visibilityHandler={this.visibilityHandler}/>
                </Grid>
            </Grid>
        )
    }

    renderParameters() {
        const { classes } = this.props;

        return(
            <Typography variant='body1'>
                Yes
            </Typography>
        )
    }

    render() {

        const { classes } = this.props;

        return(
            <Layout>
                <Grid container alignItems={"center"} justify={"center"} className={classes.root}>
                    <Grid item xs={6}>
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