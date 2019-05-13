import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Container } from 'next/app';
import AppNavigation from './AppNavigation'


const styles = {

}

class Layout extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Container>
                <AppNavigation/>
                {this.props.children}
            </Container>
        );
    }
}

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layout);