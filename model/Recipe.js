export class Recipe {
    constructor(recipe, entry, base) {
        Object.assign(this, base);

        this.ingredients = entry[1];
        this.fep = entry[2];
        this.fep.sort(sortByFEP);
        this._opIngredients = {};
    }

    getOpIngredients() {
        return this._opIngredients;
    }

    setOpIngredient(index, value) {
        this._opIngredients[index] = value;
    }
}

function sortByFEP(a, b) {
    if (a[2] > b[2]) return -1;
    if (a[2] < b[2]) return 1;
    return 0;
}