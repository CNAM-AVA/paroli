import Model from "../config/Model";
import {firestore} from "../../lib/firebase";

const DEFAULT_VALUES = {
    created: null,
    creator: null,
    post: null,
    content: null,
    upvotes: 0,
    downvotes: 0,
    parentId: null,
};

const FILLABLE = [
    "created",
    "creator",
    "post",
    "content",
    "upvotes",
    "downvotes",
    "parentId",
];

const collectionName = "comments";

export default class Comment extends Model {
    collectionName = "comments";

    constructor(data = {}, documentId = null) {
        super(data, documentId, DEFAULT_VALUES, FILLABLE);
    }

    static getById(id) {
        return firestore.collection(collectionName).doc(id).get();
    }

    static getByPost(postId) {
        return firestore.collection(collectionName).where('post', '==', postId).where('parentId', '==', null).orderBy('created', 'desc').get();
    }

    static getSubComments(postId, commentId) {
        return firestore.collection(collectionName)
            .where('post', '==', postId)
            .where('parentId', '==', commentId)
            .orderBy('created', 'desc')
            .get();
    }

    static getNbComments(postId) {
        return firestore.collection(collectionName)
            .where('post', '==', postId)
            .get();
    }
}