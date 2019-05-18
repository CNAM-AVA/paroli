import Model from "../config/Model";
import {firestore} from "../../lib/firebase";

const DEFAULT_VALUES = {
    created: null,
    creator: null,
    mods: [],
    name: null,
    pageTitle: null,
    posts: []
};

const FILLABLE = [
    "created",
    "creator",
    "mods",
    "name",
    "pageTitle",
    "posts"
];

export default class Sub extends Model {
    constructor(data = {}) {
        super(data, DEFAULT_VALUES, FILLABLE);
    }

    static getByName(name) {
        return firestore.collection("subs").where('name', '==', name).limit(1);
    }
}