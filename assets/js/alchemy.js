import {AlchemyIngredients, IngredientTypes} from "./data/AlchemyIngredientsStatic.js";
import {Items} from "./data/ItemsStatic.js";

LogMissingParams();

let $tempRecipe;
let $tempIcon;
let $tempPropertyIcon;
let $tempIntSteps;
let $tempIngredientGroup

$(function() {
  $tempRecipe = $("#template-recipe");
  $tempIcon = $("#template-item-icon");
  $tempPropertyIcon = $("#template-property-icon");
  $tempIntSteps = $("#template-intermediary-steps");
  $tempIngredientGroup = $("#template-ingredient-group")
});

$(function() {
  const timeStart = Date.now();

  const bases = AlchemyIngredients.Filtered.Mushrooms.concat(AlchemyIngredients.Filtered.Minerals);
  const results = [];

  for (let base of bases) {
    const distillate = SimpleDistillateSolution(base);
    if (distillate)
      results.push(distillate);

    const complementary = ComplementarySolution(base);
    if (complementary)
      results.push(complementary);
  }

  DisplayResults(results);

/*
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
*/
  const timeEnd = Date.now();
  console.log(`Finished loading in ${(timeEnd - timeStart) / 1000} seconds.`);
});

function SimpleDistillateSolution(baseIngredient) {
  const ingredients = new Array(4);

  for (let i = 0; i < 4; i++) {
    const property = baseIngredient.properties[i];
    ingredients[i] = [];

    if (!property) {
      //console.log(`Couldn't make a simple distillate solution for ${baseIngredient.DisplayName}; Unknown properties.`);
      return null;
    }

    const applicableIngredients = AlchemyIngredients.Filtered[property.id];
    // TODO Optimization: filter?

    for (let j = 0; j < 3; j++) {
      if (applicableIngredients.Ordered[j].length > 0) {
        for (let ingredient of applicableIngredients.Ordered[j]) {
          if (ingredient.HasDifferentComponents(baseIngredient) && !ingredient.baseOnly) {
            ingredients[i].push({ ingredient: ingredient, intermediaryProducts: ingredient.GetStepsForPropertyOrder(j) });
          }
        }
      }
    }

    if (ingredients[i].length === 0) {
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

function ComplementarySolution(baseIngredient) {
  if (baseIngredient.properties.includes(undefined))
    return null;

  for (let ingredientA of AlchemyIngredients.Unfiltered) {
    if (ingredientA.baseOnly || !ingredientA.HasDifferentComponents(baseIngredient) || ingredientA.properties.includes(undefined))
      continue;

    const stepsToTry = [ [], [Items.LyeAblution], [Items.FieryCombustion], [Items.LyeAblution, Items.FieryCombustion] ];

    // try with lye ablution and/or calcination or neither
    for (let i = 0; i < 4; i++) {
      if (!ingredientA.orderedProperties[0] && stepsToTry[i].includes(Items.LyeAblution)
        || !ingredientA.orderedProperties[1] && stepsToTry[i].includes(Items.FieryCombustion))
        continue; // Unknown order

      const ingredients = [[{ ingredient: ingredientA, intermediaryProducts: stepsToTry[i] }]];
      const properties = [];

      const combinedProperties = SortProperties(baseIngredient.properties.concat(ingredientA.ApplySteps(stepsToTry[i])));
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
                  if (ingredient.HasDifferentComponents(baseIngredient) && ingredient.HasDifferentComponents(ingredientA) && !ingredient.baseOnly) {
                    complementaryDistillateIngredients.push({ ingredient: ingredient, intermediaryProducts: ingredient.GetStepsForPropertyOrder(j) });
                  }
                }
              }
            }

            if (complementaryDistillateIngredients.length === 0) {
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

function DisplayResults(results) {
  for (let result of results) {
    const baseIngredient = result.baseIngredient;
    const $card = $tempRecipe.contents().clone();

    // Card title
    $(".recipe-name", $card).html(baseIngredient.GetElixirName());
    $(".card-title .game-icon", $card)
      .addClass("icon-" + baseIngredient.components[0].id)
      .attr("title", baseIngredient.DisplayName);

    // Wound conversion sticker
    if (HasWoundProperties(result.properties)) {
      switch(result.woundConversion) {
        case undefined:
          $(".stickers", $card).append(`<i class="fas fa-question-circle">`)
            .attr("title", "Might convert wounds to another type");
          break;
        case null:
          $(".stickers", $card).append(`<i class="fas fa-check-square">`)
            .attr("title", "No wound conversion");
          break;
        default:
          $(".stickers", $card).append(`<i class="fas fa-exclamation-triangle">`)
            .attr("title", `Converts wounds to ${result.woundConversion.name}`);
      }
    } else {
      $(".stickers", $card).append(`<i class="fas fa-check-square">`)
        .attr("title", "No wound conversion");
    }

    // Ingredient list
    for (let i = 0; i < result.ingredients.length; i++) {
      if (result.ingredients[i].length === 1) {
        $(".ingredients-list", $card).append(IngredientDisplay(result.ingredients[i][0]));
      } else {
        const $ingredientGroup = $tempIngredientGroup.contents().clone();
        $ingredientGroup.prepend(IngredientDisplay(result.ingredients[i][0]));

        for (let j = 1; j < result.ingredients[i].length; j++) {
          $(".select-group", $ingredientGroup).append(IngredientDisplay(result.ingredients[i][j]));
        }

        $(".ingredient-display", $ingredientGroup).on("click", function() { SelectIngredient($ingredientGroup, $(this)) });
        $(".ingredients-list", $card).append($ingredientGroup);
      }
    }

    // Property list
    const sortedProperties = SortProperties(result.properties);
    $(".property-list", $card).append(sortedProperties.map(PropertyDisplay));

    // Wound list
    if (result.wounds.length > 0) {
      const sortedWounds = SortProperties(result.wounds);
      $(".wounds-list", $card)
        .append(sortedWounds.map(PropertyDisplay))
        .parent().removeClass("d-none");
    }

    $("#alchemy-results").append($card);
  }
}

function IngredientDisplay(ingredientDisplay) {
  const ingredient = ingredientDisplay.ingredient;
  const intermediaryProducts = ingredientDisplay.intermediaryProducts || [];
  const $element = $tempIcon.contents().clone();

  const $icons = $(".game-icon", $element);

  for (let i = 0; i < ingredient.components.length; i++) {
    $icons[i].classList.add("icon-" + ingredient.components[i].id);
    $icons[i].setAttribute("title", ingredient.components[i].name);
    $icons[i].removeAttribute("hidden");
  }

  intermediaryProducts.forEach((products) => {
    $(".alchemical-intermediary-steps", $element).append(
      $tempIntSteps.contents().clone()
        .addClass("icon-" + products.id)
        .attr("title",  products.name)
    )
  });

  return $element;
}


// TODO Potential optimization: Return an array of matched, unmatched and counts?
function SortProperties(properties) {
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

function PropertyDisplay(prop) {
  const $element = $tempPropertyIcon.contents().clone();

  $(".property-name", $element).html(prop.property.name);

  if (prop.count > 1) {
    $(".property-name", $element).append(` (×${prop.count})`);
  }

  if (prop.property.gfx !== undefined) {
    $(".game-icon", $element)
      .addClass("icon-" + prop.property.gfx)
      .attr("title", prop.property.name);
  } else {
    $(".game-icon", $element)
      .addClass("blank-icon");
  }

  return $element;
}

function HasWoundProperties(properties) {
  for (let property of properties) {
    if (property.id > 25)
      return true;
  }
  return false;
}

function SelectIngredient($ingredientGroup, $selectedIngredient) {
  if (!$selectedIngredient.parent().hasClass("select-group"))
    return;

  const $oldSelectedIngredient = $(".ingredient-display", $ingredientGroup).first();
  $oldSelectedIngredient.insertBefore($selectedIngredient);
  $ingredientGroup.prepend($selectedIngredient);
}

function LogMissingParams() {
  const missingProps = [];
  const missingA = [];
  const missingB = [];
  const missingWoundConversion = [];

  AlchemyIngredients.Unfiltered.forEach(ingr => {
    if (ingr.type === IngredientTypes.MineralCalcination || ingr.type === IngredientTypes.HerbalGrind)
      return;

    if (ingr.properties.includes(undefined))
      missingProps.push(ingr);
    else if (!ingr.baseOnly) {
      if ((ingr.order & 0b1000) === 0)
        missingA.push(ingr);
      if ((ingr.order & 0b100) === 0)
        missingB.push(ingr);
    }

    if (ingr.woundConversion && "SimpleDistillateSolution" in ingr.woundConversion && ingr.woundConversion.SimpleDistillateSolution === undefined) {
      missingWoundConversion.push(ingr);
    }
  });

  if (missingProps.length > 0)
    console.log(`Ingredients with missing properties (${missingProps.length}):\n ${missingProps.map(ingr => ingr.components[0].name).join(", ")}`);
  if (missingA.length > 0)
    console.log(`Ingredients with missing order A (${missingA.length}):\n ${missingA.map(ingr => ingr.components[0].name).join(", ")}`);
  if (missingB.length > 0)
    console.log(`Ingredients with missing order B (${missingB.length}):\n ${missingB.map(ingr => ingr.components[0].name).join(", ")}`);
  if (missingB.length > 0)
    console.log(`Ingredients with unknown wound conversions on double distillate solutions (${missingWoundConversion.length}):\n ${missingWoundConversion.map(ingr => ingr.components[0].name).join(", ")}`);
}
