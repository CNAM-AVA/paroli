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
                            <InfoCard title="Hot">
                                <Typography variant="subtitle1" color="primary">
                                    Lorem ipsum lol
                                </Typography>
                                <Grid container className={classes.communities}>
                                    <Grid container justify={"center"} alignItems={"center"}>
                                        <Grid item xs={6}>
                                            <Avatar className={classes.avatar}>P</Avatar>
                                            <Typography>p/porn</Typography>
                                            <Typography>700 subscribers</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button variant={"contained"} color={"primary"}>Rejoindre</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </InfoCard>
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
