import React from 'react'
import "../static/styles.scss"
import Layout from '../src/components/common/Layout';
import SubNavbar from '../src/components/common/SubNavbar';
import DisplayFilter from '../src/components/common/DisplayFilter';
import {Grid} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Advertisement from '../src/components/common/Advertisement';
import DisplayPosts from '../src/components/common/DisplayPosts';
import Loading from '../src/components/common/Loading';
import SubDescriptionCard from '../src/components/sub/SubDescriptionCard';
import SubRulesCard from '../src/components/sub/SubRulesCard';
import HotSubs from '../src/components/common/HotSubs';
import {firestore} from '../lib/firebase';
import NoResultsFound from '../src/components/common/NoResultsFound';
import SubType from '../database/models/Sub';

const styles = theme => ({
    cardsContainer: {
        marginTop: 24
    },
});

class Sub extends React.Component {

    static async getInitialProps({query}) {
        return {
            query
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            sub: null,
            posts: [
                {
                    title: 'Titre',
                    author: 'John Doe',
                    media: 'img',
                    content: '/static/img/landscape-img-test.jpg',
                    date: '??/??/????'
                },
                {
                    title: 'Lorem Ipsum Dolor Sit Amet',
                    author: 'Jules César',
                    media: 'txt',
                    content: 'Valentin mon meilleur copain',
                    date: '??/??/????'
                },
                {
                    title: 'Wiki mythologie grecque',
                    author: 'Zeus',
                    media: 'link',
                    content: 'https://fr.wikipedia.org/wiki/Mythologie_grecque',
                    date: '??/??/????'
                },
                {
                    title: 'Un petit gif sympathique !',
                    author: 'Giffy',
                    media: 'img',
                    content: 'http://www.roseedemiel.fr/wp-content/uploads/2012/10/question-mark-200x300.jpg',
                    date: '??/??/????'
                },
                {
                    title: 'Just Do It !',
                    author: 'Shia Laboeuf',
                    media: 'video',
                    content: 'https://www.youtube.com/embed/watch?v=qD54sROmeIM?autoplay=1',
                    date: '??/??/????'
                },
            ],
            isLoading: true
        };

        let subsRef = SubType.getByName(this.props.query.slug);

        subsRef.get().then((r) => {
            r.forEach((e) => {
                this.setState({sub: new SubType(e.data())},() => {
                    document.title = this.state.sub.pageTitle || this.state.sub.name;
                })
            })
            this.setState({isLoading: false})
        }).catch((r) => {
            this.setState({isLoading: false})
            document.title = "You appear to be lost.";
        });
    }

    render() {
        const {classes} = this.props;

        return (
            <Layout>
                <SubNavbar>
                    <DisplayFilter/>
                </SubNavbar>
                <Grid container justify="center" className={classes.cardsContainer}>
                    <Grid item xs={10}>
                        {
                            this.state.isLoading
                                ? <Grid container justify="center" spacing={24}>
                                    <Grid item xs={8}>
                                        <Loading/>
                                    </Grid>
                                </Grid>
                                : this.state.sub
                                ? <Grid container justify="center" spacing={24}>
                                    <Grid item xs={6}>
                                        <DisplayPosts posts={this.state.posts}/>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <SubDescriptionCard sub={this.state.sub}/>
                                        <Advertisement/>
                                        {
                                            this.state.sub.rules
                                                ? <SubRulesCard sub={this.state.sub}/>
                                                : null
                                        }
                                        <HotSubs/>
                                        <Advertisement/>
                                    </Grid>
                                </Grid>
                                : <Grid container justify="center" spacing={24}>
                                    <Grid item xs={8}>
                                        <NoResultsFound/>
                                    </Grid>
                                </Grid>
                        }
                    </Grid>
                </Grid>
            </Layout>
        );
    }
}

export default withStyles(styles)(Sub);