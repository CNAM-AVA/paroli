import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import SinglePost from './DisplayPostsComponents/SinglePost';

const styles = {
    card: {
        marginBottom: 24
      },
}

class DisplayPosts extends React.Component {

    static async defaultProps() {
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
                            <SinglePost key={post.documentId+"-"+post.title} post={post} className={classes.card}></SinglePost>
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