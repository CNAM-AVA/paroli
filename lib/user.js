import firebase from '../lib/firebase'

// Load the arg user profile picture
export const getUserPictureWithID = async (uid) => {
    return new Promise((resolve, reject) => {
        const ppRef = firebase.storage().ref(`profile_pictures/${uid}.png`);
                
        ppRef.getDownloadURL().then((url) => {
            resolve(url)
        }).catch((error) => {
            reject(error)
        })
    })
}