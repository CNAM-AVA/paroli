import React from 'react'
import {withStyles, Grid, Typography, Paper, Divider} from '@material-ui/core'
import Layout from '../src/components/common/Layout';
import { withRouter } from 'next/router';

class Search extends React.Component {

    constructor(props) {
        super(props);

        // This is the url parameter object
        console.log(props.router.query);
    }

    render() {

        const {classes} = this.props;

        return(
            <Layout>
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
            </Layout>

        )
    }
}

 
const styles = {
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
    }
}
 
export default withStyles(styles)(withRouter(Search))