import React from 'react'
import { withStyles, Grid, Typography, Paper, Divider, TextField, Button } from '@material-ui/core'
import Layout from '../src/components/common/Layout';
import Router, { withRouter } from 'next/router';

/**
 * Search page
 * 
 * TODO: Search firestore
 */
class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            textFieldContent: ''
        }

        // This is the url parameter object
        console.log(props.router.query);
    }

    componentDidMount() {

        // Add key listener on the search bar
        window.onkeypress = (e) => {
            if (e.keyCode == 13) {
                if (this.state.textFieldContent !== '') {
                    // Search the content
                    Router.push({
                        pathname: '/search',
                        query: {q: this.state.textFieldContent}
                    }, `/search/${this.state.textFieldContent}`)
                }
            }
        }
    }

    renderNoQuery() {

        const { classes } = this.props;

        return (
            <Grid container alignItems={"center"} className={classes.root}>
                <Grid container item md={4} className={classes.noQueryRoot}>
                    <Typography variant="body2">
                        On dirais que vous n'avez rien recherché !
                        <br/>
                        Essayez avec ce champchamp.
                    </Typography>
                    <TextField
                        className={classes.searchBar}
                        label="rechercher"
                        fullWidth
                        variant="filled"
                        onChange={(e) => this.setState({textFieldContent: e.target.value})}
                    />
                    <Button variant="contained" color="primary">Trouvez moi des choses</Button>
                </Grid>
            </Grid>
        )
    }

    renderQuery() {
        const { classes } = this.props;

        return (
            <Grid container alignItems={"center"} justify={"center"} className={classes.root}>
                <Grid container item md={8}>

                    {/* Seperate in a component */}
                    <Paper className={classes.contentRoot}>
                        <Grid container>
                            <Grid item xs={12} md={12} className={classes.section}>
                                <Typography variant="subtitle1" color={"primary"}>
                                    Posts
                                   </Typography>

                                {/* Matching posts grid */}
                                <Grid container justify={"space-between"} className={classes.sectionContent}>
                                    <Grid item md={5}>
                                        <Paper elevation={0} className={classes.postPaper}>
                                            <Typography variant={"body2"}>
                                                This is a post.
                                                </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item md={5}>
                                        <Paper elevation={0} className={classes.postPaper}>
                                            <Typography variant={"body2"}>
                                                This is also a post.
                                                </Typography>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid container item md={8}>

                    {/* Separate in a component */}
                    <Paper className={classes.contentRoot}>
                        <Grid container>
                            <Grid item xs={12} md={12} className={classes.section}>
                                <Typography variant="subtitle1" color={"primary"}>
                                    Subs
                                    </Typography>

                                {/* Matching posts grid */}
                                <Grid container justify={"space-between"} className={classes.sectionContent}>
                                    <Grid item md={5}>
                                        <Paper elevation={0} className={classes.postPaper}>
                                            <Typography variant={"body2"}>
                                                This is a sub.
                                                </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item md={5}>
                                        <Paper elevation={0} className={classes.postPaper}>
                                            <Typography variant={"body2"}>
                                                This is also a sub.
                                                </Typography>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid container item md={8}>

                    {/* Separate in a component */}
                    <Paper className={classes.contentRoot}>
                        <Grid container>
                            <Grid item xs={12} md={12} className={classes.section}>
                                <Typography variant="subtitle1" color={"primary"}>
                                    Users
                                    </Typography>

                                {/* Matching posts grid */}
                                <Grid container justify={"space-between"} className={classes.sectionContent}>
                                    <Grid item md={5}>
                                        <Paper elevation={0} className={classes.postPaper}>
                                            <Typography variant={"body2"}>
                                                This is a user.
                                                </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item md={5}>
                                        <Paper elevation={0} className={classes.postPaper}>
                                            <Typography variant={"body2"}>
                                                This is also a user.
                                                </Typography>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
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
    }
})

export default withStyles(styles)(withRouter(Search))