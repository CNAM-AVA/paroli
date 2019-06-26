import React from 'react'
import "../static/styles.scss"
import Layout from '../src/components/common/Layout';
import SubNavbar from '../src/components/common/SubNavbar';
import DisplayFilter from '../src/components/common/DisplayFilter';
import { Grid, CircularProgress, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Advertisement from '../src/components/common/Advertisement';
import YouveReachedBottom from '../src/components/common/YouveReachedBottom';
import DisplayPosts from '../src/components/common/DisplayPosts';
import Loading from '../src/components/common/Loading';
import SubDescriptionCard from '../src/components/sub/SubDescriptionCard';
import SubRulesCard from '../src/components/sub/SubRulesCard';
import HotSubs from '../src/components/common/HotSubs';
import { firestore } from '../lib/firebase';
import NoResultsFound from '../src/components/common/NoResultsFound';
import SubType from '../database/models/Sub';
import Post from '../database/models/Post';
import BottomScrollListener from '../node_modules/react-bottom-scroll-listener';
import SubAdminMenuCard from '../src/components/sub/SubAdminMenuCard';

const styles = theme => ({
    cardsContainer: {
        padding: 20
    },
});

class Sub extends React.Component {

    static async getInitialProps({ query }) {
        return {
            query
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            can_reload: true,
            sub: null,
            posts: [],
            isLoading: true,
            lastVisible: null
        };

        let subsRef = SubType.getByName(this.props.query.slug);

        subsRef.then((r) => {
            r.forEach((e) => {
                this.setState({ sub: new SubType(e.data(), e.id) }, () => {
                    document.title = this.state.sub.pageTitle || this.state.sub.name;
                })
            })
            this.setState({ isLoading: false })
            this.reloadPosts();
        }).catch((r) => {
            this.setState({ isLoading: false })
            document.title = "You appear to be lost.";
        });
    }

    asidePanel() {
        if (window.innerWidth > 600) {
            return (
                <Grid container justify="center" spacing={24}>
                    <Grid item xs={12} sm={6} md={6}>
                        <DisplayPosts posts={this.state.posts} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} cl={3}>
                        <SubDescriptionCard sub={this.state.sub} />
                        <Advertisement />
                        {
                            this.state.sub.rules
                                ? <SubRulesCard sub={this.state.sub} />
                                : null
                        }
                        <HotSubs subName={this.props.query.slug}/>
                        <Advertisement />
                    </Grid>
                </Grid>
            )
        } else {
            return (
                <Grid container justify="center" spacing={24}>
                    <Grid item xs={12} sm={6} md={4} lg={4} cl={3}>
                        <SubDescriptionCard sub={this.state.sub} />
                        <Advertisement />
                        {
                            this.state.sub.rules
                                ? <SubRulesCard sub={this.state.sub} />
                                : null
                        }
                        <HotSubs subName={this.props.query.slug}/>
                        <Advertisement />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <DisplayPosts posts={this.state.posts} />
                    </Grid>
                </Grid>
            )
        }
    }

    reloadPosts() {
        if (this.state.can_reload) {
            this.setState({ can_reload: false });
            let postsRef = Post.filtered({
                sub: this.state.sub,
                lastPost: this.state.lastVisible,
                filterType: "top",
            });

            postsRef.then((r) => {
                this.setState({ no_more_posts: false });
                if (r.docs.length > 0) {
                    let lastVisible = r.docs[r.docs.length - 1];
                    let newPosts = r.docs.map(x => new Post(x.data(), x.id));
                    this.setState({ lastVisible, posts: this.state.posts.concat(newPosts) });
                } else {
                    this.setState({ no_more_posts: true });
                }
                this.setState({ can_reload: true });
            }).catch((e) => {
                console.log(e);
            })
        }
    }

    asidePanel() {
        return(
            <Grid item xs={12} sm={6} md={4} lg={4} cl={3}>
                <SubAdminMenuCard sub={this.state.sub}/>
                <SubDescriptionCard sub={this.state.sub} />
                <Advertisement />
                {
                    this.state.sub.rules
                        ? <SubRulesCard sub={this.state.sub} />
                        : null
                }
                <HotSubs subName={this.props.query.slug}/>
                <Advertisement />
            </Grid>
        )
    }

    render() {
        const { classes } = this.props;

        return (
            <Layout>
                <BottomScrollListener onBottom={this.reloadPosts.bind(this)} />
                <SubNavbar>
                    <DisplayFilter/>
                </SubNavbar>
                <Grid container justify="center" className={classes.cardsContainer}>
                    <Grid item xs={12} md={12} lg={10}>
                        {
                            this.state.isLoading
                                ? <Grid container justify="center" spacing={24}>
                                    <Grid item xs={8}>
                                        <Loading />
                                    </Grid>
                                </Grid>
                                : this.state.sub
                                    ? <Grid container justify="center" spacing={24}>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <DisplayPosts posts={this.state.posts} />
                                            {
                                                !this.state.can_reload ?
                                                    <Loading />
                                                    : null
                                            }
                                            {
                                                this.state.no_more_posts ?
                                                    <YouveReachedBottom />
                                                    : null
                                            }
                                        </Grid>
                                        {this.asidePanel()}
                                    </Grid>
                                    : null
                        }
                    </Grid>
                </Grid>
            </Layout>
        );
    }
}

export default withStyles(styles)(Sub);