import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Avatar, Typography, Button } from '@material-ui/core'
import firebase from '../../../lib/firebase'
import { subscribeToPost } from '../../../lib/sub'
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
        console.log(sub.docs[0].data());

        console.log(`Going to sub with params: ${this.state.uid}, ${sub.name}`);

        subscribeToPost(this.state.uid, sub.docs[0].data().name).then(() => {
            console.log("subbed");
        }).catch((e) => {
            console.log(e);
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
                                : <Button variant={"contained"} color={"primary"} onClick={() => this.subscribe()}>Rejoindre</Button>
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