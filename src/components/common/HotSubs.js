import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Avatar, Typography, Button } from '@material-ui/core'
import InfoCard from './InfoCard'
import SubRow from './SubRow'
import { getPopularSubs } from '../../../lib/sub';

const styles = theme => ({

})

class HotSubs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hotCommunities: []
        }
    }

    componentWillMount() {

        getPopularSubs().then((data) => {

            const filteredData = data.popularSubs.filter((sub) => sub.name !== this.props.subName)

            this.setState({
                hotCommunities: filteredData
            })

            console.log(this.state.hotCommunities)
        }).catch((error) => {
            console.log(error)
        });
    }

    render() {

        const { classes } = this.props;

        return (
            <InfoCard title="Hot" icon='hot'>
                <Typography variant="subtitle1" color="primary">
                    Communities
                </Typography>
                {
                    this.state.hotCommunities.map((community, index) => {
                        return (
                            <SubRow key={index} community={community} />
                        )
                    })
                }
            </InfoCard>
        )
    }

}

HotSubs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HotSubs);