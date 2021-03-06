import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Grid, CircularProgress, Typography } from '@material-ui/core'

const styles = theme => ({

})

class Loading extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {

        const { classes } = this.props;

        return (
            <Grid container justify="center">
                <Grid item>
                    <CircularProgress className={classes.progress} />
                </Grid>
            </Grid>
        )
    }

}

export default withStyles(styles)(Loading);