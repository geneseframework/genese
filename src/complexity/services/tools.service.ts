
/**
 * clone object with deep copy
 * @param model
 */
export function clone(model: any): any {
    if (model) {
        if (Array.isArray(model)) {
            const newArray = [];
            model.forEach((item) => newArray.push(clone(item)));
            return newArray;
        } else if (typeof model === 'object') {
            const newObject = {};
            Object.keys(model).forEach((key) => (newObject[key] = clone(model[key])));
            return newObject;
        } else {
            return model;
        }
    } else {
        return model;
    }
}
