import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types';
import { Typography, Paper } from '@material-ui/core';

const styles = theme => ({
    root: {
        marginBottom: 20
    },
    rootPaper: {
        marginTop: 10,
        padding: 15
    }
})

class InfoCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        const { classes } = this.props;

        return(
            <div className={classes.root}>
                <Typography variant="h6">{this.props.title}</Typography>
                <Paper className={classes.rootPaper}>
                    {this.props.children}
                </Paper>
            </div>
        )
    }

}

InfoCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoCard);