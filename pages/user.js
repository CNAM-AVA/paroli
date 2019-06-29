import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Router, { withRouter } from 'next/router'
import Layout from '../src/components/common/Layout';
import { Typography, Grid, Avatar, CircularProgress, Button, Paper } from '@material-ui/core';
import { getUserPictureWithID } from '../lib/user';
import User from '../database/models/User';
import Post from '../database/models/Post'
import DisplayPosts from "../src/components/common/DisplayPosts"

class UserPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pageLoading: true,
            user: null,
            picture: null,
            posts: []
        }
    }

    static async getInitialProps({ query }) {
        return {
            query
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        if (this.props.query.slug == null) {
            // TODO: Redirect
            this.setState({
                pageLoading: false
            })

        } else {
            this.getUserInfos(this.props.query.slug)
        }
    }

    /**
     * Fetch user infos and put them inside the state
     */
    async getUserInfos(userName) {

        try {
            let user = await User.getByName(userName);
            user = new User(user.docs[0].data(), user.docs[0].id);

            this.setState({
                user: user
            })

            let posts = await User.getOwnPosts(this.state.user.documentId);

            getUserPictureWithID(user.documentId).then((url) => {
                this.setState({
                    picture: url,
                    posts: posts.docs.map(x => new Post(x.data(), x.id))
                })

            }).catch((error) => {
                console.error(error)
            })
        }
        catch (error) {
            console.log(error)
        }
        finally {
            this.setState({
                pageLoading: false
            })
        }
    }

    renderUserDetails() {

        const { classes } = this.props;

        return (
            <Grid item container className={classes.userAvatar} md={12} justify="center">
                {/* Username & image */}
                <Grid item md={2}>
                    <Avatar src={this.state.picture}></Avatar>
                    <Typography variant="subtitle1">{this.state.user.username}</Typography>
                </Grid>
                {/* Posts list */}
                <Grid item md={8}>
                    <Typography variant="subtitle2">Posts</Typography>
                    <DisplayPosts posts={this.state.posts}/>
                </Grid>
            </Grid>
        )
    }

    renderNothingFound() {
        return (
            <Typography variant="subtitle1">
                Aucun utilisateur ici :(<br />
                <Button variant="contained" href="/">
                    Retour à l'accueil
                    </Button>
            </Typography>

        )
    }

    render() {

        const { classes } = this.props;

        return (
            <Layout>
                <Grid container justify="center" alignItems="center" className={classes.root}>
                    <Grid item md={12} container justify="center">
                        {this.state.pageLoading && <CircularProgress className={classes.progress} />}
                    </Grid>
                </Grid>
                <Grid container justify="center" className={classes.root}>
                    {
                        this.state.user
                            ? this.renderUserDetails()
                            : this.renderNothingFound()
                    }
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