import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  TextField,
  Typography,
  Fab,
  SvgIcon
}from '@material-ui/core'

const styles = {
  loginButton: {
    margin: '20px 0px 0px 0px'
  },
  fab: {
    marginTop: 20,
    width: '100%'
  }
}

class LoginModal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { classes } = this.props;

    return(
        <Dialog
          open={this.props.visible}
          onClose={this.props.visibilityHandler}
        >
        <DialogTitle id="form-dialog-title">Connexion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send
            updates occasionally.
          </DialogContentText>
          <br/>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            required
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="name"
            label="Mot de passe"
            type="password"
            fullWidth
            required
            variant="outlined"
          />
          <Typography variant={'body2'}>Mot de passe oublié</Typography>
          <Fab variant="extended" color="primary" className={classes.fab}>Connexion</Fab>
          <Fab variant="extended" aria-label="Delete" color={"secondary"} className={classes.fab}>Connexion avec Google</Fab>
        </DialogContent>
      </Dialog>
    );
  }
}

LoginModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginModal);
