import {AlchemyIngredients} from "../data/AlchemyIngredientsStatic.js";
import {Items} from "../data/ItemsStatic.js";
import {ApplySteps, GetStepsForPropertyOrder, HasDifferentComponents, SortProperties} from "../AlchemyUtils.js";

onmessage = (e) => {
  const logMessages = e.data.logMessages;
  const allowLye = e.data.allowLye;
  const allowBrimstone = e.data.allowBrimstone;

  const timeStart = Date.now();

  const bases = AlchemyIngredients.Filtered.Mushrooms.concat(AlchemyIngredients.Filtered.Minerals);
  const results = [];

  for (let base of bases) {
    const distillate = SimpleDistillateSolution(base, logMessages, allowLye, allowBrimstone);
    if (distillate)
      results.push(distillate);

    const complementary = ComplementarySolution(base, logMessages, allowLye, allowBrimstone);
    if (complementary)
      results.push(complementary);
  }

  const timeEnd = Date.now();
  if (logMessages)
    console.log(`Finished loading in ${(timeEnd - timeStart) / 1000} seconds.`);

  postMessage(results);
};


function CombineIngredientsTo(ingredientA) {
  const itemA = ingredientA.item;

  for(let i = 0; i < rawIngredients.length - 1; i++) {
    const itemB = rawIngredients[i].item;

    if (itemA === itemB) continue;

    for(let j = i + 1; j < rawIngredients.length; j++) {
      const itemC = rawIngredients[j].item;

      if (itemA === itemC) continue;

      const ingredients = [ingredientA, rawIngredients[i], rawIngredients[j]];
      const propCount = {};
      let woundCount = 0;
      let unknownWoundCount = 0;

      for (let ingredient of ingredients) {
        for (let prop of ingredient.properties) {
          if (prop === undefined) {
            unknownWoundCount++;
            continue;
          }

          if (propCount[prop.id] === undefined) {
            propCount[prop.id] = { property: prop, count: 1, ingredients: [ingredient] }
          } else {
            propCount[prop.id].count++;
            propCount[prop.id].ingredients.push(ingredient);
          }
        }
      }

      for (let id in propCount) {
        if (propCount[id].count === 1) {
          const ingredient = propCount[id].ingredients[0];
          if (ingredient !== ingredientA) {
            const ingredientIndex = ingredient.item === itemB ? 1 : 2;
            if (ingredient.properties[0]?.id.toString() === id && (ingredient.ordered & 0b1000) === 0b1000) {
              ingredients[ingredientIndex] = LyeAblution(ingredients[ingredientIndex]);
              propCount[id].count = 0;
              continue;
            } else if (ingredient.properties[1]?.id.toString() === id && (ingredient.ordered & 0b100) === 0b100) {
              ingredients[ingredientIndex] = FieryCombustion(ingredients[ingredientIndex]);
              propCount[id].count = 0;
              continue;
            }
          }

          woundCount++;
        }
      }

      if (woundCount + unknownWoundCount <= MAX_WOUNDS) {
        displayResult(ingredients, propCount, unknownWoundCount);
      }

      comboCount++;
    }
  }
}

function SimpleDistillateSolution(baseIngredient, logMessages, allowLye, allowBrimstone) {
  if (baseIngredient.properties.includes(undefined))
    return null;

  const ingredients = new Array(4);

  for (let i = 0; i < 4; i++) {
    const property = baseIngredient.properties[i];
    ingredients[i] = [];

    const applicableIngredients = AlchemyIngredients.Filtered[property.id];
    // TODO Optimization: filter?

    for (let j = 0; j < 3; j++) {
      if ((j > 0 && !allowLye) || (j > 1 && !allowBrimstone))
        continue;

      if (applicableIngredients.Ordered[j].length > 0) {
        for (let ingredient of applicableIngredients.Ordered[j]) {
          if (HasDifferentComponents(ingredient, baseIngredient) && !ingredient.baseOnly) {
            ingredients[i].push({
              ingredient: ingredient,
              intermediaryProducts: GetStepsForPropertyOrder(ingredient, j)
            });
          }
        }
      }
    }

    if (ingredients[i].length === 0) {
      if (logMessages)
        console.log(`Couldn't make a simple distillate solution for ${baseIngredient.DisplayName}; Missing ingredients matching ${property.name}.`);
      return null;
    }
  }

  return {
    baseIngredient: baseIngredient,
    ingredients: ingredients,
    properties: baseIngredient.properties,
    wounds: [],
    woundConversion: baseIngredient.woundConversion.SimpleDistillateSolution
  };
}

function ComplementarySolution(baseIngredient, logMessages, allowLye, allowBrimstone) {
  if (baseIngredient.properties.includes(undefined))
    return null;

  for (let ingredientA of AlchemyIngredients.Unfiltered) {
    if (ingredientA.baseOnly || !HasDifferentComponents(ingredientA, baseIngredient) || ingredientA.properties.includes(undefined))
      continue;

    const stepsToTry = [[]];

    if (allowLye)
      stepsToTry.push([Items.LyeAblution]);

    if (allowBrimstone)
      stepsToTry.push([Items.FieryCombustion]);

    if (allowLye && allowBrimstone)
      stepsToTry.push([Items.LyeAblution, Items.FieryCombustion]);

    // try with lye ablution and/or calcination or neither
    for (let i = 0; i < stepsToTry.length; i++) {
      if (!ingredientA.orderedProperties[0] && stepsToTry[i].includes(Items.LyeAblution)
        || !ingredientA.orderedProperties[1] && stepsToTry[i].includes(Items.FieryCombustion))
        continue; // Unknown order

      const ingredients = [[{ ingredient: ingredientA, intermediaryProducts: stepsToTry[i] }]];
      const properties = [];
      const combinedProperties = SortProperties(baseIngredient.properties.concat(ApplySteps(ingredientA, stepsToTry[i])));
      const matchCount = combinedProperties.filter(x => x.count > 1).length;
      let incomplete = false;

      if (combinedProperties.length - matchCount < 3) {
        for (let entry of combinedProperties) {
          properties.push(entry.property);

          if (entry.count === 1) {
            const complementaryDistillateIngredients = [];
            const applicableIngredients = AlchemyIngredients.Filtered[entry.property.id];

            for (let j = 0; j < 3; j++) {
              if (applicableIngredients.Ordered[j].length > 0) {
                for (let ingredient of applicableIngredients.Ordered[j]) {
                  if (HasDifferentComponents(ingredient, baseIngredient) && HasDifferentComponents(ingredient, ingredientA) && !ingredient.baseOnly) {
                    complementaryDistillateIngredients.push({
                      ingredient: ingredient,
                      intermediaryProducts: GetStepsForPropertyOrder(ingredient, j)
                    });
                  }
                }
              }
            }

            if (complementaryDistillateIngredients.length === 0) {
              if (logMessages)
                console.log(`Couldn't make a complementary distillate solution for ${baseIngredient.DisplayName} and ${ingredientA.DisplayName}; Missing ingredients matching ${entry.property.name}.`);
              incomplete = true;
              continue;
            }

            ingredients.push(complementaryDistillateIngredients);
          }
        }

        if (incomplete)
          continue;

        return {
          baseIngredient: baseIngredient,
          ingredients: ingredients,
          properties: properties,
          wounds: []
        };
      }
    }
  }
}
