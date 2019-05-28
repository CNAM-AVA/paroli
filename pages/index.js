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
            showSubCreationModal: false
        }

        this.switchSubCreationModal = this.switchSubCreationModal.bind(this);
    }
    

    componentDidMount = async () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user)
                this.setState({uid: user.uid})
            else
                this.setState({uid: null})
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
    fetchUserFeed(){
        const posts = [
            {title : 'Titre', author: 'John Doe', media: 'img', content : '/static/img/landscape-img-test.jpg', date: '??/??/????'},
			{title : 'Lorem Ipsum Dolor Sit Amet', author: 'Jules César', media: 'txt', content : 'Valentin mon meilleur copain', date: '??/??/????'},
			{title : 'Wiki mythologie grecque', author: 'Zeus', media: 'link', content : 'https://fr.wikipedia.org/wiki/Mythologie_grecque', date: '??/??/????'},
			{title : 'Un petit gif sympathique !', author: 'Giffy', media: 'img', content : 'http://www.roseedemiel.fr/wp-content/uploads/2012/10/question-mark-200x300.jpg', date: '??/??/????'},
			{title : 'Just Do It !', author: 'Shia Laboeuf', media: 'video', content : 'https://www.youtube.com/embed/watch?v=qD54sROmeIM?autoplay=1', date: '??/??/????'},
        ];

        return (
            <DisplayPosts posts={posts}/>
        )
    }

    // Fetch random posts to feed p/all
    fetchRandomPost() {

        const posts = [
            {title : 'Titre', author: 'John Doe', media: 'img', content : '/static/img/landscape-img-test.jpg', date: '??/??/????'},
			{title : 'Lorem Ipsum Dolor Sit Amet', author: 'Jules César', media: 'txt', content : 'Valentin mon meilleur copain', date: '??/??/????'},
			{title : 'Wiki mythologie grecque', author: 'Zeus', media: 'link', content : 'https://fr.wikipedia.org/wiki/Mythologie_grecque', date: '??/??/????'},
			{title : 'Un petit gif sympathique !', author: 'Giffy', media: 'img', content : 'http://www.roseedemiel.fr/wp-content/uploads/2012/10/question-mark-200x300.jpg', date: '??/??/????'},
			{title : 'Just Do It !', author: 'Shia Laboeuf', media: 'video', content : 'https://www.youtube.com/embed/watch?v=qD54sROmeIM?autoplay=1', date: '??/??/????'},
        ];

        return (
            <DisplayPosts posts={posts}/>
        )
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
                        <Grid item xs={12} sm={6} md={5} lg={5} xl={5}>
                            <Grid container alignItems={"center"} className={classes.sectionHeader}>
                                <Typography variant="h6" className={classes.feedTypo}>Feed</Typography>                            
                                <RssFeedIcon className={classes.icon}/>
                            </Grid>
                            
                            {
                                firebase.auth().currentUser
                                ? this.fetchUserFeed()
                                : this.fetchRandomPost()
                            }
                        </Grid>
                        <Grid className={classes.infoCards} item xs={12} sm={6} md={5} lg={4} xl={3}>
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
