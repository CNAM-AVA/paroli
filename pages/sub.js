import React from 'react'
import "../static/styles.scss"
import SubComponent from '../src/components/sub/SubComponent';
import Layout from '../src/components/common/Layout';

export default class Post extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return(
            <Layout>
                <SubComponent/>
            </Layout>
        );
    }
}