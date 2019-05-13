import React from 'react'
import Dashboard from '../src/components/dashboard/Dashboard'
import "../static/styles.scss"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../src/components/common/Layout';
import SubNavbar from '../src/components/dashboard/SubNavbar';

const styles = {

}

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: "yes"
        };
    }

    render() {
        return(
            <Layout>
                <SubNavbar>
                    <p>Test</p>
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