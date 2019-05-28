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
    "subscribers",
];

export default class Sub extends Model {
    collectionName = "subs";

    constructor(data = {}, documentId = null) {
        super(data, documentId, DEFAULT_VALUES, FILLABLE);
    }

    static getByName(name) {
        return firestore.collection("subs").where('name', '==', name).limit(1);
    }

    getDisplayName() {
        return "p/"+this.name;
    }
}