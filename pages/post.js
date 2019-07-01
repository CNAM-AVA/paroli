import React from 'react'
import PostComponent from '../src/components/post/PostComponent'
import "../static/styles.scss"
import Layout from '../src/components/common/Layout';
import PostDB from '../database/models/Post';
import SubDB from '../database/models/Sub';
import ComDB from '../database/models/Comment';
import UserDB from '../database/models/User';
import moment from 'moment';
import firebase from "../lib/firebase";
import { getUserPictureWithID } from '../lib/user';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
	snackBar: {
        backgroundColor: '#ffa000'
    },
})

class Post extends React.Component {

	static async getInitialProps({query}) {
		return {
			query
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			post: {},
			comments: [],
			uid: null,
			user: {},
			showSnackBar: false,
            snackbarContent: '',
		};
		this.handleCommentEvent = this.handleCommentEvent.bind(this);
		this.upvote = this.upvote.bind(this);
		this.downvote = this.downvote.bind(this);
		this.voted = false;
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user){
				this.setState({uid: user.uid});
				this.loadUser(user.uid);
			}
			else
				this.setState({uid: null})
		});
		this.loadPost();
	}

	loadUser(userId){
		UserDB.getById(userId).then(doc => {
			if (!doc.exists) {
				console.log('No such user!');
			} else {
				let user = doc.data();
				this.setState({user: user});
			}
		})
		.catch(err => {
			console.log('Error getting user', err);
		});
	}

	loadCreator(creatorId){
		UserDB.getById(creatorId).then(doc => {
			if (!doc.exists) {
				console.log('No such creator!');
			} else {
				let post = this.state.post;
				post.creator = doc.data().username;
				this.loadUserPicture(doc.id);
				this.setState({post : post});
			}
		})
		.catch(err => {
			console.log('Error getting sub', err);
		});
	}

	loadCommentCreator(creatorId, index){
		UserDB.getById(creatorId).then(doc => {
			if (!doc.exists) {
				console.log('No such creator!');
			} else {
				let comments = this.state.comments;
				comments[index].creator = doc.data().username; 
				this.setState({comments : comments});
			}
		})
		.catch(err => {
			console.log('Error getting sub', err);
		});
	}

	loadUserPicture(userId){
		getUserPictureWithID(userId).then((url) => {
			let post = this.state.post;
			post.creatorAvatar = url;
			this.setState({post: post});
		}).catch((error) => {
			console.log(error);
			let post = this.state.post;
			post.creatorAvatar = null;
			this.setState({post: post});
		})
	}

	loadSub(sub){
		SubDB.getById(sub).then(doc => {
			if (!doc.exists) {
				console.log('No such sub!');
			} else {
				let post = this.state.post;
				post.sub = 'p/'+doc.data().name;
				this.setState({post : post});
			}
		})
		.catch(err => {
			console.log('Error getting sub', err);
		});
	}

	loadComments(postId){
		let comDB = ComDB.getByPost(postId);
		comDB.then(snapshot => {
			if (snapshot.empty) {
				console.log('No matching comments.');
				return;
			}
			this.setState({comments : []});
			snapshot.forEach(doc => {
				let comments = this.state.comments;
				let comment = doc.data();
				comment.id = doc.id;
				comment.created = moment.unix(comment.created.seconds).fromNow();
				let length = comments.push(comment);
				this.setState({comments : comments});
				this.loadCommentCreator(comment.creator, length-1);
			});
		})
		.catch(err => {
			console.log('Error getting comments', err);
		});
	}

	loadPost(){
		let postDB = PostDB.getById(this.props.query.post);
		postDB.then(doc => {
			if (!doc.exists) {
				console.log('No such post!');
			} else {
				let post = doc.data();
				post.id = doc.id;
				post.created = moment.unix(post.created.seconds).fromNow();
				this.loadCreator(post.creator);
				this.loadComments(post.id);
				this.setState({post : post});
				this.loadSub(post.sub);
			}
		})
		.catch(err => {
			console.log('Error getting post', err);
		});
	}

	upvote() {
			console.log('up');
			let post = this.state.post;
			post.upvotes = post.upvotes + 1;
			if(this.voted || this.state.user.downvotedPosts.includes(post.id)){
				PostDB.upvote(post.id, true);
				this.voted = true;
			}
			else
				PostDB.upvote(post.id);

			UserDB.upvote(this.state.uid, post.id);
		
	
	}

	downvote() {
		if(this.state.uid){
			console.log('down');

			let post = this.state.post;
			post.downvotes = post.downvotes + 1;
			if(this.voted || this.state.user.upvotedPosts.includes(post.id)){
				PostDB.downvote(post.id, true);
				this.voted = true;
			}
			else
				PostDB.downvote(post.id);

			UserDB.downvote(this.state.uid, post.id);
		} else {
			this.setState({
                showSnackBar: true,
                snackbarContent: 'Vous devez vous connecter pour voter'
            })
		}
	}

	handleCommentEvent(multiline, uid, parentComment = null){
		let comment = new ComDB({
			creator: uid,
			created: new Date(),
			post: this.state.post.id,
			content: multiline,
			parentId: parentComment,
		});
		comment.save().then(() => {
			console.log('comment saved sucessfully !');
			this.loadComments(this.state.post.id);
		});
		
	}

	render() {
		const { classes } = this.props;
		let post = this.state.post;
		let comments = this.state.comments;
		let user = this.state.user;

		return(
			<Layout>
				<PostComponent postId={post.id} post={post} comments={comments} user={user} event={this.handleCommentEvent} upvote={this.upvote} downvote={this.downvote} upvotes={post.upvotes} downvotes={post.downvotes}/>
			</Layout>
		);
	}
}

export default withStyles(styles)(Post);