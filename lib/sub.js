import { firestore } from './firebase'
import Sub from "../database/models/Sub";

/**
 * Create a sub
 */
export const firestoreCreateSub = async (params) => {

    // Required fields
    if (
        params.UID == null ||
        params.name == null ||
        params.pageTitle == null
    ) return;

    return new Promise((resolve, reject) => {
        Sub.getByName(params.name)
            .then((snapshot) => {
                console.log(snapshot.size);
                // Sub already exists
                if (snapshot.size > 0) {
                    // Reject
                    reject({
                        created: false,
                        error: 'Ce sub existe déjà.'
                    })
                }
                else {

                    let sub = new Sub({
                        created: new Date,
                        creator: params.UID,
                        mods: [
                            params.UID
                        ],
                        name: params.name,
                        pageTitle: params.pageTitle,
                        posts: [],
                        subscribers: 0
                    });
                    sub.save()
                    // Sub created
                    .then(() => {
                        resolve({
                            created: true,
                            error: ''
                        })
                    })
                    // Reject
                    .catch((e) => {
                        reject({
                            created: false,
                            error: e
                        })
                    })
                }
            })
    })
}

/**
 * Add mod user to a sub
 */
export const firestoreAddModToSub = (subId, modId) => {

    if (
        subId == null ||
        modId == null
    ) return;
}