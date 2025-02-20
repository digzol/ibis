import {GetItemByName} from "../ItemCollection.js";

export class RemoteIngredientEntry {
  constructor(data) {
    this.percentage = data['percentage'];
    this.name = data['name'];

    this.id = this.assignId();
  }

  assignId() {
    const lookupItem = GetItemByName(this.name);

    if (lookupItem) {
      this.id = lookupItem.id;
    } else {
      this.id = this.name.toLowerCase().replace(/\s/g, '');
      console.log(`'${this.name}' isn't a known item, assigned '${this.id}' as ID.`);
    }

    return this.id;
  }
}


