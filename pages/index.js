import React from 'react'
import "../static/styles.scss"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../src/components/common/Layout';
import SubNavbar from '../src/components/common/SubNavbar';
import DisplayFilter from '../src/components/common/DisplayFilter'
import { Paper, Typography, Grid, Fab, Button, Avatar } from '@material-ui/core';
import { topMargin } from '../lib/constants'
import firebase from '../lib/firebase'
import InfoCard from '../src/components/common/InfoCard';
import PostComponent from '../src/components/post/PostComponent'
import SubRow from '../src/components/common/SubRow'
import HotSubs from '../src/components/common/HotSubs';

const styles = theme => ({
    root: {
        paddingTop: theme.spacing.unit * topMargin,
        paddingRight: 20
    },
    fab: {
        width: '90%',
        marginTop: 10,
        marginBottom: 10,
        height: 30
    },
    communities: {
        marginTop: 15
    },
    avatar: {
    }
})

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uid: null
        }
    }

    componentDidMount = async () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user)
                this.setState({uid: user.uid})
            else
                this.setState({uid: null})
        })
    }

    loggedInRender() {

        const { classes } = this.props;

        return(
            <Grid container justify="center">
                <Typography variant="body2">
                    Your personal Reddit frontpage. Come here to check in with your favorite communities.
                </Typography>
                <Fab variant="extended" aria-label="Delete" color={"primary"} className={classes.fab}>Créer un post</Fab>
                <Fab variant="extended" aria-label="Delete" color={"secondary"} className={classes.fab}>Créer un sub</Fab>
                <Fab variant="extended" aria-label="Delete" color={"secondary"} className={classes.fab}>Explorer les subs</Fab>
            </Grid>
        )
    }

    mustLoginRender() {

        const { classes } = this.props;

        return(
            <Grid container justify="center">
                <Typography variant="body2">
                    Connectez vous pour accéder à toutes les fonctionnalités !
                </Typography>
            </Grid>
        )
    }

    // Fetch user feed if logged in
    fetchUserFeed(){

    }

    // Fetch random posts to feed p/all
    fetchRandomPost() {

    }

    render() {

        const { classes } = this.props;

        return(
            <Layout>
                <SubNavbar centered={true}>
                    <DisplayFilter/>
                </SubNavbar>
                <Grid container className={classes.root}>
                    <Grid container justify="center" spacing={40}>
                        <Grid item xs={5}>
                            <Paper>
                                <Typography variant={"body2"}>Test</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <InfoCard title="Accueil">
                                {
                                    firebase.auth().currentUser 
                                    ? this.loggedInRender()
                                    : this.mustLoginRender()
                                }
                            </InfoCard>
                            <HotSubs/>
                            <InfoCard title="All">
                                <Typography variant="body2">
                                    Lorem ipsum lol
                                </Typography>
                            </InfoCard>
                        </Grid>
                    </Grid>
                </Grid>
            </Layout>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
