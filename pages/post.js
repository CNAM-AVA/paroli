import React from 'react'
import Dashboard from '../components/Dashboard'
import "../static/styles.scss"
import MainLayout from "../layouts/MainLayout";

export default class Post extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return(
            <MainLayout>
                <Post/>
            </MainLayout>
        );
    }
}