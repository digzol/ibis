import {Properties} from "./data/AlchemyPropertiesStatic.js";
import {Items} from "./data/ItemsStatic.js";
import {AlchemyIngredients, IngredientTypes} from "./data/AlchemyIngredientsStatic.js";

let $testedText;
let $testingText;

$(function() {
  $testedText = document.getElementById("props-tested");
  $testingText = document.getElementById("props-testing");
});

function PropertyFinder(testedItem, propertyBlacklist, itemBlacklist, allowDecoctions, allowElixirs) {
  const testedIngredient = testedItem.alchemicalEntry;
  const itemBlacklistSet = new Set(itemBlacklist.map(n => n.alchemicalEntry));
  const allIngredients = new Set(AlchemyIngredients.RawIngredients).difference(itemBlacklistSet);
  const allProperties = new Set(Object.keys(Properties).map(prop => Properties[prop]));
  const wantedProperties = allProperties.difference(propertyBlacklist);

  const useTestedIngredientAsBase = (allowDecoctions && testedIngredient.type === IngredientTypes.Mushroom)
    || (allowElixirs && testedIngredient.type === IngredientTypes.Mineral);

  let bases = new Set();

  allIngredients.delete(testedIngredient);

  if (!useTestedIngredientAsBase) {
    if (allowDecoctions)
      bases = allIngredients.intersection( new Set(AlchemyIngredients.Filtered.Mushrooms));
    if (allowElixirs)
      bases.union(allIngredients.intersection(new Set(AlchemyIngredients.Filtered.Minerals)));
  }

  const nonBases = allIngredients.difference(bases);

  let iterations = 0;
  let shortestSteps = 50;
  const result = FindBestSteps(wantedProperties, [], 50);
  console.log(iterations)
  console.log(result);

  function FindBestSteps(wantedProperties, steps, maxDepth) {
    iterations++;
    // Exit clauses
    if (wantedProperties.size === 0)
      return steps;

    if (steps.length >= shortestSteps)
      return;

    // Find branching sets

    const possibleIngredientA = GetBestMatches(allIngredients, wantedProperties, true);

    if (possibleIngredientA.size === 0) {
      console.log(`Not enough testing ingredients. Untested properties: ${wantedProperties.map(n => n.item.name).join(", ")}`);
      return steps;
    }

    let bestSteps = [];

    console.log(`${possibleIngredientA.size} possible ingredient A`);
    //for (let ingredientA of possibleIngredientA) {
    for (let i = 0; i < maxDepth; i++) {
      const ingredientA = [...possibleIngredientA.keys()][Math.floor(Math.random() * possibleIngredientA.size)];

      const isIngredientABase = bases.has(ingredientA);
      const baseRequired = !useTestedIngredientAsBase && (isIngredientABase === false || isIngredientABase === undefined);

      const possibleIngredientB = GetBestMatches(baseRequired ? bases : nonBases, wantedProperties, !baseRequired);
      possibleIngredientB.delete(ingredientA);

      let results;

      if (possibleIngredientB.size === 0) {
        const propertiesTested = new Set(ingredientA.properties);
        const newWantedProperties = new Set(wantedProperties);
        //newWantedProperties.difference(propertiesTested);

        for (let n of propertiesTested) {
          newWantedProperties.delete(n);
        }

        const newSteps = Array.from(steps);
        newSteps.push(`${ingredientA.item.name} + any base`);

        results = FindBestSteps(newWantedProperties, newSteps, bestSteps.length > 0 ? bestSteps.length : (maxDepth + 1));

        if (results && results.length > 0 && (bestSteps.length === 0 || results.length < shortestSteps)) {
          bestSteps = results;
          shortestSteps = results.length;
          console.log(results);
        }
      } else {
        console.log(`${possibleIngredientB.size} possible ingredient B`);
        //for (let ingredientB of possibleIngredientB) {
        for (let j = 0; j < maxDepth; j++) {
          const ingredientB = [...possibleIngredientB.keys()][Math.floor(Math.random() * possibleIngredientB.size)];

          const propertiesTested = new Set(ingredientA.properties.concat(ingredientB.properties));
          const newWantedProperties = new Set(wantedProperties);
          //newWantedProperties.difference(propertiesTested);

          for (let n of propertiesTested) {
            newWantedProperties.delete(n);
          }

          const newSteps = Array.from(steps);
          newSteps.push(`${ingredientA.item.name} + ${ingredientB.item.name}`);

          results = FindBestSteps(newWantedProperties, newSteps, bestSteps.length > 0 ? bestSteps.length : (maxDepth + 1));

          if (results && results.length > 0 && (bestSteps.length === 0 || results.length < shortestSteps)) {
            bestSteps = results;
            shortestSteps = results.length;
            console.log(results);
          }
        }
      }
    }

    return bestSteps;
  }

  function GetBestMatches(ingredients, properties, allowProcesses = false) {
    const bestMatches = new Set();
    let bestMatchCount = 0;

    for (let ingredient of ingredients) {
      const matchingProperties = properties.intersection(new Set(ingredient.properties));

      if (matchingProperties.size > 0 && matchingProperties.size >= bestMatchCount) {
        if (matchingProperties.size > bestMatchCount) {
          bestMatches.clear();
          bestMatchCount = matchingProperties.size;
        }
        bestMatches.add(ingredient);
      }
    }

    if (bestMatchCount === 1 && allowProcesses) {
      // TODO: Special case measured distillates
    }

    return bestMatches;
  }
}

