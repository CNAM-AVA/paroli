import React from 'react'
import PostComponent from '../src/components/post/PostComponent'
import "../static/styles.scss"
import Layout from '../src/components/common/Layout';
import PostDB from '../database/models/Post';
import SubDB from '../database/models/Sub';
import ComDB from '../database/models/Comment';
import moment from 'moment';
import firebase from "../lib/firebase";
import {firestore} from "../lib/firebase";


export default class Post extends React.Component {

	static async getInitialProps({query}) {
		return {
			query
		}
	}

	constructor(props) {
		super(props);
		this.loadPost();
		this.state = {
			post: {},
			comments: [],
		};
		this.handleCommentEvent = this.handleCommentEvent.bind(this);
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
				comments.push(comment);
				this.setState({comments : comments});
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
				this.loadComments(post.id);
				this.setState({post : post});
				this.loadSub(post.sub);

			}
		})
		.catch(err => {
			console.log('Error getting post', err);
		});
	}

	

	handleCommentEvent(multiline, uid, parentComment = null){
		console.log('tutu : ', multiline);
		
		if(parentComment){
			let comment = {
				creator: uid,
				created: new Date(),
				post: this.state.post.id,
				content: multiline,
				comments: [],
				upvotes: 0,
				downvotes: 0,
			};
			let parent = firestore.collection("comments").doc(parentComment.id);
			console.log('new comment : ', comment);
			console.log('muti : ', multiline);
			parent.update({
				comments: firebase.firestore.FieldValue.arrayUnion(comment)
			}).then(() => {
				console.log('comment saved sucessfully !');
				this.loadComments(this.state.post.id);
				console.log('comments : ', this.state.comments);
			});
		} else {
			let comment = new ComDB({
				creator: uid,
				created: new Date(),
				post: this.state.post.id,
				content: multiline,
				comments: [],
			});
			console.log('new comment : ', comment);
			console.log('muti : ', multiline);
			comment.save().then(() => {
				console.log('comment saved sucessfully !');
				this.loadComments(this.state.post.id);
				console.log('comments : ', this.state.comments);
			});
		}
		
	}

	render() {
		let post = this.state.post;
		let comments = this.state.comments;

		return(
			<Layout>
				<PostComponent post={post} comments={comments} event={this.handleCommentEvent} />
			</Layout>
		);
	}
}