import * as firebase from 'firebase/app'
import "firebase/firestore"

const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID
};

// If firebase is not already initialized
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
        
export const database = firebase.firestore();
export const firebaseApp = firebase.app();