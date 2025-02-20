import * as Utils from './utils.js';

import {Items, LoadItemData} from './model/ItemCollection.js';
import {LoadRecipeData, Recipes} from './model/RecipeCollection.js';

let searchResults = [];
const RESULT_BLOCK_SIZE = 40;

// Fills user data
$(function() {
    const nameParam = Utils.GetURLParameter('name');
    const ingredientParam = Utils.GetURLParameter('ingredients');
    const foodDataset = Utils.GetURLParameter('food-dataset')

    // URL search params
    if (nameParam !== undefined) {
        const val = decodeURIComponent(nameParam);
        $("#search-by-name .search-input").val(val);
    }
    if (ingredientParam !== undefined) {
        const val = decodeURIComponent(ingredientParam);
        $("#search-by-ingredient .search-input").val(val);
    }

    if (foodDataset !== undefined) {
        localStorage.setItem("food-dataset", foodDataset);
    }

    // Local storage user preferences
    $("#search-toggles .btn").each(function() {
        const value = $(this).attr("data-value");
        const disabled = localStorage.getItem("toggle-" + value);
        $(this).toggleClass("disabled", disabled === 'false');
    });
});

// Data setup
$(function () {
    LoadItemData().then(function (data) {
        const sourceDataURL = localStorage.getItem("food-dataset");
        return LoadRecipeData(sourceDataURL);
    }).then(function (recipes) {
        populateSearches();
        displaySearchResults();

        $(".search-filter-input").on("keyup", onSearchFilterChange);
        $(".search-result-entry").on("click", onSearchFilterClick);
    });
});

// Form event setup
$(function() {
    let typingTimeout;

    $("#search-by-name > .form-control").focus();

    $(".search-container")
      .on('mouseenter', function () {
          const context = $(this).parent(".search-group");
          const filterValue = $(".search-input", context).val();

          $(".search-dropdown", this).show();

          if ( $('input:focus').length === 0)
              $(".search-dropdown > .form-control", this).focus();

          $(".search-result-entry", this).each(function () {
              const id = $(this).attr("data-id");
              const name = Items[id].name || id;
              const matchesSearch = filterValue.toLowerCase().includes(name.toLowerCase());
              $(this).toggleClass("selected", matchesSearch);
          });
      });

    $("#search-toggles .btn").click(function() {
        const value = $(this).attr("data-value");
        localStorage.setItem("toggle-" + value, $(this).hasClass("disabled"));
        $(this).toggleClass("disabled");
        displaySearchResults();
    });

    $(".search-input").on("keyup", function () {
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(onFilterChange, 500);
    });

    window.onpopstate = function(e) {
        if (e.state === null) {
            $("#search-by-name .form-control").val('');
            $("#search-by-ingredient .form-control").val('');
        } else {
            $("#search-by-name .form-control").val(e.state.names);
            $("#search-by-ingredient .form-control").val(e.state.ingredients);
        }

        displaySearchResults();
    };

    $(window).scroll(function() {
        if ($(window).scrollTop() > 20) {
            $(".scroll-top").fadeIn(200);
        } else {
            $(".scroll-top").fadeOut(200);
        }
        if ($(window).scrollTop() > $(window).height() - window.outerHeight - 100) {
            displayMore();
        }
    });
});

function populateSearches() {
    const tSearchEntry = $("#search-panel .template-search-entry").html();

    Recipes.forEach(function (recipe) {
        $("#search-by-name .search-results").append(tSearchEntry
          .replace(new RegExp("{id}", 'g'), recipe.product.id)
          .replace(new RegExp("{name}", 'g'), recipe.product.name)
        );
    });

    /*
    Recipes.getIngredientIndex().forEach(function (ingredient) {
        $("#search-by-ingredient .search-results").append(tSearchEntry
            .replace(new RegExp("{id}", 'g'), ingredient.id)
            .replace(new RegExp("{name}", 'g'), ingredient.name)
        );
    });
    */
}

function onSearchFilterChange() {
    const context = $(this).parent(".search-dropdown");
    const searchKeyword = $(this).val().toLowerCase();
    if (searchKeyword.length === 0) {
        $(".search-result-entry", context).show();
    } else {
        $(".search-result-entry", context).each(function () {
            const id = $(this).attr("data-id");
            const name = Items[id].name;
            const matchesFilter = name.toLowerCase().includes(searchKeyword);
            $(this).toggle(matchesFilter);
        });
    }
}

function onSearchFilterClick() {
    const context = $(this).closest(".search-group");
    const $filterInput = $(".search-input", context);
    const id = $(this).attr("data-id");
    const name = Items[id].name;

    if ($(this).hasClass("selected")) {
        const regexp = new RegExp(name + ";?\\s?", 'ig');
        $filterInput.val($filterInput.val().replace(regexp, ''));
    } else {
        if (!$filterInput.val().includes(name.toLowerCase())) {
            if ($filterInput.val() !== "" && !/;\s?$/.test($filterInput.val().toString()))
                $filterInput.val($filterInput.val() + "; ");
            $filterInput.val($filterInput.val() + name + "; ");
        }
    }

    $(this).toggleClass("selected");

    onFilterChange();
}

