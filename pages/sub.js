import React from 'react'
import "../static/styles.scss"
import Layout from '../src/components/common/Layout';
import SubNavbar from '../src/components/dashboard/SubNavbar';
import DisplayFilter from '../src/components/common/DisplayFilter';
import { Grid, Card, CardContent, CardActions, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    cardsContainer: {
      marginTop: 24
    },
});

class Sub extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
			posts : [
				{title : 'Titre', author: 'John Doe', media: 'img', content : '/static/img/landscape-img-test.jpg', date: '??/??/????'},
				{title : 'Lorem Ipsum Dolor Sit Amet', author: 'Jules César', media: 'txt', content : 'Lorem Ipsum Dolor Sit Amet', date: '??/??/????'},
				{title : 'Wiki mythologie grecque', author: 'Zeus', media: 'link', content : 'https://fr.wikipedia.org/wiki/Mythologie_grecque', date: '??/??/????'},
				{title : 'Un petit gif sympathique !', author: 'Giffy', media: 'img', content : '/static/img/gif-test.gif', date: '??/??/????'},
				{title : 'Just Do It !', author: 'Shia Laboeuf', media: 'video', content : '/static/video/video-test.mp4', date: '??/??/????'},
			 ],
		};
    } 

    render() {
        const { classes } = this.props;

        return(
            <Layout>
                <SubNavbar>
                    <DisplayFilter></DisplayFilter>
                </SubNavbar>
                <Grid container justify="center" className={classes.cardsContainer}>
                    <Grid item xs={10}>
                        <Grid container spacing={24}>
                            <Grid item xs={8}>
                                <Card>
                                    <CardContent>
                                        <Typography color="textSecondary" gutterBottom>
                                        Word of the Day
                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                        be
                                        nev
                                        lent
                                        </Typography>
                                        <Typography color="textSecondary">
                                        adjective
                                        </Typography>
                                        <Typography component="p">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Learn More</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                    Word of the Day
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                    be
                                    nev
                                    lent
                                    </Typography>
                                    <Typography color="textSecondary">
                                    adjective
                                    </Typography>
                                    <Typography component="p">
                                    well meaning and kindly.
                                    <br />
                                    {'"a benevolent smile"'}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Layout>
        );
    }
}

export default withStyles(styles)(Sub);