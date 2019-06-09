import React from 'react'
import PostComponent from '../src/components/post/PostComponent'
import "../static/styles.scss"
import Layout from '../src/components/common/Layout';
import PostDB from '../database/models/Post';
import SubDB from '../database/models/Sub';
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
                  console.log('No such document!');
            } else {
				console.log(doc.id, '=>', doc.data());
				let post = doc.data();
				post.id = doc.id;
				post.created = moment.unix(post.created.seconds).fromNow();
				SubDB.getById(post.sub).then(doc => {
					if (!doc.exists) {
					  	console.log('No such document!');
					} else {
						let sub = doc.data();
						post.sub = 'p/'+sub.name;
					}
				})
				.catch(err => {
					console.log('Error getting document', err);
                });

                // let user = firestore.collection("subs").doc(this.state.uid).get();
                // user.then(doc => {
                //     if (!doc.exists) {
                //         console.log('No such document!');
                //     } else {
                //         let user = doc.data();
                //         console.log('user : ', user);
                //         post.creator = user;
                //     }
                // })
                // .catch(err => {
                //     console.log('Error getting document', err);
                // });
                this.setState({post : post});
            }
        })
		.catch(err => {
			console.log('Error getting documents', err);
        });
        this.state = {
            post: {},
        }
    }

    render() {
        let post = this.state.post;
        return(
            <Layout>
                <PostComponent post={post}/>
            </Layout>
        );
    }
}