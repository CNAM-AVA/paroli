import Model from "../config/Model";
import {firestore} from "../../lib/firebase";

const DEFAULT_VALUES = {
    created: null,
    creator: null,
    mods: [],
    name: null,
    pageTitle: null,
};

const FILLABLE = [
    "created",
    "creator",
    "mods",
    "name",
    "pageTitle",
    "posts",
    "subscribersCount",
    "subscribers"
];

export default class Sub extends Model {
    collectionName = "subs";

    constructor(data = {}, documentId = null) {
        super(data, documentId, DEFAULT_VALUES, FILLABLE);
    }

    static getById(id) {
        return firestore.collection("subs").doc(id).get();
    }

    static getByName(name) {
        return firestore.collection("subs").where('name', '==', name).limit(1).get();
    }

    getDisplayName() {
        return "p/"+this.name;
    }
}