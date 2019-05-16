import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import InfoCard from '../common/InfoCard';
import SubRow from '../common/SubRow';

const styles = {
    card: {
        marginBottom: 24
      },
}

class SubDescriptionCard extends React.Component {

    static async defaultProps() {
        return {
            sub: {}
        }
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return(
            <InfoCard title={"p/"+this.props.sub.name}>
                <SubRow community={this.props.sub}></SubRow>
                <p>Lorem ipsum dolor sit amet</p>
            </InfoCard>
        );
    }
}

export default withStyles(styles)(SubDescriptionCard);