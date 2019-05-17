import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import InfoCard from '../common/InfoCard';

const styles = {
    p: {
        'margin-left': '16px',
        'margin': 0
    },
    title: {
        'margin': 0
    }
}

class SubRulesCard extends React.Component {

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

        return (
            <InfoCard title={"p/" + this.props.sub.name + " rules"}>
                {
                    this.props.sub.rules.map((rule, i) => {
                        return (
                            <div key={i}>
                                <h4 className={classes.title}>{i + 1}. {rule.title}</h4>
                                <p className={classes.p}>{rule.description}</p>
                            </div>
                        )
                    })}
            </InfoCard>
        );
    }
}

export default withStyles(styles)(SubRulesCard);