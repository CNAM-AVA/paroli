import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Container } from 'next/app';
import AppNavigation from './AppNavigation'


const styles = {
    main: {
        background: 'url("../../static/background.png") no-repeat center center fixed',
        backgroundSize: 'cover'
    }
}

class Layout extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { classes } = this.props;

        return(
            <Container>
                <AppNavigation/>
                
                <div className={classes.main}>
                    {this.props.children}
                </div>
            </Container>
        );
    }
}

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layout);