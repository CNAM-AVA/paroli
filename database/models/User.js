import Model from "../config/Model";
import {firestore} from "../../lib/firebase";

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

export default class User extends Model {
    collectionName = "users";

    constructor(data = {}, documentId = null) {
        super(data, documentId, DEFAULT_VALUES, FILLABLE);
    }

    static getById(id) {
        return firestore.collection("users").doc(id).get();
    }
}