import React from 'react'
import { withStyles, Grid, Typography, Paper, Divider, TextField, Button } from '@material-ui/core'
import Layout from '../src/components/common/Layout';
import Router, { withRouter } from 'next/router';
import { firestore } from '../lib/firebase';
import Link from 'next/link'

/**
 * Search page
 * 
 * TODO: Search firestore
 */
class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            textFieldContent: '',
            posts: [],
            subs: [],
            users: []
        }
    }

    componentWillMount() {
        this.getResultSample();
    }

    componentDidMount() {

        // Add key listener on the search bar
        window.onkeypress = (e) => {
            if (e.keyCode == 13) {
                if (this.state.textFieldContent !== '') {
                    // Search the content
                    Router.push({
                        pathname: '/search',
                        query: { q: this.state.textFieldContent }
                    })
                }
            }
        }
    }

    /**
     * Retreive data from firestore using the query props
     */
    getResultSample() {

        const searchData = this.props.router.query;
        let posts = [];
        let subs = [];
        let users = [];

        if (searchData.q == null) return;

        // Get posts
        firestore.collection("posts").orderBy('title').startAt(searchData.q).endAt(`${searchData.q}\uf8ff`).limit(10).get()
            .then((snapshot) => {
                snapshot.forEach((document) => {
                    posts.push(document.data())
                })
                this.setState({ posts: posts })
            })

        // Subs
        firestore.collection("subs").orderBy('name').startAt(searchData.q).endAt(`${searchData.q}\uf8ff`).limit(10).get()
            .then((snapshot) => {
                snapshot.forEach((document) => {
                    subs.push(document.data())
                })
                this.setState({ subs: subs })
            })

        // Users
        firestore.collection("users").orderBy('username').startAt(searchData.q).endAt(`${searchData.q}\uf8ff`).limit(10).get()
            .then((snapshot) => {
                snapshot.forEach((document) => {
                    users.push(document.data())
                })
                this.setState({ users: users })
            })
    }

    renderNoQuery() {

        const { classes } = this.props;

        return (
            <Grid container alignItems={"center"} className={classes.root}>
                <Grid container item md={4} className={classes.noQueryRoot}>
                    <Typography variant="body2">
                        On dirais que vous n'avez rien recherché !
                        <br />
                        Essayez avec ce champchamp.
                    </Typography>
                    <TextField
                        className={classes.searchBar}
                        label="rechercher"
                        fullWidth
                        variant="filled"
                        onChange={(e) => this.setState({ textFieldContent: e.target.value })}
                    />
                    <Button variant="contained" color="primary">Trouvez moi des choses</Button>
                </Grid>
            </Grid>
        )
    }

    renderQuery() {
        const { classes } = this.props;

        const posts = this.state.posts.map((post, index) =>
            <Grid item md={6} key={index}>
                <Paper className={classes.postPaper}>
                    <Typography variant="subtitle2" color="primary">
                        <Link href={``}>{post.title}</Link>
                    </Typography>
                    <Typography variant="body2">
                        {post.content}
                    </Typography>
                </Paper>
            </Grid>
        )

        const subs = this.state.subs.map((sub, index) =>
            <Grid item md={5} key={index}>
                <Paper className={classes.postPaper}>
                    <Typography variant={"subtitle2"} color="primary">
                        <Link href={`/p/${sub.name}`}><a>{sub.name}</a></Link>
                    </Typography>
                </Paper>
            </Grid>
        )

        const users = this.state.users.map((user, index) =>
            <Grid item md={3} key={index}>
                <Paper className={classes.postPaper}>
                    <Typography variant={"body2"}>
                        {user.username}
                    </Typography>
                </Paper>
            </Grid>
        )

        return (
            <Grid container alignItems={"center"} justify={"center"} className={classes.root}>

                {/* The posts */}
                <Grid container item md={8}>
                    <Grid container>
                        <Grid item xs={12} md={12} className={classes.section}>
                            <Typography variant="subtitle1" color={"secondary"}>
                                Posts
                            </Typography>

                            {/* Matching posts grid */}
                            <Grid container justify={"space-between"} className={classes.sectionContent} spacing={16}>
                                {
                                    posts.length == 0
                                        ? <Typography variant="body2">Aucun résultat :(</Typography>
                                        : posts
                                }

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {/* The subs */}
                <Grid container item md={8}>
                    <Grid container>
                        <Grid item xs={12} md={12} className={classes.section}>
                            <Typography variant="subtitle1" color={"secondary"}>
                                Subs
                            </Typography>

                            {/* Matching posts grid */}
                            <Grid container justify={"space-between"} className={classes.sectionContent} spacing={16}>
                                {
                                    subs.length == 0
                                        ? <Typography variant="body2">Aucun résultat :(</Typography>
                                        : subs
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container item md={8}>

                    {/* Separate in a component */}
                    <Grid container>
                        <Grid item xs={12} md={12} className={classes.section}>
                            <Typography variant="subtitle1" color={"secondary"}>
                                Users
                                </Typography>

                            {/* Matching posts grid */}
                            <Grid container justify={"space-between"} className={classes.sectionContent} spacing={16}>
                                {
                                    users.length == 0
                                        ? <Typography variant="body2">Aucun résultat :(</Typography>
                                        : users
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    render() {

        const { classes } = this.props;
        let render;
        const query = this.props.router.query;

        if (query.q == null)
            render = this.renderNoQuery();
        else
            render = this.renderQuery();

        return (
            <Layout>
                {
                    render
                }
            </Layout>

        )
    }
}


const styles = (theme) => ({
    root: {
        padding: 20
    },
    contentRoot: {
        width: '100%',
        padding: '10px 15px 15px 15px',
        marginBottom: 15
    },
    section: {
        marginTop: 10,
        marginBottom: 10,
    },
    sectionContent: {
        marginTop: 15
    },
    noQueryRoot: {
        marginTop: '150px',
        marginLeft: '10%',
        '& div': {
            '& div': {
                backgroundColor: 'rgba(33, 153, 243,0.65)'
            }
        },
        '& button': {
            marginTop: 20
        }
    },
    searchBar: {
        marginTop: 10
    },
    postPaper: {
        padding: 10,
    }
})

export default withStyles(styles)(withRouter(Search))