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

    componentDidMount() {
        window.addEventListener("resize", this.onResize);
    }

    constructor(props) {
        super(props);
        this.state = {
            isShown: false,
            maxImageHeight: 480,
            dimensions: {
                height: 0,
                width: 0
            },
            imageHeight: 200
        }
        this.onImgLoad = this.onImgLoad.bind(this);
        this.onResize = this.onResize.bind(this);
    }

    onImgLoad({target:img}) {
        this.setState({imageHeight: img.height});
    }

    onResize() {
        this.setState({imageHeight: document.getElementById("image").height})
    }

    render() {
        const { classes } = this.props;

        return(
            <div>
                <Collapse in={this.state.isShown} collapsedHeight={Math.min(this.state.maxImageHeight, this.state.imageHeight)+'px'}>
                    <div>
                        <img onLoad={this.onImgLoad} className={classes.img} src={this.props.post.content} id="image"/>
                    </div>
                </Collapse>
                {(() => {
                    if(this.state.imageHeight > this.state.maxImageHeight)
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