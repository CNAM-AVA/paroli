import { firestore } from './firebase'
import Sub from "../database/models/Sub";
import User from '../database/models/User';

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
                        subscribersCount: 1,
                        subscribers: [params.UID]
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
 * Fetch the most popular subs
 * @param {number of subs to fetch} limit 
 */
export const getPopularSubs = (limit = 3) => {

    return new Promise((resolve, reject) => {

        let popularSubs = [];
        let subsRef = firestore.collection('subs');

        subsRef.orderBy('subscribersCount', 'desc').limit(limit).get().then((snapshot) => {
            snapshot.forEach((doc) => {
                popularSubs.push(doc.data())
            })
            resolve({
                popularSubs: popularSubs
            });
        }).catch((error) => {
            reject(error);
        });
    });

}

export const getSubPostsWithName = async (name) => {
    return new Promise(async (resolve, reject) => {

        if (name == null) {
            reject({
                error: "Invalid argument: name was not defined"
            })
        } else {
            // Get the sub id
            let id = await firestore.collection("subs").where("name", "==", name).get();
            id = id.docs[0].id;

            // Get post from this sub
            let fireposts = await firestore.collection("posts").where("sub", "==", id).get();
            let posts = [];

            fireposts.docs.forEach((doc) => {
                posts.push(doc.data());
            })

            resolve({
                posts: posts
            })
        }
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

/**
 * Add the user to the subscribers array in the sub document.
 * Add the sub id to the subsFollowed array int the user docuement
 * @param {UID of the user} userID 
 * @param {Sub id} subId 
 */
export const subscribeToSub = async (userID, subId) => {

    return new Promise(async (resolve, reject) => {

        if (userID == null || subId == null) {
            reject({
                error: 'Paramètres invalides'
            });
        } else {

            let sub = await Sub.getByName(subId);
            let user = await User.getById(userID); 

            user = new User(user.data(), userID);
            sub = new Sub(sub.docs[0].data(), sub.docs[0].id);
            
            // Add to sub document array
            sub.subscribers.push(userID);
            sub.subscribersCount += 1;
            
            // TODO: Add to user document array
            user.subsFollowed.push(subId);

            const saveToSubs = await sub.save();
            const saveToUser = await user.save();

            Promise.all([saveToSubs, saveToUser]).then((values) => {
                resolve({
                    subbed: true
                })
            }, error => {
                reject({
                    subbed: false,
                    error: error
                })
            })
        }
    })
}

/**
 * Remove the user from the subscribers array in the sub document.
 * Remove the sub id from the subsFollowed array int the user docuement
 * @param {UID of the user} userID 
 * @param {Sub id} subId 
 */
export const unsubscribeToSub = async (userID, subID) => {
    return new Promise(async (resolve, reject) => {

        if (userID == null || subID == null) {
            reject({
                error: 'Paramètres invalides'
            });
        } else {

            let sub = await Sub.getByName(subID);
            let user = await User.getById(userID); 

            user = new User(user.data(), userID);
            sub = new Sub(sub.docs[0].data(), sub.docs[0].id);
            
            // Remove from sub document array
            sub.subscribers.splice(userID, 1);
            sub.subscribersCount -= 1;
            
            // Remove from user document array
            user.subsFollowed.splice(subID, 1);

            const saveToSubs = await sub.save();
            const saveToUser = await user.save();

            Promise.all([saveToSubs, saveToUser]).then((values) => {
                resolve({
                    unsubbed: true
                })
            }, error => {
                reject({
                    unsubbed: false,
                    error: error
                })
            })
        }
    })
}

/**
 * Check if the specified user is subscribed to the specified sub.
 */
export const isUserSubbed = async (userId, subId) => {

    return new Promise(async (resolve, reject) => {

        let user = await User.getById(userId);
        user = new User(user.data(), userId);

        // User is subbed
        if (user.subsFollowed.includes(subId)) {
            resolve({
                user: userId,
                subId: subId,
                subbed: true
            })
        } else {
            resolve({
                user: userId,
                subId: subId,
                subbed: false
            })
        }
    })

}