import {Recipe} from './Recipe.js';
import {GetOrCreateItem} from './ItemCollection.js';
import {RemoteDataEntry} from "./Remote/RemoteDataEntry.js";

class RecipeCollection {
    constructor() {
        this.source = '/ibis/assets/json/cookbook.json';
        this.recipes = [];
    }

    getEntries() {
        return this.recipes
    }

    async loadData(sourceURL) {
        this.source = sourceURL;

        if (this.source == null)
            return null;

        await $.getJSON(this.source).then((data) => this.parseData(data));
        return this;
    }

    getOrCreateEntry(id, product, energy) {
        if (!(id in this.recipes))
        {
            const newRecipe = new Recipe(product, energy);
            this.recipes[id] = newRecipe;
            this.recipes.push(newRecipe);
        }
        return this.recipes[id];
    }

    parseData(data) {
        for (let key in data) {
            const entry = new RemoteDataEntry(data[key]);

            if (entry.ingredients.length === 0) {
                console.log(`Skipped '${entry.itemName}'; Uncraftable.`);
                continue; // Ignore uncraftable food
            }

            if (entry.mixedIngredients)
                continue; // Ignore mixed-ingredient food

            // Add new item
            const product = GetOrCreateItem(entry.id ,entry.itemName, entry.resourceName);

            // Add new recipe
            const recipe = this.getOrCreateEntry(entry.id, product, entry.energy);

            const ingredients = entry.ingredients.map((ingredient) => {
                return GetOrCreateItem(ingredient.id, ingredient.name);
            });

            const feps = entry.feps.map((fep) => {
                return [fep.type, fep.mult, fep.value];
            })

            // Add ingredient combo to recipe
            recipe.addCombo(ingredients, feps, entry.hunger);
        }
    }
}

// Old parser for local JSON
/*
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
            const id = entry[0] || recipe.id;
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
*/

function sortByName(a, b) {
    if (a.getName() > b.getName()) return 1;
    if (a.getName() < b.getName()) return -1;
    return 0;
}

const instance = new RecipeCollection();

export const Recipes = instance.getEntries();
export const LoadRecipeData = (...args) => instance.loadData(...args);
