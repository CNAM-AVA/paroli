import React from 'react'
import { withStyles } from '@material-ui/core/styles';

const styles = {

}

class NoResultsFound extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <p>Aucun résultat trouvé !</p>
        );
    }
}

export default withStyles(styles)(NoResultsFound);