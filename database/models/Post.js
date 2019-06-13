import Model from "../config/Model";
import {firestore} from "../../lib/firebase";

const DEFAULT_VALUES = {
    created: null,
    creator: null,
    sub: null,
    title: null,
    type: null,
    content: null,
    upvotes: 0,
    downvotes: 0,
};

const FILLABLE = [
    "created",
    "creator",
    "sub",
    "title",
    "type",
    "content",
    "upvotes",
    "downvotes",
];

export default class Post extends Model {
    collectionName = "posts";

    constructor(data = {}, documentId = null) {
        super(data, documentId, DEFAULT_VALUES, FILLABLE);
    }

    static getByTitle(title) {
        return firestore.collection("posts").where('title', '==', title).limit(1).get();
    }

    static getById(id) {
        return firestore.collection("posts").doc(id).get();
    }

    static filtered(filters) {
        let coll = firestore.collection("posts");

        coll = coll.where("sub", "==", filters.sub.documentId);

        coll = coll.orderBy("upvotes");

        if(filters.lastPost) {
            coll = coll.startAfter(filters.lastPost);
        }

        return coll.limit(filters.limit || 20).get();
    }
}