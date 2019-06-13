import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Grid, CircularProgress, Typography } from '@material-ui/core'

const styles = theme => ({

})

class YouveReachedBottom extends React.Component {

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
                    <Typography>Vous êtes tellement profond dans le site que vous voyez Adèle.</Typography>
                </Grid>
            </Grid>
        )
    }

}

export default withStyles(styles)(YouveReachedBottom);