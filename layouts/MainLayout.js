import Head from 'next/head'
import React from 'react'
import AppNavigation from '../components/AppNavigation'
import "../static/styles.scss"
import { createMuiTheme, MuiThemeProvider, CssBaseline } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        type: 'light',
    }
});

export default class MainLayout extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return(
            <div>
                <Head>
                    <title>Reddit</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width, minimum-scale=1, shrink-to-fit=no" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                </Head>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline/>
                    <AppNavigation/>
                    {this.props.children}
                </MuiThemeProvider>
            </div>
        );
    }
}