import {AlchemyIngredients, IngredientTypes} from "./data/AlchemyIngredientsStatic.js";
import {SortProperties, ApplySteps, HasWoundProperties} from "./AlchemyUtils.js";

const worker = new Worker("../assets/js/workers/AlchemyWorker.js", { type: "module" });

let $tempRecipe;
let $tempIcon;
let $tempPropertyIcon;
let $tempIntSteps;
let $tempSeeMore;

$(function() {
  $tempRecipe = $("#template-recipe");
  $tempIcon = $("#template-item-icon");
  $tempPropertyIcon = $("#template-property-icon");
  $tempIntSteps = $("#template-intermediary-steps");
  $tempSeeMore = $("#template-see-more");

  $(".btn-toggle").on("click", () => RefreshResults());

  LogMissingParams();
  RefreshResults(true);
});

function RefreshResults(logMessages = false) {
  const allowLye = !$("#toggle-lye").hasClass("disabled");
  const allowBrimstone = !$("#toggle-brimstone").hasClass("disabled");

  //worker.terminate();
  worker.postMessage({
    logMessages: logMessages,
    allowLye: allowLye,
    allowBrimstone: allowBrimstone,
  });
}

worker.onmessage = (e) => {
  DisplayResults(e.data);
}

worker.onerror = (e) => {
  console.log(e.message);
}

function DisplayResults(results) {
  const $results = $("#alchemy-results");
  $results.empty();

  for (let result of results) {
    const baseIngredient = result.baseIngredient;
    const $card = $tempRecipe.contents().clone();
    const craftRecipe = baseIngredient.CraftingRecipe;

    // Card title
    $(".base-ingredient", $card)
      .addClass("icon-" + baseIngredient.components[0].id)
      .attr("title", baseIngredient.DisplayName);
    $(".craft-recipe", $card)
      .addClass("icon-" + craftRecipe.id)
      .attr("title", craftRecipe.name);
    $(".recipe-name", $card).append(baseIngredient.DisplayName);

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
      const selectedIngredient = result.ingredients[i][0];
      const $ingredientDisplay = IngredientDisplay(selectedIngredient);

      $($ingredientDisplay).prepend(`<div class="properties d-flex p-1"></div>`);

      // Related properties
      const properties = ApplySteps(selectedIngredient.ingredient, selectedIngredient.intermediaryProducts);
      for (let prop of properties) {
        $(".properties", $ingredientDisplay).append(`<span class="game-icon small-icon icon-${prop.gfx || "unknown" } " title="${prop.name}"></span>`);
      }

      // Variants with same effects
      if (result.ingredients[i].length > 1) {
        const $more = $tempSeeMore.contents().clone();

        for (let j = 1; j < result.ingredients[i].length; j++) {
          $(".select-group", $more).append(IngredientDisplay(result.ingredients[i][j]));
        }

        $ingredientDisplay.append($more);
        $(".ingredient-display", $ingredientDisplay).on("click", function() { SelectIngredient($ingredientDisplay, $(this)) });
      }

      $(".ingredients-list", $card).append($ingredientDisplay);
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

    $results.append($card);
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
    $(".intermediary-steps", $element).append(
      $tempIntSteps.contents().clone()
        .addClass("icon-" + products.id)
        .attr("title",  products.name)
    )
  });

  return $element;
}

function PropertyDisplay(prop) {
  const $element = $tempPropertyIcon.contents().clone();

  $(".property-name", $element).html(prop.property.name);

  if (prop.count > 1) {
    $(".property-name", $element).append(` (×${prop.count})`);
  }

  $(".game-icon", $element)
    .addClass("icon-" + prop.property.gfx || "unknown")
    .attr("title", prop.property.name);

  return $element;
}

function SelectIngredient($ingredientGroup, $selectedIngredient) {
  if (!$selectedIngredient.parent().hasClass("select-group"))
    return;

  const $oldSelectedIngredient = $(".ingredient-info", $ingredientGroup).first();
  $(".properties", $ingredientGroup).first().after($selectedIngredient.contents());
  $selectedIngredient.prepend($oldSelectedIngredient);
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
