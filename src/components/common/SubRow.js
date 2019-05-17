import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Avatar, Typography, Button } from '@material-ui/core'
import firebase from '../../../lib/firebase'

const styles = theme => ({

})

class SubRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user)
                this.setState({uid: user.uid})
            else
                this.setState({uid: null})
        })
    }

    render() {

        const { classes } = this.props;
        const community = this.props.community;

        return (
            <Grid container className={classes.communities} key={`${community.name}${community.subs}`}>
                <Grid container alignItems={"center"}>
                    <Grid container justify={"space-between"} item xs={8}>
                        <Grid item xs={3}>
                            <Avatar className={classes.avatar}>{community.name.charAt(0).toUpperCase()}</Avatar>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography>{community.name}</Typography>
                            <Typography>{community.subscribers} subscribers</Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={4} justify={"flex-end"}>
                        {
                            this.state.uid === null
                                ? ''
                                : <Button variant={"contained"} color={"primary"}>Rejoindre</Button>
                        }
                    </Grid>
                </Grid>
            </Grid>
        )
    }

}

SubRow.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SubRow);