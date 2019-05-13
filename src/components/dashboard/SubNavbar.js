import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -18,
      marginRight: 10,
    },
  };

class SubNavbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        const { classes } =this.props;

        return(
            <div className={classes.root}>
                <AppBar position="static" color={"secondary"}>
                    <Toolbar variant="dense">
                        {this.props.children}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

SubNavbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SubNavbar);