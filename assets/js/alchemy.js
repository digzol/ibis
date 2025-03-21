import {AlchemyIngredients, IngredientTypes} from "./data/AlchemyIngredientsStatic.js";
import {SortProperties, ApplySteps, HasWoundProperties} from "./AlchemyUtils.js";

const worker = new Worker("../assets/js/workers/AlchemyWorker.js", { type: "module" });

let cardTemplate
let iconTemplate;
let seeMoreTemplate;

$(function() {
  cardTemplate = document.getElementById("template-recipe-card");
  iconTemplate = document.getElementById("template-item-icon");
  seeMoreTemplate = document.getElementById("template-see-more");

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

const TEST_COUNT = 20;

worker.onmessage = (e) => {
  const startTime = Date.now();

  for (let i = 0; i < TEST_COUNT; i++) {
    test(e.data);
  }

  let realTime = Date.now() - startTime;
  let totalTime = 0;

  for (let id in tracker.timeBlocks) {
    totalTime += tracker.timeBlocks[id].time;
  }

  for (let id in tracker.timeBlocks) {
    const block = tracker.timeBlocks[id];
    const calls = block.calls / TEST_COUNT;
    const timeEachCall = Math.round(block.time / calls * 1000 / TEST_COUNT) / 1000;
    const pct = Math.round(block.time / totalTime * 10000) / 100;
    console.log(`${id}: ${calls} ${calls > 1 ? "times" : "time"} in ${block.time / TEST_COUNT} ms (${timeEachCall} each) (${pct}%)`);
  }
  console.log(`Untracked: ${realTime - totalTime} ms`);
  console.log(`Average time: ${totalTime / TEST_COUNT} ms.`);
  tracker.timeBlocks = {};
}

let counter = 1;
function test(data) {
  const startTime = Date.now();
  DisplayResults(data);
  console.log(`${counter++}: ${Date.now() - startTime} ms`);
}

worker.onerror = (e) => {
  console.log(e.message);
}

const tracker = {
  timeBlocks: {},
  timer: Date.now(),
}

function AddTimeBlock(tracker, description) {
  const time = Date.now();

  if (!(description in tracker.timeBlocks))
    tracker.timeBlocks[description] = { time: 0, calls: 0 };
  tracker.timeBlocks[description].calls++;
  tracker.timeBlocks[description].time += time - tracker.timer;

  if (!("Tracker" in tracker.timeBlocks))
    tracker.timeBlocks["Tracker"] = { time: 0, calls: 0 };
  tracker.timeBlocks.Tracker.calls++;
  tracker.timeBlocks.Tracker.time += Date.now() - time;

  tracker.timer = Date.now();
}

function DisplayResults(results) {
  tracker.timer = Date.now();

  const cards = document.createDocumentFragment();

  for (let result of results) {
    const baseIngredient = result.baseIngredient;
    const cardNode = cardTemplate.content.cloneNode(true);
    const craftRecipe = baseIngredient.CraftingRecipe;

    AddTimeBlock(tracker, "Clone ingredient template");

    // Card title
    const baseNode = cardNode.querySelector(".base-ingredient");
    baseNode.classList.add("icon-" + baseIngredient.components[0].id);
    baseNode.title = baseIngredient.DisplayName;

    const craftRecipeNode = cardNode.querySelector(".craft-recipe");
    craftRecipeNode.classList.add("icon-" + craftRecipe.id);
    craftRecipeNode.title = craftRecipe.name;

    cardNode.querySelector(".recipe-name").append(baseIngredient.DisplayName);

    AddTimeBlock(tracker, "Card title");

    // Wound conversion sticker
    let iconType = "fa-check-square";
    let conversionText = "No wound conversion";

    if (HasWoundProperties(result.properties) && result.woundConversion !== null) {
      let html = "";
      switch(result.woundConversion) {
        case undefined:
          iconType = "fa-question-circle";
          conversionText = "Might convert wounds to another type";
          break;
        default:
          iconType = "fa-exclamation-triangle";
          conversionText = `Converts wounds to ${result.woundConversion.name}`;
      }
    }
    cardNode.querySelector(".stickers").innerHTML = `<i class="fas ${iconType}" title="${conversionText}">`;

    AddTimeBlock(tracker, "Wound conversion");

    // Ingredient list
    for (let i = 0; i < result.ingredients.length; i++) {
      const selectedIngredient = result.ingredients[i][0];
      const ingredientNode = IngredientDisplay(selectedIngredient);

      // Relative properties
      const propertiesDiv = document.createElement("div");
      propertiesDiv.classList.add("properties", "d-flex", "p-1");
      propertiesDiv.innerHTML = ApplySteps(selectedIngredient.ingredient, selectedIngredient.intermediaryProducts).map(
        e => `<span class="small-icon icon-${e.gfx || "unknown" } " title="${e.name}"></span>`
      ).join('');
      ingredientNode.prepend(propertiesDiv);

      AddTimeBlock(tracker, "Ingredient properties");

      // Variants with same effects
      if (result.ingredients[i].length > 1) {
        const seeMoreNode = seeMoreTemplate.content.cloneNode(true).children[0];
        seeMoreNode.querySelector(".select-group").innerHTML = result.ingredients[i].slice(1).map(
          e => IngredientDisplay(e, ingredientNode).outerHTML
        ).join('');
        ingredientNode.append(seeMoreNode);

        AddTimeBlock(tracker, "Append variants");
      }

      cardNode.querySelector(".ingredients-list").append(ingredientNode);

      AddTimeBlock(tracker, "ingredient append");
    }

    // Property list
    const sortedProperties = SortProperties(result.properties);
    cardNode.querySelector(".property-list").append(...sortedProperties.map(PropertyDisplay));

    AddTimeBlock(tracker, "Properties");

    // Wound list
    if (result.wounds.length > 0) {
      const woundListNode = cardNode.querySelector(".wounds-list")
      const sortedWounds = SortProperties(result.wounds);
      woundListNode.append(...sortedWounds.map(PropertyDisplay));
      woundListNode.parentNode.classList.remove("d-none");
    }

    cards.append(cardNode);
    AddTimeBlock(tracker, "Append card to fragment");
  }

  document.getElementById("alchemy-results").replaceChildren(cards);
  AddTimeBlock(tracker, "Append fragment");
}

function IngredientDisplay(data, parentDisplay) {
  const items = data.ingredient.components;
  const steps = data.intermediaryProducts || [];
  const displayNode = iconTemplate.content.cloneNode(true).children[0];

  // Optimization: Negligible change from createElement (< 0.0025ms)

  displayNode.querySelector(".item-components").innerHTML = items.map(
    e => `<span class="game-icon-1x1 icon-${e.id}" title="${e.name}"></span>`
  ).join('');

  displayNode.querySelector(".intermediary-steps").innerHTML = steps.map(
    e => `<span class="small-icon icon-${e.id}" title="${e.name}"></span>`
  ).join('');

  displayNode.addEventListener("click", function() {
    SelectIngredient(displayNode, parentDisplay ? parentDisplay : displayNode.parentNode);
  });

  AddTimeBlock(tracker, "Ingredient display");

  return displayNode;
}

function PropertyDisplay(prop) {
  const container = document.createElement("div");
  const iconSpan = document.createElement("span");
  const textSpan = document.createElement("span");

  container.className = "d-flex";
  iconSpan.className = `small-icon icon-${(prop.property.gfx || "unknown")} mx-2`;
  iconSpan.title = prop.property.name;
  textSpan.innerText = prop.property.name + ((prop.count > 1) ? ` (×${prop.count})` : '');

  container.append(iconSpan, textSpan);

  return container;
}

function SelectIngredient(clickedElement, parentElement) {
  if (clickedElement.parentNode === parentElement)
  {
    console.log("same")
    return;
  }

  const oldSelected = parentElement.children;
  parentElement.append(clickedElement.children);
  //clickedElement.append(oldSelected);

  /*
  const $oldSelectedIngredient = $(".ingredient-info", $ingredientGroup).first();
  $(".properties", $ingredientGroup).first().after($selectedIngredient.contents());
  $selectedIngredient.prepend($oldSelectedIngredient);
   */
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
