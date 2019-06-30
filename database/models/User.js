import Model from "../config/Model";
import {firestore} from "../../lib/firebase";
import firebase from "../../lib/firebase";

const DEFAULT_VALUES = {
    "admin": 0,
    "created": new Date(),
    "decibels": 0,
    "downvotedPosts": [],
    "upvotedPosts": [],
    "subsFollowed": [],
    "username": null,
    "mail": null
};

const FILLABLE = [
    "admin",
    "created",
    "decibels",
    "downvotedPosts",
    "upvotedPosts",
    "subsFollowed",
    "username",
    "mail"
];

const collectionName = "users";

export default class User extends Model {
    

    constructor(data = {}, documentId = null) {
        super(data, documentId, DEFAULT_VALUES, FILLABLE);
    }

    static getById(id) {
        return firestore.collection(collectionName).doc(id).get();
    }

    static upvote(userId, postId) {
        return firestore.collection(collectionName).doc(userId).update({
            upvotedPosts: firebase.firestore.FieldValue.arrayUnion(postId),
            downvotedPosts: firebase.firestore.FieldValue.arrayRemove(postId)
        });
    }

    static downvote(userId, postId) {
        return firestore.collection(collectionName).doc(userId).update({
            downvotedPosts: firebase.firestore.FieldValue.arrayUnion(postId),
            upvotedPosts: firebase.firestore.FieldValue.arrayRemove(postId)
        });
    }
}