async function PropertyTester(testedItem, propertyBlacklist, itemBlacklist, allowDecoctions, allowElixirs) {
  const itemIDBlacklist = new Set(itemBlacklist.map(x => x.id));
  const wantedProperties = new Set(Object.keys(Properties).map(prop => Properties[prop])).difference(propertyBlacklist);

  const requiresBase = !(testedItem && CanBeBaseIngredient(testedItem.alchemicalEntry));

  if (testedItem)
    itemIDBlacklist.add(testedItem.id);

  const filteredPropertyCounts = {};
  for (let id in AlchemyIngredients.Filtered.ByProperty) {
    filteredPropertyCounts[id] = AlchemyIngredients.Filtered.ByProperty[id].filter(n => !itemIDBlacklist.has(n.item.id));
  }

  let tests = 0;
  let completed = 0;
  let shortestSteps = [];
  let lastRefresh = Date.now();
  const refreshRate = 4000;
  let paused = false;

  const timeStart = Date.now();
  const result = await FindBestSteps(wantedProperties, []);
  const timeEnd = Date.now();

  console.log(`Tested ${tests} combinations in ${(timeEnd - timeStart) / 1000} seconds.`)
  console.log(result);

  async function FindBestSteps(wantedProperties, steps) {
    while(paused) {
      await new Promise(r => setTimeout(r, 1));
    }

    if (lastRefresh + refreshRate < Date.now() ) {
      paused = true;
      await new Promise(r => setTimeout(r, 1));
      paused = false;
      lastRefresh = Date.now();
    }

    $testingText.innerHTML = NumberWithCommas(++tests);

    if (wantedProperties.size === 0)
      return steps; // Found a solution

    if (steps.length >= shortestSteps.length && shortestSteps.length > 0)
      return; // A shorter solution was already found

    const sortedPropertiesA = [...wantedProperties].sort((a, b) =>
      filteredPropertyCounts[a.id].length - filteredPropertyCounts[b.id].length
    );

    /*
    const lenA = filteredPropertyCounts[sortedPropertiesA[0].id].length;
    const possiblePropertyA = sortedPropertiesA.filter(x => filteredPropertyCounts[x.id].length === lenA);
    */

    const possiblePropertyA = [sortedPropertiesA[0]];

    for (let propertyA of possiblePropertyA) {
      const possibleIngredientA = filteredPropertyCounts[propertyA.id];

      if (possibleIngredientA.length === 0) {
        console.log(`Cannot find an ingredient with property ${propertyA.name}`);
        return;
      }

      for (let ingredientA of possibleIngredientA) {
        const wantedPropertiesAfterA = new Set(wantedProperties);
        for (let property of ingredientA.properties) {
          wantedPropertiesAfterA.delete(property);
        }

        if (wantedPropertiesAfterA.size === 0) {
          steps.push(`${ingredientA.item.name} + any`);
          return steps; // Found a solution based on incomplete recipe
        }

        const sortedPropertiesB = [...wantedPropertiesAfterA].sort((a, b) =>
          filteredPropertyCounts[a.id].length - filteredPropertyCounts[b.id].length
        );
        /*
        const lenB = filteredPropertyCounts[sortedPropertiesB[0].id].length;
        const possiblePropertyB = sortedPropertiesB.filter(x => filteredPropertyCounts[x.id].length === lenB);
         */
        const possiblePropertyB = [sortedPropertiesB[0]];

        for (let propertyB of possiblePropertyB) {
          const possibleIngredientB = filteredPropertyCounts[propertyB.id];

          if (possibleIngredientB.length === 0) {
            console.log(`Cannot find an ingredient with property ${propertyB.name}`);
            return;
          }

          for (let ingredientB of possibleIngredientB) {
            if (requiresBase && !CanBeBaseIngredient(ingredientA) && !CanBeBaseIngredient(ingredientB))
              continue; // Missing a base

            const wantedPropertiesAfterB = new Set(wantedPropertiesAfterA);
            for (let property of ingredientB.properties) {
              wantedPropertiesAfterB.delete(property);
            }

            const propertiesTested = ingredientA.properties.concat(ingredientB.properties).filter(x => wantedProperties.has(x)).map(x => x.name);

            const newSteps = Array.from(steps);
            newSteps.push(`${ingredientA.item.name} + ${ingredientB.item.name} (testing ${propertiesTested.join(", ")})`);
            const results = FindBestSteps(wantedPropertiesAfterB, newSteps);

            $testedText.innerHTML = NumberWithCommas(++completed);

            if (results && results.length > 0 && (results.length < shortestSteps.length || shortestSteps.length === 0)) {
              shortestSteps = results;

              console.log(results);
            }
          }
        }
      }
    }

    return shortestSteps;
  }

  function CanBeBaseIngredient(ingredient) {
    return (allowDecoctions && ingredient.type === IngredientTypes.Mushroom)
      || (allowElixirs && ingredient.type === IngredientTypes.Mineral)
  }
}


