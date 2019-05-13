import React from 'react'
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid'
import Layout from '../src/components/common/Layout';

const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingRight: 30,
        paddingLeft: 30
    },
});

class boardBuilder extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        const { classes } = this.props;

        return(
            <Layout>
                <Grid container className={classes.root}>
                    <p>Test</p>
                </Grid>
            </Layout>
        )
    }
}

export default withStyles(styles)(boardBuilder)