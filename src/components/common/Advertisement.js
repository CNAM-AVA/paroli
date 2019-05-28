import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

const styles = {
    img: {
        'object-fit': 'cover',
        'width': '100%',
        'max-height': '100%',
        'display': 'block'
    },
}

class Advertisement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            adverts: [
                {id:1, text:"Can't sleep? New sleeping pills are out!"}
            ],
            advert: {}
        }
    }

    componentDidMount() {
        this.pickAdvert();
    }

    render() {
        const { classes } = this.props;

        return(
            <Card>
                <CardContent>
                    <img src={"/static/img/adverts/ad_"+this.state.advert.id+".png"} className={classes.img}/>
                    {this.state.advert.text}
                </CardContent>
            </Card>
        );
    }

    pickAdvert() {
        this.setState({advert: this.state.adverts[Math.floor(Math.random() * this.state.adverts.length)]});
    }
}

export default withStyles(styles)(Advertisement);