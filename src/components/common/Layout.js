import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Container } from 'next/app';
import AppNavigation from './AppNavigation'


const styles = (theme) => ({
    main: {
        background: 'url("../../static/background2.png") no-repeat center center fixed',
        backgroundSize: 'cover',
        minHeight: 'calc(100vh - 64px)',
        [theme.breakpoints.down('xs')]: {
            minHeight: 'calc(100vh - 56px)'
        },
        paddingBottom: "24px"
    }
})

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