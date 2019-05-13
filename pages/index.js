import React from 'react'
import Dashboard from '../src/components/dashboard/Dashboard'
import "../static/styles.scss"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../src/components/common/Layout';
import SubNavbar from '../src/components/dashboard/SubNavbar';
import { Button, Typography } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import DisplayFilter from '../src/components/common/DisplayFilter'

const styles = {
    subnavItems: {
        padding: '0px 10px 0px 10px',
        margin: '0px 5px 0px 5px'
    },
    subNavTitle: {
        paddingRight: 20
    }
}

class Index extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { classes } = this.props;

        return(
            <Layout>
                <SubNavbar centered={true}>
                    <DisplayFilter/>
                </SubNavbar>
                <Dashboard/>
            </Layout>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
