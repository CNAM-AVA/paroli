import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';

const styles = {
    root: {
        display: 'flex',
        alignItems: 'center'
    },
    subnavItems: {
        padding: '0px 10px 0px 10px',
        margin: '0px 5px 0px 5px'
    },
    subNavTitle: {
        paddingRight: 20,
    }
}

class DisplayFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: {
                hot: true,
                new: false,
                trending: false
            }
        };
    }

    changeFilter(filter) {

        switch(filter) {
            case 'hot':
                this.setState({filter: {
                    hot: true,
                    new: false,
                    trending: false
                }})
                break;
            case 'new':
                this.setState({filter: {
                    hot: false,
                    new: true,
                    trending: false
                }})
                break;
            case 'trending':
                this.setState({filter: {
                    hot: false,
                    new: false,
                    trending: true
                }})
                break;
            default:
                return;
        }
    }

    render() {

        const { classes } = this.props;

        return(
            <div className={classes.root}>
                    <Typography variant={"body2"} className={classes.subNavTitle}>SORT BY</Typography>
                    <Chip className={classes.subnavItems} clickable onClick={() => this.changeFilter('hot')} color={"primary"} label={"Hot"} variant={this.state.filter.hot ? "default": "outlined"}></Chip>
                    <Chip className={classes.subnavItems} clickable onClick={() => this.changeFilter('new')} color={"primary"} label={"New"} variant={this.state.filter.new ? "default": "outlined"}></Chip>
                    <Chip className={classes.subnavItems} clickable onClick={() => this.changeFilter('trending')} color={"primary"} label={"Trending"} variant={this.state.filter.trending ? "default": "outlined"}></Chip>
            </div>
        );
    }
}

DisplayFilter.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DisplayFilter);
