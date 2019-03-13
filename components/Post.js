import React from 'react'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingRight: 30,
        paddingLeft: 30
    },
    cardsContainer: {
      marginTop: 20
    },
    link: {
        textDecoration: 'none',
        color: theme.primary
    }
});

class Post extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return(
            <p>Publication</p>
        )
    }
}

export default withStyles(styles)(Post);