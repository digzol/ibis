import {IngredientTypes} from "../data/AlchemyIngredientsStatic.js";
import {Items} from "../data/ItemsStatic.js";

export class AlchemyIngredient {
  constructor(components, type, properties, order, baseOnly = false, woundConversion) {
    this.components = components.constructor === Array ? components : [components];
    this.type = type;
    this.baseOnly = baseOnly;
    this.properties = properties;
    this.order = order;
    this.orderedProperties = [
      (order & 0b1000) === 0b1000 ? properties[0] : undefined,
      (order & 0b100) === 0b100 ? properties[1] : undefined,
      (order & 0b10) === 0b10 ? properties[2] : undefined,
      (order & 0b1) === 0b1 ? properties[3] : undefined,
    ];
    this.woundConversion = woundConversion;

    this.DisplayName = this._GetDisplayName();
    this.CraftingRecipe = this._GetCraftingRecipe();
  }

  _GetDisplayName() {
    switch(this.type) {
      case IngredientTypes.HerbalGrind:
        return `${this.components[0].name} & ${this.components[1].name} ${Items.HerbalGrind.name}`;
      case IngredientTypes.MineralCalcination:
        return `${this.components[0].name} & ${this.components[1].name} ${Items.MineralCalcination.name}`;
      default:
        return this.components[0].name;
    }
  }

  _GetCraftingRecipe() {
    switch(this.type) {
      case IngredientTypes.Mushroom:
        return Items.MushroomDecoction;
      case IngredientTypes.Mineral:
        return Items.MercurialElixir;
      case IngredientTypes.HerbalGrind:
        return Items.HerbalSwill;
    }
  }
}
