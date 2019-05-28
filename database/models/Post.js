import Model from "../config/Model";

const DEFAULT_VALUES = {
    created: null,
    creator: null,
    sub: null,
    title: null,
    type: null,
    content: null,
};

const FILLABLE = [
    "created",
    "creator",
    "sub",
    "title",
    "type",
    "content"
];

export default class Post extends Model {
    collectionName = "posts";

    constructor(data = {}, documentId = null) {
        super(data, documentId, DEFAULT_VALUES, FILLABLE);
    }
}