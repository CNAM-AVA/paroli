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
                error: 'Paramètres inavlides'
            });
        } else {

            let sub = await Sub.getByName(subId);
            let user = await User.getById(userID); 

            console.log(user.data());

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
 * Check if the specified user is subscribed to the specified sub.
 */
export const isUserSubbed = async (userId, subId) => {

    return new Promise(async (resolve, reject) => {



    })

}