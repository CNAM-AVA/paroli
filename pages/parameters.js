import React from 'react'
import Layout from '../src/components/common/Layout';
import { Grid, Typography } from '@material-ui/core';

export default class Parameters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return(
            <Layout>
                <Grid container alignItems={"center"} justify={"center"}>
                    <Grid item xs={6}>
                        <Typography variant={"body2"}>
                            Paramètres
                        </Typography>
                    </Grid>
                </Grid>
            </Layout>
        );
    }
}