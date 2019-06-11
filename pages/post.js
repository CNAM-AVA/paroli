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
        console.log(props.query.post);
        super(props);
        let postDB = PostDB.getById(props.query.post);
		postDB.then(doc => {
            if (!doc.exists) {
                  console.log('No such post!');
            } else {
				console.log(doc.id, '=>', doc.data());
				let post = doc.data();
				post.id = doc.id;
				post.created = moment.unix(post.created.seconds).fromNow();
				SubDB.getById(post.sub).then(doc => {
					if (!doc.exists) {
					  	console.log('No such sub!');
					} else {
						let sub = doc.data();
						post.sub = 'p/'+sub.name;
					}
				})
				.catch(err => {
					console.log('Error getting sub', err);
                });

                let comDB = ComDB.getByPost(post.id);
                comDB.then(snapshot => {
                    if (snapshot.empty) {
                        console.log('No matching comments.');
                        return;
                    }
                    snapshot.forEach(doc => {
                        console.log(doc.id, '=>', doc.data());
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

                this.setState({post : post});
            }
        })
		.catch(err => {
			console.log('Error getting post', err);
        });
        this.state = {
            post: {},
            comments: [],
        };
    }

    render() {
        let post = this.state.post;
        let comments = this.state.comments;
        return(
            <Layout>
                <PostComponent post={post} comments={comments}/>
            </Layout>
        );
    }
}