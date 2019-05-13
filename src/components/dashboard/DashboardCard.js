import React from 'react'
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FlipToFrontIcon from '@material-ui/icons/FlipToFront';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ListIcon from '@material-ui/icons/List';
import TurnedInNot from '@material-ui/icons/TurnedInNot';
import Divider from "@material-ui/core/Divider";
import Link from 'next/link'
import Typography from "@material-ui/core/Typography";


const styles = theme => ({
    card: {
    },
    cardHeader: {
        paddingTop: 10
    },
    avatar: {
        backgroundColor: 'transparent',
        color: 'black',
    },
    actions: {
        '&:hover': {
            backgroundColor: 'lightgrey'
        },
        transition: '.5s',
        cursor: 'pointer',
        height: 40,
        '& p': {
            marginTop: 5,
            marginBottom: 5
        },
        bottom: 0
    },
    headerActionsIcon: {
        '&:hover': {
            backgroundColor: 'transparent'
        },
    },
    actionsIcon: {
        color: 'black',
        '&:hover': {
            backgroundColor: 'transparent'
        },
        marginTop: 5,
        marginBottom: 5
    }
});

class DashboardCard extends React.Component {

    constructor(props) {
        super(props);
    }

    chooseAvatarIcon() {

        if (this.props.icon === undefined)
            return;

        switch (this.props.icon) {
            case "list":
                return <ListIcon/>
            case "flipToFront":
                return <FlipToFrontIcon/>
            case "turnedInNot":
                return <TurnedInNot/>
            default:
                return
        }
    }

    render() {
        const { classes } = this.props;

        return(
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar className={ classes.avatar }>
                            {this.chooseAvatarIcon()}
                        </Avatar>
                    }
                    action={
                        <IconButton className={classes.headerActionsIcon}>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={this.props.title}
                    className={classes.cardHeader}
                />
                <CardContent>
                    {this.props.children}
                </CardContent>
                <Divider/>
                <Link href={this.props.link}>
                    <CardActions className={classes.actions}>
                        <IconButton className={classes.actionsIcon}>
                            <ArrowForwardIcon/>
                        </IconButton>
                        <Typography component={"p"}>{this.props.linkTitle}</Typography>
                    </CardActions>
                </Link>
            </Card>
        );
    }
}

export default withStyles(styles)(DashboardCard);