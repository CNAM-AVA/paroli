import Model from "../config/Model";
import {firestore} from "../../lib/firebase";
import { FILTER_TOP, FILTER_HOT, FILTER_NEW } from "../../lib/filters";
import firebase from "../../lib/firebase";

const DEFAULT_VALUES = {
    created: null,
    creator: null,
    sub: null,
    subName: null,
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
    "subName",
    "title",
    "type",
    "content",
    "upvotes",
    "downvotes",
];

const collectionName = "posts";

const db = firebase.firestore();

export default class Post extends Model {
    collectionName = "posts";
    
    constructor(data = {}, documentId = null) {
        super(data, documentId, DEFAULT_VALUES, FILLABLE);
    }

    getLink() {
        return "/p/"+this.subName+"/"+this.documentId;
    }

    static getByTitle(title) {
        return firestore.collection(collectionName).where('title', '==', title).limit(1).get();
    }

    static getById(id) {
        return firestore.collection(collectionName).doc(id).get();
    }

    static filtered(filters) {
        let coll = firestore.collection(collectionName);

        coll = coll.where("sub", "==", filters.sub.documentId);

        coll = Post.getOrderBy(coll, filters.filterType);

        if(filters.lastPost) {
            coll = coll.startAfter(filters.lastPost);
        }

        return coll.limit(filters.limit || 20).get();
    }

    static getOrderBy(coll, type) {
        switch(type) {
            case FILTER_TOP:
                return coll.orderBy("upvotes");
            case FILTER_NEW:
                return coll.orderBy("created");
            default:
                return coll.orderBy("upvotes");
        }
    }

    static upvote(id, decrement = null) {
        return db.collection(collectionName).doc(id).update({
            upvotes: firebase.firestore.FieldValue.increment(1),
            downvotes: decrement ? firebase.firestore.FieldValue.increment(-1) : firebase.firestore.FieldValue.increment(0)
        });
    }

    static downvote(id, decrement = null) {
        return db.collection(collectionName).doc(id).update({
            upvotes: decrement ? firebase.firestore.FieldValue.increment(-1) : firebase.firestore.FieldValue.increment(0),
            downvotes: firebase.firestore.FieldValue.increment(1)
        });
    }
}