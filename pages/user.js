import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Router, { withRouter } from 'next/router'
import Layout from '../src/components/common/Layout';
import { Typography, Grid, Avatar, CircularProgress } from '@material-ui/core';
import { getUserPictureWithID } from '../lib/user';
import firebase from '../lib/firebase'
import User from '../database/models/User';

class UserPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pageLoading: true,
            user: null,
            picture: null
        }
    }

    static async getInitialProps({ query }) {
        return {
            query
        }
    }

    componentWillMount() {

        if (this.props.query.slug == null) {
            // TODO: Redirect

        } else {
            this.getUserInfos(this.props.query.slug)
        }
    }

    componentDidMount() {
    }

    /**
     * Fetch user infos and put them inside the state
     */
    async getUserInfos(userName) {

        let user = await User.getByName(userName);
        user = new User(user.docs[0].data(), user.docs[0].id);

        getUserPictureWithID(user.documentId).then((url) => {
            this.setState({
                user: user,
                picture: url,
                pageLoading: false
            })
        }).catch((error) => {
            console.error(error)
        })
    }

    render() {

        const { classes } = this.props;

        return (
            <Layout>
                <Grid container justify="center" alignItems="center" className={classes.root}>
                    <Grid item md={12}>
                        {this.state.pageLoading && <CircularProgress className={classes.progress} />}
                    </Grid>
                </Grid>
                <Grid container justify="center" className={classes.root}>

                    <Grid item className={classes.userAvatar} md={8}>
                        <Avatar src={this.state.picture}></Avatar>
                    </Grid>
                </Grid>
            </Layout>
        )
    }

}

const styles = (theme) => ({
    root: {
        paddingTop: 25
    },
    userAvatar: {

    }
})

export default withStyles(styles)(withRouter(UserPage))