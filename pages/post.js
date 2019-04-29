import React from 'react'
import PostComponent from '../components/PostComponent'
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
                <PostComponent/>
            </MainLayout>
        );
    }
}