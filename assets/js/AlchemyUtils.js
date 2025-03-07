import {Item} from "./model/Item.js";
import {Items} from "./data/ItemsStatic.js";
import {IngredientTypes} from "./data/AlchemyIngredientsStatic.js";

// TODO Potential optimization: Return an array of matched, unmatched and counts?
export function SortProperties(properties) {
  const sorted = properties.reduce((acc, prop) => {
    if (prop) {
      if (prop.id in acc) {
        acc[prop.id].count++;
      }
      else {
        acc[prop.id] = { property: prop, count: 1 };
      }
    }
    return acc;
  }, {});
  return Object.values(sorted);
}

/**
 *
 * @param ingredient
 * @param steps
 * @returns {AlchemyProperty[]}
 * @constructor
 */
export function ApplySteps(ingredient, steps) {
  const properties = Array.from(ingredient.properties);

  for (let i = 0; i < steps.length; i++) {
    switch(steps[i].id) {
      case Items.LyeAblution.id:
        properties[0] = null;
        break;
      case Items.FieryCombustion.id:
        properties[1] = null;
        break;
      case Items.MeasuredDistillate.id:
        let applied = false;
        for (let i = 0; i < 4; i++)
          if (applied)
            properties[i] = null;
          else if (properties[i])
            applied = true;
          break;
    }
  }

  return properties.filter(x => x !== null);
}

/**
 *
 * @param ingredient
 * @param order
 * @returns {Item[]}
 * @constructor
 */
export function GetStepsForPropertyOrder(ingredient, order) {
  let processes = [Items.MeasuredDistillate];

  if (order === 2)
    processes.unshift(Items.FieryCombustion);

  if (order > 0 && ingredient.type !== IngredientTypes.MineralCalcination)
    processes.unshift(Items.LyeAblution);

  if (ingredient.type === IngredientTypes.MineralCalcination)
    processes.unshift(Items.MineralCalcination);

  else if (ingredient.type === IngredientTypes.HerbalGrind)
    processes.unshift(Items.HerbalGrind);

  return processes;
}

/**
 * Whether the ingredients share ingredients (e.g. in a grind/calcination)
 * @param ingredientA
 * @param ingredientB
 * @returns {boolean}
 * @constructor
 */
export function HasDifferentComponents(ingredientA, ingredientB) {
  for (let i = 0; i < ingredientA.components.length; i++) {
    for (let j = 0; j < ingredientB.components.length; j++) {
      if (ingredientA.components[i].id === ingredientB.components[j].id)
        return false;
    }
  }
  return true;
}

/**
 * Whether any of the passed properties are wounds.
 * @param properties
 * @returns {boolean}
 * @constructor
 */
export function HasWoundProperties(properties) {
  for (let property of properties) {
    if (property.id > 25)
      return true;
  }
  return false;
}
