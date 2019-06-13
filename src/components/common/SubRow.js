import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Avatar, Typography, Button, Link } from '@material-ui/core'
import firebase from '../../../lib/firebase'
import { subscribeToSub } from '../../../lib/sub'
import Sub from '../../../database/models/Sub';

const styles = theme => ({
    communities: {
        marginTop: 10,
        marginBottom: 10
    }
})

class SubRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uid: null
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

    async subscribe() {

        let sub = await Sub.getByName(this.props.community.name);

        subscribeToSub(this.state.uid, sub.docs[0].data().name).then(() => {

        }).catch((e) => {

        })
    }

    async unsubscribe() {
        console.log("Unsubscribing");
    }

    subButtonHandler() {

        const userIsSubbed = true;

        if (userIsSubbed) {
            return(
                <Button variant={"contained"} color={"secondary"} onClick={() => this.unsubscribe()}>Désabonner</Button>
            )
        } else {
            return(
                <Button variant={"contained"} color={"primary"} onClick={() => this.subscribe()}>Rejoindre</Button>
            )
        }
    }

    render() {

        const { classes } = this.props;
        const community = this.props.community;

        return (
            <Grid container className={classes.communities} key={`${community.name}${community.subs}`}>
                <Grid container alignItems={"center"}>
                    <Grid container justify={"space-between"} item xs={8} sm={7} md={8}>
                        <Grid item xs={3}>
                            <Avatar className={classes.avatar}>{community.name.charAt(0).toUpperCase()}</Avatar>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography><Link href={"/p/"+community.name}>p/{community.name}</Link></Typography>
                            <Typography>{community.subscribersCount} subscribers</Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={4} sm={5} md={4} justify={"flex-end"}>
                        {
                            this.state.uid === null
                                ? ''
                                : this.subButtonHandler()
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