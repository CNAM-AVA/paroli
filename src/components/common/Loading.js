import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'

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
            <p>Loading...</p>
        )
    }

}

export default withStyles(styles)(Loading);