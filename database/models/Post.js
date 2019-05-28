import Model from "../config/Model";
import {firestore} from "../../lib/firebase";

const DEFAULT_VALUES = {
    comments: [],
    content: null,
    created: null,
    creator: null,
    downvotes: 0,
    upvotes: 0,
    type: null,
};

const FILLABLE = [
    "comments",
    "content",
    "created",
    "creator",
    "downvotes",
    "upvotes",
    "type",
];

export default class Post extends Model {
    constructor(data = {}) {
        super(data, DEFAULT_VALUES, FILLABLE);
    }
}