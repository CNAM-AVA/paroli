import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DashboardCard from "./DashboardCard";
import Link from 'next/link'
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingRight: 30,
        paddingLeft: 30
    },
    cardsContainer: {
      marginTop: 20
    },
    link: {
        textDecoration: 'none',
        color: theme.primary
    }
});

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return(
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={12}>
                            <h1>Welcome</h1>
                            <Typography component={"p"}>
                                This website allow you to control your Arduino board.
                                <br/>
                                Build a new board or manage your configs.
                                <br/>
                                <br/>
                                If you're new here, you probably want to check our <Link href={"/"}><a className={classes.link}>Get Started</a></Link> tutorial.
                                <br/>
                                This will guide you trough the basic setup.
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container className={`${classes.root} ${classes.cardsContainer}`} spacing={40} justify={"center"}>
                        <Grid item xs={12} sm={6} md={3}>
                            <DashboardCard icon={"flipToFront"} className={classes.card} link={"/boardBuilder"} title={"Board Builder"} linkTitle={"Go to the Board Builder"}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <DashboardCard icon={"list"} className={classes.card} link={"/"} title={"Configurations"} linkTitle={"See all my configurations"}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <DashboardCard icon={"turnedInNot"} className={classes.card} link={"/"} title={"Documentation"} linkTitle={"Check out the docs"}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Dashboard);
