export default class Model {
    fillable = [];

    constructor(data, defaultValues = {}, fillable = []) {
        this.fill(defaultValues);
        this.fillable = fillable;
        this.fill(data);
        this.clearAfterConstructor();
    }

    fill(data) {
        Object.entries(data).forEach(([key, value]) => {
            if(this.fillable.includes(key))
                this[key] = value;
            }
        );
    }

    clearAfterConstructor() {

    }
}