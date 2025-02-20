import {IngredientCombo} from "./IngredientCombo.js";

export class Recipe {
    constructor(product, energy) {
        // Remote data
        this.product = product;
        this.energy = energy;

        // Static data
        this.baseFeps = [];
        this.baseHunger = -1;
        this.acceptSpices = false;

        // Dynamic data
        this.combos = [];
        this.possibleIngredients = new Set();
        this.variableIngredients = [];
    }

    addCombo(ingredients, feps, hunger) {
        const newCombo = new IngredientCombo(this, ingredients, feps, hunger);
        this.combos.push(newCombo);

        for (let ingredient of ingredients) {
            this.possibleIngredients.add(ingredient);
        }

        // TODO: check for unknown variable ingredient groups.
    }
}

function sortByFEP(a, b) {
    if (a[2] > b[2]) return -1;
    if (a[2] < b[2]) return 1;
    return 0;
}
