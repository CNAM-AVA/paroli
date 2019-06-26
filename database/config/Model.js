import {firestore} from "../../lib/firebase";

export default class Model {
    fillable = [];
    collectionName;

    constructor(data, documentId, defaultValues = {}, fillable = []) {
        this.defaultValues = defaultValues;
        this.resetToDefault();
        this.documentId = documentId;
        this.fillable = fillable;
        this.fill(data);
        this.clearAfterConstructor();
    }

    resetToDefault() {
        Object.entries(this.defaultValues).forEach(([key, value]) => {
            this[key] = value;
        });
    }

    fill(data) {
        Object.entries(data).forEach(([key, value]) => {
            if(this.fillable.includes(key))
                this[key] = value;
            }
        );
    }

    save() {
        if(this.documentId) {
            return firestore.collection(this.collectionName).doc(this.documentId).set(this.getData());
        } else {
            let newModel = firestore.collection(this.collectionName).doc();
            return newModel.set(this.getData());
        }
    }

    getData() {
        let ret = {};
        this.fillable.forEach((e) => {
            if(typeof this[e] !== 'undefined') {
                ret[e] = this[e];
            } else {
                ret[e] = this.defaultValues[e];
            }
        });
        return ret;
    }

    clearAfterConstructor() {

    }
}