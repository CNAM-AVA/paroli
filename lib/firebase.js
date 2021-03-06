import * as firebase from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID
};

if (!firebase.apps.length)
    firebase.initializeApp(config);

export default firebase;

export const firestore = firebase.firestore();
