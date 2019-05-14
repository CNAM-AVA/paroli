import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';

const styles = {

}

class Advertisement extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Card>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                    Word of the Day
                    </Typography>
                    <Typography variant="h5" component="h2">
                    be
                    lent
                    </Typography>
                    <Typography color="textSecondary">
                    adjective
                    </Typography>
                    <Typography component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(Advertisement);