function onFilterChange() {
    const inputNames = encodeURIComponent($("#search-by-name .form-control").val())
    const inputIngredients = encodeURIComponent($("#search-by-ingredient .form-control").val())

    let newURL = location.pathname + "?p=cookbook";
    newURL += (inputNames !== "") ? "&name=" + inputNames : '';
    newURL += (inputIngredients !== "") ? "&ingredients=" + inputIngredients : '';

    if (location.origin + newURL !== location.href) {
        history.pushState({names: inputNames, ingredients: inputIngredients}, '', newURL);
    }

    displaySearchResults();
}

function displaySearchResults() {
    const nameSearchString = $("#search-by-name .form-control").val();
    const ingredientsSearchString = $("#search-by-ingredient .form-control").val();

    const nameSearchTerms = nameSearchString
      .split(";")
      .map(function (filter) {
          return filter.trim().toLowerCase();
      }).filter(function (filter) {
          return filter !== "";
      });

    const ingredientSearchTerms = ingredientsSearchString
      .split(";")
      .map(function (filter) {
          return filter.trim();
      }).filter(function (filter) {
          return filter !== "";
      });

    if (nameSearchTerms.length === 0 && ingredientSearchTerms.length === 0) {
        return $("#food-info").hide();
    } else {
        $("#food-info").show();
    }

    searchResults = [];

    Recipes.forEach((recipe) => {
        //TODO: spice toggle        if ('spices' in recipe.getOpIngredients() && !(localStorage.getItem("toggle-spices") === "true")) return;

        let displayInResults = nameSearchTerms.length === 0;

        for (let searchTerm of nameSearchTerms) {
            displayInResults = recipe.product.name.toLowerCase().includes(searchTerm);
            if (displayInResults) { break; }
        }

        if (!displayInResults)
            return; // Filtered out by name

        if (ingredientSearchTerms.length === 0) {
            for (let combo of recipe.combos) {
                searchResults.push(combo);
            }
        } else {
            let matchesIngSearchTerm = false;

            for (let searchTerm of ingredientSearchTerms) {
                for (let ingredient of recipe.possibleIngredients) {
                    matchesIngSearchTerm = ingredient.name.toLowerCase().includes(searchTerm.toLowerCase());
                    if (matchesIngSearchTerm) { break; }
                }
                if (matchesIngSearchTerm) { break; }
            }

            if (!matchesIngSearchTerm)
                return // None of the combos uses the searched ingredient

            for (let combo of recipe.combos) {
                displayInResults = false;
                for (let searchTerm of ingredientSearchTerms) {
                    for (let ingredient of combo.ingredients) {
                        displayInResults = ingredient.name.toLowerCase().includes(searchTerm.toLowerCase());
                        if (displayInResults) { break; }
                    }
                    if (displayInResults) { break; }
                }

                if (displayInResults)
                    searchResults.push(combo);
            }
        }
    });

    $("#info-results-count").html(searchResults.length.toString());
    $("#result-recipes").html("");

    displayResults(0, RESULT_BLOCK_SIZE);
}

function displayMore() {
    const start = $("#result-recipes .card").length;

    displayResults(start, start + RESULT_BLOCK_SIZE);
}

function displayResults(start, end) {
    const searchResultBlock = searchResults.slice(start, end);
    searchResultBlock.forEach(function (combo) {
        const ingredients = combo.ingredients;
        let fep = combo.feps;
        let totalFEP = 0;

        if (fep.length === 0)
            fep = [["???", "?", "???"]];

        const $varEntry = $($("#template-mod-entry").html()
          .replace(new RegExp("{id}", 'g'), combo.recipe.product.id)
          .replace(new RegExp("{name}", 'g'), combo.recipe.product.name)
        );

        ingredients.forEach(function (ingredient) {
            $(".ingredients", $varEntry).append(
              $("#template-ingredient").html()
                .replace(new RegExp("{id}", 'g'), ingredient.id)
                .replace(new RegExp("{name}", 'g'), ingredient.name)
            );
        });

        fep.forEach(function (fep) {
            const type = fep[0];
            const mult = fep[1];
            const val = fep[2];

            if (!isNaN(val))
                totalFEP += val;

            $(".feps", $varEntry).append(
              $("#template-fep").html()
                .replace(new RegExp("{type}", 'g'), type)
                .replace(new RegExp("{type_lower}", 'g'), type.toLowerCase())
                .replace(new RegExp("{mult}", 'g'), mult)
                .replace(new RegExp("{value}", 'g'), val)
            );
        });

        const finalFEP = Math.round(totalFEP * 1000) / 1000 || "???";
        $(".total-feps", $varEntry).html(finalFEP);

        $varEntry.appendTo("#result-recipes");
    });
}
