import React from 'react'
import "../static/styles.scss"
import Layout from '../src/components/common/Layout';
import SubNavbar from '../src/components/dashboard/SubNavbar';
import DisplayFilter from '../src/components/common/DisplayFilter';
import { Grid, Card, CardContent, CardActions, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Advertisement from '../src/components/common/Advertisement';
import DisplayPosts from '../src/components/common/DisplayPosts';

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
				{title : 'Lorem Ipsum Dolor Sit Amet', author: 'Jules César', media: 'txt', content : 'Valentin mon meilleur copain', date: '??/??/????'},
				{title : 'Wiki mythologie grecque', author: 'Zeus', media: 'link', content : 'https://fr.wikipedia.org/wiki/Mythologie_grecque', date: '??/??/????'},
				{title : 'Un petit gif sympathique !', author: 'Giffy', media: 'img', content : '/static/img/gif-test.gif', date: '??/??/????'},
				{title : 'Just Do It !', author: 'Shia Laboeuf', media: 'video', content : 'https://www.youtube.com/embed/watch?v=qD54sROmeIM?autoplay=1', date: '??/??/????'},
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
						<Grid container justify="center" spacing={24}>
							<Grid item xs={6}>
								<DisplayPosts posts={this.state.posts}></DisplayPosts>
							</Grid>
							<Grid item xs={3}>
								<Advertisement></Advertisement>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Layout>
		);
	}
}

export default withStyles(styles)(Sub);