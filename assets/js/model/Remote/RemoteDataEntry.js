import {RemoteIngredientEntry} from "./RemoteIngredientEntry.js";
import {RemoteFEPEntry} from "./RemoteFEPEntry.js";

export class RemoteDataEntry {
  constructor(data) {
    this.itemName = data['itemName'];
    this.resourceName = data['resourceName'];
    this.hunger = data['hunger'];
    this.energy = data['energy'];
    this.feps = [];
    this.ingredients = [];

    // whether some variable ingredients were mixed (e.g. 50% mushroom A and 50% mushroom B)
    this.mixedIngredients = false;

    this.id = this.assignId();

    data['ingredients'].forEach((entry) => {
      const ingredient = new RemoteIngredientEntry(entry);
      this.ingredients.push(ingredient);
      this.mixedIngredients = this.mixedIngredients || ingredient.percentage < 100;
    });
    data['feps'].forEach((entry) => this.feps.push(new RemoteFEPEntry(entry)));
  }

  assignId() {
    this.id = this.resourceName.replace('gfx/invobjs/', '').replace('/', '-');
    return this.id;
  }
}
