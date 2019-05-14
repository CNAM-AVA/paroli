import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';

const styles = {
    card: {
        marginBottom: 24
      },
}

class DisplayPosts extends React.Component {

    getDefaultProps() {
        return {
            posts: []
        }
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return(
            <Grid container>
                <Grid item xs={12}>
                {
                    this.props.posts.map((post, i) => {     
                    return (
                    <Card className={classes.card}>
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
                    ) 
                })}
                    
                </Grid>
            </Grid>
        );
    }
}

DisplayPosts.defaultProps = {
    posts: []
  };

export default withStyles(styles)(DisplayPosts);