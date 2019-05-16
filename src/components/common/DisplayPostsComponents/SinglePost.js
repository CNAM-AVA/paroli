import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, CardActions, Button, Fab, Collapse } from '@material-ui/core';
import { TYPE_TEXT, TYPE_IMAGE, TYPE_LINK, TYPE_VIDEO } from '../../../../lib/post';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';

const styles = {
    img: {
        'object-fit': 'cover',
        'max-width': '100%',
        'max-height': '100%',
        'margin-left': 'auto',
        'margin-right': 'auto',
        'display': 'block'
    },
    icon: {
        'display': 'inline-flex',
        'vertical-align': 'middle'
    },
    headerTitle: {
        'margin-bottom': '16px'
    },
    headerIconDiv: {
        'left': '90%',
        'transform': 'translateY(-24px)'
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
        this.state = {
            isShown: false,
            maxImageHeight: 480,
            dimensions: {
                height: 0,
                width: 0
            }
        }
        this.onImgLoad = this.onImgLoad.bind(this);
    }

    onImgLoad({target:img}) {
        this.setState({dimensions:{height:img.naturalHeight,
                                   width:img.naturalWidth}});
    }

    render() {
        const { classes } = this.props;

        return(
            <Card key={this.props.post.id+"-"+this.props.post.title} className={this.props.className}>
                <CardContent>
                    <Typography variant="h5" component="h2" className={classes.headerTitle}>
                        { this.props.post.title }
                    </Typography>
                    {(() => {
                        switch(this.props.post.media) {
                            case TYPE_TEXT:
                                return  <p>{this.props.post.content}</p>
                            case TYPE_IMAGE:
                                return  <div>
                                        <Collapse in={this.state.isShown} collapsedHeight={Math.min(this.state.maxImageHeight, this.state.dimensions.height)+'px'}>
                                            <div>
                                                <img onLoad={this.onImgLoad} className={classes.img} src={this.props.post.content}/>
                                            </div>
                                        </Collapse>
                                            {(() => {
                                                if(this.props.post.media === TYPE_IMAGE && this.state.dimensions.height > this.state.maxImageHeight)
                                                    return  <div>
                                                                <Fab size="small" className={classes.headerIconDiv} color="primary" aria-label="Add" onClick={() => { this.setState({isShown: !this.state.isShown}) }}>
                                                                {(() => {
                                                                    if(this.state.isShown)
                                                                        return <KeyboardArrowUp className={classes.icon}/>
                                                                    else
                                                                        return <KeyboardArrowDown className={classes.icon}/>
                                                                })()}
                                                                </Fab>
                                                            </div>
                                            })()}
                                            {this.state.dimensions.height}
                                        </div>
                            case TYPE_LINK:
                                return  <a href={this.props.post.content}>{this.props.post.title}</a>
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