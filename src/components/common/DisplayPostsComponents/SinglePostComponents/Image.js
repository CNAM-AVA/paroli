import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Collapse, Fab } from '@material-ui/core';
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
    headerIconDiv: {
        'left': '90%',
        'transform': 'translateY(-24px)',
        'margin-bottom': '-24px'
    }
}

class Image extends React.Component {

    static async defaultProps() {
        return {
            post: {},
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
            <div>
                <Collapse in={this.state.isShown} collapsedHeight={Math.min(this.state.maxImageHeight, this.state.dimensions.height)+'px'}>
                    <div>
                        <img onLoad={this.onImgLoad} className={classes.img} src={this.props.post.content}/>
                    </div>
                </Collapse>
                {(() => {
                    if(this.state.dimensions.height > this.state.maxImageHeight)
                        return  <div>
                                    <Fab size="small" className={classes.headerIconDiv} color="primary" aria-label="Add" onClick={() => { this.setState({isShown: !this.state.isShown}) }}>
                                    {(() => {
                                        if(this.state.isShown)
                                            return <KeyboardArrowUp/>
                                        else
                                            return <KeyboardArrowDown/>
                                    })()}
                                    </Fab>
                                </div>
                })()}
            </div>
        );
    }
}

export default withStyles(styles)(Image);