import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types';
import { Typography, Paper, Grid } from '@material-ui/core';
import GrainIcon from '@material-ui/icons/Grain'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import { titleIcon } from '../../../lib/constants'

const styles = theme => ({
    root: {
        marginBottom: 20
    },
    rootPaper: {
        marginTop: 10,
        padding: 15,
        width: '100%'
    },
    icon: titleIcon
})

class InfoCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    
    applyIcon() {

        const { classes } = this.props;

        switch (this.props.icon) {
            case 'hot':
                return <TrendingUpIcon className={classes.icon}/>
            case 'home': 
                return <GrainIcon className={classes.icon}/>
            default:
                return ''
        }
    }

    render() {

        const { classes } = this.props;

        return(
            <Grid container className={classes.root}>
                <Grid container alignItems={"center"}>
                    <Typography variant="h6">{this.props.title}</Typography>
                    {this.applyIcon()}
                </Grid>
                <Paper className={classes.rootPaper}>
                    {this.props.children}
                </Paper>
            </Grid>
        )
    }

}

InfoCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoCard);