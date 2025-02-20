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

    this.DisplayName = this.GetDisplayName();
  }

  GetDisplayName() {
    switch(this.type) {
      case IngredientTypes.HerbalGrind:
        return `${this.components[0].name} & ${this.components[1].name} ${Items.HerbalGrind.name}`;
      case IngredientTypes.MineralCalcination:
        return `${this.components[0].name} & ${this.components[1].name} ${Items.MineralCalcination.name}`;
      default:
        return this.components[0].name;
    }
  }

  GetElixirName() {
    return this.type === IngredientTypes.Mushroom ? "Mushroom Decoction" : "Mercurial Elixir";
  }

  HasDifferentComponents(otherIngredient) {
    for (let i = 0; i < this.components.length; i++) {
      for (let j = 0; j < otherIngredient.components.length; j++) {
        if (this.components[i] === otherIngredient.components[j])
          return false;
      }
    }
    return true;
  }

  GetStepsForPropertyOrder(order) {
    let processes = [Items.MeasuredDistillate];

    if (order === 2)
      processes.unshift(Items.FieryCombustion);

    if (order > 0 && this.type !== IngredientTypes.MineralCalcination)
      processes.unshift(Items.LyeAblution);

    if (this.type === IngredientTypes.MineralCalcination)
      processes.unshift(Items.MineralCalcination);

    else if (this.type === IngredientTypes.HerbalGrind)
      processes.unshift(Items.HerbalGrind);

    return processes;
  }

  ApplySteps(steps) {
    const properties = Array.from(this.properties);

    if (steps.includes(Items.LyeAblution))
      properties[0] = null;

    if (steps.includes(Items.FieryCombustion))
      properties[1] = null;

    if (steps.includes(Items.MeasuredDistillate))
      return [properties[0]];

    return properties;
  }
}
