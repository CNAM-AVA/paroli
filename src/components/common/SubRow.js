import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Avatar, Typography, Button, Link, CircularProgress } from '@material-ui/core'
import firebase from '../../../lib/firebase'
import { subscribeToSub, isUserSubbed, unsubscribeToSub } from '../../../lib/sub'
import Sub from '../../../database/models/Sub';
import yellow from '@material-ui/core/colors/yellow';

const styles = theme => ({
    communities: {
        marginTop: 10,
        marginBottom: 10
    },
    buttonProgress: {
        color: yellow[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
})

class SubRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uid: null,
            subButtonIsOnSubscribe: false,
            loadingbtn: false
        }
    }

    async componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ uid: user.uid })
                this.updateSubsButton();
            }
            else
                this.setState({ uid: null })
        })
    }

    async componentDidMount() {
        if (this.state.uid != null) {
            const userStatus = await isUserSubbed(this.state.uid, this.props.community.name);

            if (userStatus.subbed) {
                this.setState({
                    subButtonIsOnSubscribe: true
                })
            }
        }
    }

    async updateSubsButton() {
        if (this.state.uid != null) {
            const userStatus = await isUserSubbed(this.state.uid, this.props.community.name);

            if (userStatus.subbed) {
                this.setState({
                    subButtonIsOnSubscribe: true
                })
            }
        }
    }

    async subscribe() {

        this.setState({
            loadingbtn: true
        })

        let sub = await Sub.getByName(this.props.community.name);
        const subName = sub.docs[0].data().name;

        console.log(this.state.uid + ' ' + subName)

        subscribeToSub(this.state.uid, subName).then(() => {
            console.log('subbed');
            this.setState({
                subButtonIsOnSubscribe: true,
                loadingbtn: false
            })
        }).catch((e) => {
            console.log(e);
        })
    }

    async unsubscribe() {

        this.setState({
            loadingbtn: true
        })

        let sub = await Sub.getByName(this.props.community.name);
        const subName = sub.docs[0].data().name;

        unsubscribeToSub(this.state.uid, subName).then(() => {
            this.setState({
                subButtonIsOnSubscribe: false,
                loadingbtn: false
            })
        }).catch((e) => {
            console.log(e);
        })
    }

    subButtonHandler() {

        const { classes } = this.props;

        if (this.state.subButtonIsOnSubscribe) {
            return (
                <div className={classes.wrapper}>
                    <Button variant={"contained"} color={"secondary"} onClick={() => this.unsubscribe()}>Désabonner</Button>
                    {this.state.loadingbtn && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
            )
        } else {
            return (
                <div className={classes.wrapper}>
                    <Button variant={"contained"} color={"primary"} onClick={() => this.subscribe()}>Rejoindre</Button>
                    {this.state.loadingbtn && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
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
                            <Typography><Link href={"/p/" + community.name}>p/{community.name}</Link></Typography>
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