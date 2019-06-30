export const TYPE_TEXT = "text";
export const TYPE_IMAGE = "img";
export const TYPE_VIDEO = "video";
export const TYPE_LINK = "link";
import { firestore } from './firebase'

/**
 * Fetch random posts
 * Return an array of posts : [{post}]
 */
export const fetchRandom = async () => {
    return new Promise((resolve, reject) => {
        firestore.collection("posts").orderBy("created", "desc").limit(50).get().then((snapshot) => {
            let docs = [];
            snapshot.forEach((doc) => {
                docs.push(doc.data())
            })
            resolve(docs)
        })
    })
}