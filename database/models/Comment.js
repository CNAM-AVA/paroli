import Model from "../config/Model";

const DEFAULT_VALUES = {
    created: null,
    creator: null,
    post: null,
    content: null,
    upvotes: 0,
    downvotes: 0,
};

const FILLABLE = [
    "created",
    "creator",
    "post",
    "content",
    "upvotes",
    "downvotes",
];

export default class Comment extends Model {
    collectionName = "comments";

    constructor(data = {}, documentId = null) {
        super(data, documentId, DEFAULT_VALUES, FILLABLE);
    }
}