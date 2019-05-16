import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import { TYPE_TEXT, TYPE_IMAGE, TYPE_LINK, TYPE_VIDEO } from '../../../../lib/post';

const styles = {
    img: {
        'object-fit': 'cover',
        'width': '100%',
        'max-height': '100%'
      }
}

class SinglePost extends React.Component {

    static async defaultProps() {
        return {
            post: {},
            className: ""
        }
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return(
            <Card key={this.props.post.id+"-"+this.props.post.title} className={this.props.className}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        { this.props.post.title }                            
                    </Typography>
                    {(() => {
                        switch(this.props.post.media) {
                            case TYPE_TEXT:
                                return  <p>{this.props.post.content}</p>
                            case TYPE_IMAGE:
                                return  <img className={classes.img} src={this.props.post.content}/>
                            case TYPE_LINK:
                                return  <p>{this.props.post.title}</p>
                            case TYPE_VIDEO:
                                return  <p>WIP</p>
                            
                        }
                    })()}
                </CardContent>
                <CardActions>
                    <Button size="small">Comments</Button>
                    <Button size="small">Upvote</Button>
                    <Button size="small">Downvote</Button>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(SinglePost);