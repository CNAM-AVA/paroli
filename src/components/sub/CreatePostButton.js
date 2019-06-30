import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import {Fab, Grid, Dialog, TextField, DialogTitle, Button, DialogContent, Tabs, Tab, AppBar} from '@material-ui/core';
import Post from "../../../database/models/Post";
import firebase from "../../../lib/firebase";
import { TYPE_TEXT, TYPE_IMAGE, TYPE_VIDEO } from '../../../lib/post';

const styles = {
    fab: {
        width: '90%',
        marginTop: 10,
        marginBottom: 10,
        height: 30
    },
}

class CreatePostButton extends React.Component {

    TEXT_TAB = 0;
    LINK_TAB = 1;
    IMAGE_TAB = 2;
    VIDEO_TAB = 3;

    static async defaultProps() {
        return {
            sub: {}
        }
    }

    componentDidMount = async () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user)
                this.setState({uid: user.uid})
            else
                this.setState({uid: null})
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            title: "",
            sub: {},
            content: "",
            tab: 0
        };
        this.handleTitle = this.handleTitle.bind(this);
        this.handleContent = this.handleContent.bind(this);
        this.handleTab = this.handleTab.bind(this);
    }

    tabToType() {
        switch(this.state.tab) {
            case this.TEXT_TAB:
                return TYPE_TEXT;
            case this.LINK_TAB:
                return TYPE_LINK;
            case this.IMAGE_TAB:
                return TYPE_IMAGE;
            case this.VIDEO_TAB:
                return TYPE_VIDEO;
        }
    }

    handleOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    handleTitle(event) {
        this.setState({title: event.target.value});
    }

    handleContent(event) {
        this.setState({content: event.target.value});
    }

    handleTab(event, newValue) {
        this.setState({tab: newValue});
    }

    createPost() {
        if (this.state.uid) {
            let post = new Post({
                creator: this.state.uid,
                created: new Date(),
                title: this.state.title,
                sub: this.props.sub.documentId,
                subName: this.props.sub.name,
                content: this.state.content,
                type: this.tabToType()
            });
            post.save();
        }
        this.handleClose();
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Grid container justify="center">
                    <Fab onClick={() => this.handleOpen()} variant="extended" aria-label="Delete" color={"primary"}
                         className={classes.fab}>Créer un
                        post</Fab>
                </Grid>
                <Dialog open={this.state.open} onClose={() => this.handleClose()} aria-labelledby="simple-dialog-title">
                    <DialogContent>
                        <DialogTitle id="simple-dialog-title">Créer un post
                            sur {this.props.sub.getDisplayName()}</DialogTitle>
                        <AppBar position="static">
                            <Tabs value={this.state.tab} onChange={this.handleTab}>
                                <Tab label="Texte"/>
                                <Tab label="Lien"/>
                                <Tab label="Image"/>
                                <Tab label="Vidéo"/>
                            </Tabs>
                        </AppBar>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Titre du post"
                            type="text"
                            fullWidth
                            onChange={this.handleTitle}
                        />
                        {
                            this.state.tab === this.TEXT_TAB &&
                            <div>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Texte"
                                    type="text"
                                    fullWidth
                                    onChange={this.handleContent}
                                />
                            </div>
                        }
                        {
                            this.state.tab === this.LINK_TAB &&
                            <div>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Lien"
                                    type="text"
                                    fullWidth
                                    onChange={this.handleContent}
                                />
                            </div>
                        }
                        {
                            this.state.tab === this.IMAGE_TAB &&
                            <div>

                            </div>
                        }
                        {
                            this.state.tab === this.VIDEO_TAB &&
                            <div>

                            </div>
                        }
                        <Button onClick={() => this.createPost()} variant="contained" color="primary" fullWidth>
                            Créer
                        </Button>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(CreatePostButton);