import firebase from './firebase';

export default class Auth {
    static login(mail, pass)
    {
        return firebase.auth().signInWithEmailAndPassword(mail, pass);
    }

    static googleLogin(provider)
    {
        return firebase.auth().signInWithPopup(provider);
    }

    static register(mail, pass)
    {
        return firebase.auth().createUserWithEmailAndPassword(mail, pass);
    }
}