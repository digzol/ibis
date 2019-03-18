import {Recipe} from './Recipe.js';
import {getItemsData} from './ItemCollection.js';

let items;

class RecipeCollection {
    constructor() {
        this.source = './model/cookbook.json';
        this._entries = [];
        this._recipeTable = [];
        this._ingredientIndex = [];

        this.ready = this.init();
    }

    async init() {
        const json = $.getJSON(this.source);

        await $.when(getItemsData(), json).then((itemsData, data) => {
            items = itemsData.getEntries();
            parseData(this, data[0]);
        });

        return this;
    }

    getEntries() {
        return this._entries
    }

    getRecipeTable() {
        return this._recipeTable;
    }

    getIngredientIndex() {
        return this._ingredientIndex
    }
}

function parseData(holder, data) {
    const map = holder._entries;
    const table = holder._recipeTable;
    const index = holder._ingredientIndex;

    data['entries'].forEach(function(recipe) {
        const recipeID = recipe.id;
        const recipeItem = items[recipeID];
        const recipeEntries = recipe.entries;
        const opIngredients = recipe.optional || [];

        table.push(recipeItem);

        recipeEntries.forEach(function(entry) {
            const id = entry[0] || recipe.id;
            const resultItem = items[id];
            const ingredients = entry[1];
            const obj = new Recipe(recipe, entry, resultItem);

            map.push(obj);

            // Indexing ingredients
            ingredients.forEach(function(id) {
                const entry = items[id];
                if (entry === undefined) {
                    console.log("Unknown Item ID:", id);
                }

                if (!(id in index)){
                    const len = index.push(entry);
                    index[id] = index[len - 1];
                }

                // Checking if this recipe contains optional ingredients
                opIngredients.forEach(function(optionalIngredient) {
                    const typeID = optionalIngredient[0];
                    const set = items[typeID]["describes"];
                    if (set.includes(id)) {
                        obj.setOpIngredient(typeID, optionalIngredient[1]);
                    }
                })
            });
        });
    });

    map.sort(sortByName);
    table.sort(sortByName);
    index.sort(sortByName);
}

function sortByName(a, b) {
    if (a.getName() > b.getName()) return 1;
    if (a.getName() < b.getName()) return -1;
    return 0;
}

const instance = new RecipeCollection().ready;

export const getCookbookData = async function() {
    return await instance;
};