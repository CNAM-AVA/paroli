import Head from 'next/head'
import React from 'react'
import AppNavigation from '../components/AppNavigation'
import "../static/styles.scss"

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
                <AppNavigation/>
                {this.props.children}
            </div>
        );
    }
}