import React from 'react'
import Layout from '../src/components/common/Layout';
import { Grid, Typography } from '@material-ui/core';
import Router from 'next/router'
import firebase from '../lib/firebase'


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
export default class Parameters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    static async getInitialProps(req) {
        // This code is running server side
        // if (window === 'undefined') {
        //     // Require firebase admin and check the user token
        // } else {
        //     if (!firebase.auth().currentUser) {
        //         window.location.replace('/');
        //     }
        // }

        return {};
    }

    render() {
        return(
            <Layout>
                <Grid container alignItems={"center"} justify={"center"}>
                    <Grid item xs={6}>
                        <Typography variant={"body2"}>
                            Paramètres
                        </Typography>
                    </Grid>
                </Grid>
            </Layout>
        );
    }
}