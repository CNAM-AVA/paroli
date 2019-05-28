import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Typography, Dialog, Grid, TextField, Button } from '@material-ui/core';
import { firestoreCreateSub } from '../../../lib/sub'
import firebase from '../../../lib/firebase'

const styles = {
    root: {
        padding: 25
    },
    submit: {
        marginTop: 15
    }
}

class SubCreationModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            error: {
                value: '',
                display: false
            }
        }
    }

    createSub(e) {
        if (this.state.name == '' || this.state.description == '') {
            let error = {...this.state.error}
            error.display = true;
            error.value = 'Nom ou description invalide'
            this.setState({
                error: error
            });

            return;
        }

        let subConfig = {
            UID: firebase.auth().currentUser.uid,
            name: this.state.name,
            pageTitle: this.state.description
        }

        firestoreCreateSub(subConfig)
        .then(() => {
            console.log('validated');
            this.props.visibilityHandler();
        })
        .catch((e) => {
            console.log('catched');
            let error = {...this.state.error}
            error.display = true;
            error.value = e.error;

            this.setState({
                error: error
            })
        })
    }

    setName(e) {
        this.setState({
            name: e.target.value
        })
    }

    setDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <Dialog
                open={this.props.visible}
                onClose={this.props.visibilityHandler}
            >
                <Grid container className={classes.root} alignItems={'center'}>
                    <Grid item xs={12}>
                        <Typography variant={'subtitle1'}>Créer un sub</Typography>
                        <form className={classes.container} noValidate autoComplete="off">
                            <TextField
                                label="Nom"
                                className={classes.textField}
                                onChange={(e) => this.setName(e)}
                                margin="normal"
                                required
                                autoFocus
                                fullWidth
                            />
                            <TextField
                                label="Description"
                                className={classes.textField}
                                onChange={(e) => this.setDescription(e)}
                                margin="normal"
                                required
                                fullWidth
                            />
                            <Typography variant={'body2'} color={'secondary'}>{this.state.error.value}</Typography>
                            <Button
                                onClick={(e) => this.createSub(e)}
                                className={classes.submit}
                                fullWidth
                                variant={"contained"}
                                color={'primary'}
                            >
                                Créer
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </Dialog>
        );
    }
}

export default withStyles(styles)(SubCreationModal);