$(function() {

  let itemBlacklist = [
    Items.BatRock,
    Items.BlackTruffles,
    Items.BlackTrumpets,
    Items.Camomile,
    Items.CoadeStoneBrick,
    Items.Direvein,
    Items.DoveDroppings,
    Items.Edelweiss,
    Items.FairyMushroom,
    Items.FourLeafClover,
    Items.Glimmermoss,
    Items.IndigoCap,
    Items.LavaRock,
    Items.LeafOre,
    Items.MandrakeRoot,
    Items.MarshMallow,
    Items.Obsidian,
    Items.PeacockOre,
    Items.RockCrystal,
    Items.RubyBolete,
    Items.Schrifterz,
    Items.ShardofConch,
    Items.Sleighbell,
    Items.TrollMushrooms,
    Items.WhiteTruffles,
    Items.Wintergreen,
    Items.Seasponge,
    Items.ChimingBluebell,
    Items.Lupine,
    Items.WashedupBladderwrack,
    Items.ThornyThistle,
    Items.Dross,
    //Items.Chalcopyrite,
    //Items.BlackOre,
    //Items.Bloodstone,
    //Items.IronOchre,
    //Items.HeavyEarth,
    //Items.Silvershine,
    //Items.HornSilver,
    //Items.Galena,
    //Items.BloatedBolete,
    //Items.FieldBlewits,
    //Items.Candleberry,
    Items.Sage,
  ];

  let knownProperties = new Set([
    Properties.NettleBurn
  ]);

  PropertyTester(Items.Sleighbell, knownProperties, itemBlacklist, true, true);
});
