import React from 'react'
import "../static/styles.scss"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../src/components/common/Layout';
import SubNavbar from '../src/components/common/SubNavbar';
import DisplayFilter from '../src/components/common/DisplayFilter'
import { Paper, Typography, Grid } from '@material-ui/core';
import { topMargin } from '../lib/constants'

const styles = theme => ({
    root: {
        paddingTop: theme.spacing.unit * topMargin,
        paddingRight: 20
    }
})

class Index extends React.Component {

    constructor(props) {
        super(props);
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
                            <Paper>
                                <Typography variant={"body2"}>Test</Typography>
                            </Paper>
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
