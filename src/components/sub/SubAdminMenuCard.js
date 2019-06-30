import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import InfoCard from '../common/InfoCard';
import SubRow from '../common/SubRow';
import CreatePostButton from './CreatePostButton';
import firebase from "../../../lib/firebase";
import { Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core';

const styles = {
    card: {
        marginBottom: 24
    },
}

class SubDescriptionCard extends React.Component {
    
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
    
    handleOpenSettings() {
        this.setState({open: true});
    }
    
    handleCloseSettings() {
        this.setState({open: false});
    }
    
    
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }
    
    render() {
        const { classes } = this.props;
        
        return(
            <div>
            <Button variant="contained" color="primary" onClick={() => this.handleOpenSettings()}>
            Paramètres du sous-forum
            </Button>
            { this.subSettings() }
            </div>
            );
        }
        
        subSettings() {
            let sub = this.props.sub;
            
            return (
                <Dialog open={this.state.open} onClose={() => this.handleCloseSettings()} aria-labelledby="simple-dialog-title">
                <DialogContent>
                <DialogTitle id="simple-dialog-title">Paramètres de {this.props.sub.getDisplayName()}</DialogTitle>
                <ul>
                {
                    sub.getAdmins().map((admin, i) => {
                        return (
                            <li key={i}>{admin}</li>
                        )
                    })
                }
                </ul>
                <Button onClick={() => this.createPost()} variant="contained" color="primary" fullWidth>
                Créer
                </Button>
                </DialogContent>
                </Dialog>
                );
            }
        }
        
        export default withStyles(styles)(SubDescriptionCard);