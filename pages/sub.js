import React from 'react'
import "../static/styles.scss"
import MainLayout from "../layouts/MainLayout";
import SubComponent from '../components/SubComponent';

export default class Post extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return(
            <MainLayout>
                <SubComponent/>
            </MainLayout>
        );
    }
}