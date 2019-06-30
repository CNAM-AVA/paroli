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
import DisplayPosts from '../src/components/common/DisplayPosts'
import RssFeedIcon from '@material-ui/icons/RssFeed'
import { titleIcon } from '../lib/constants'
import SubCreationModal from '../src/components/sub/SubCreationModal';
import User from '../database/models/User';
import { getSubPostsWithName } from '../lib/sub'
import { fetchRandom } from '../lib/post'
import Post from '../database/models/Post';

const styles = theme => ({
    root: {
        paddingTop: theme.spacing.unit * topMargin,
        paddingRight: 20,
        paddingLeft: 20
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
    infoCards: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    icon: titleIcon,
    sectionHeader: {
        marginBottom: 10
    }
})

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uid: null,
            showSubCreationModal: false,
            posts: []
        }

        this.switchSubCreationModal = this.switchSubCreationModal.bind(this);
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({uid: user.uid})
                this.fetchUserFeed();
            }
            else {
                this.setState({uid: null})
                this.fetchRandomPost();
            }
        })
    }

    switchSubCreationModal() {
        this.setState(prevState => ({
			showSubCreationModal: !prevState.showSubCreationModal,
		}))
    }

    loggedInRender() {

        const { classes } = this.props;

        return(
            <Grid container justify="center">
                <Typography variant="body2">
                    Your personal Reddit frontpage. Come here to check in with your favorite communities.
                </Typography>
                <Fab onClick={() => this.switchSubCreationModal()} variant="extended" aria-label="Delete" color={"secondary"} className={classes.fab}>Créer un sub</Fab>
                <Fab variant="extended" aria-label="Delete" color={"secondary"} className={classes.fab}>Explorer les subs</Fab>
                <SubCreationModal visible={this.state.showSubCreationModal} visibilityHandler={this.switchSubCreationModal}/>
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
    async fetchUserFeed(){

        if (this.state.uid == null) return;

        let user = await User.getById(this.state.uid);
        let subsFollowed = user.data().subsFollowed;

        if (subsFollowed.length == 0) {
            this.fetchRandomPost();
            return;
        }

        subsFollowed.map((sub) => {
            let subPosts = getSubPostsWithName(sub).then((postList) => {
                postList.posts.forEach(element => {
                    element = new Post(element.data(), element.id)

                    this.setState({
                        posts: [...this.state.posts, element]
                    })
                });
            });
        })
    }

    // Fetch random posts to feed p/all
    fetchRandomPost() {
        fetchRandom().then((r) => {
            
            // r.map(x => new Post(x.data(), x.id))
            r = r.map(x => new Post(x.data(), x.id))
            this.setState({posts: r})
        })
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
                        <Grid item xs={12} sm={7} md={6} lg={6} xl={4}>
                            <Grid container alignItems={"center"} className={classes.sectionHeader}>
                                <Typography variant="h6" className={classes.feedTypo}>Feed</Typography>                            
                                <RssFeedIcon className={classes.icon}/>
                            </Grid>
                            <DisplayPosts posts={this.state.posts}/>
                        </Grid>
                        <Grid className={classes.infoCards} item xs={12} sm={5} md={4} lg={4} xl={3}>
                            <InfoCard title="Accueil" icon='home'>
                                {
                                    firebase.auth().currentUser 
                                    ? this.loggedInRender()
                                    : this.mustLoginRender()
                                }
                            </InfoCard>
                            <HotSubs/>
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
