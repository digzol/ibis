import * as Utils from './utils.js';

import {getItemsData} from '../model/ItemCollection.js';
import {getCookbookData} from '../model/RecipeCollection.js';

let items;
let cookbook;

// Fills user data
$(function() {
    const nameParam = Utils.GetURLParameter('name');
    const ingredientParam = Utils.GetURLParameter('ingredients');

    // URL search params
    if (nameParam !== undefined) {
        const val = decodeURIComponent(nameParam);
        $("#search-by-name .search-input").val(val);
    }
    if (ingredientParam !== undefined) {
        const val = decodeURIComponent(ingredientParam);
        $("#search-by-ingredient .search-input").val(val);
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
    $.when(getItemsData(), getCookbookData()).then(function (itemsData, cookbookData) {
        items = itemsData.getEntries();
        cookbook = cookbookData;

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
        .mouseenter(function () {
            const context = $(this).parent(".search-group");
            const filterValue = $(".search-input", context).val();

            $(".search-dropdown", this).show();

            if ( $('input:focus').length === 0)
                $(".search-dropdown > .form-control", this).focus();

            $(".search-result-entry", this).each(function () {
                const id = $(this).attr("data-id");
                const name = items[id].getName();
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
});

function populateSearches() {
    const tSearchEntry = $("#search-panel .template-search-entry").html();

    cookbook.getRecipeTable().forEach(function (recipe) {
        $("#search-by-name .search-results").append(tSearchEntry
            .replace(new RegExp("{{id}}", 'g'), recipe.id)
            .replace(new RegExp("{{name}}", 'g'), recipe.getName())
            .replace(new RegExp("{{icon}}", 'g'), recipe.getIcon())
        );
    });

    cookbook.getIngredientIndex().forEach(function (ingredient) {
        $("#search-by-ingredient .search-results").append(tSearchEntry
            .replace(new RegExp("{{id}}", 'g'), ingredient.id)
            .replace(new RegExp("{{name}}", 'g'), ingredient.getName())
            .replace(new RegExp("{{icon}}", 'g'), ingredient.getIcon())
        );
    });
}

function onSearchFilterChange() {
    const context = $(this).parent(".search-dropdown");
    const searchKeyword = $(this).val().toLowerCase();
    if (searchKeyword.length === 0) {
        $(".search-result-entry", context).show();
    } else {
        $(".search-result-entry", context).each(function () {
            const id = $(this).attr("data-id");
            const name = items[id].getName();
            const matchesFilter = name.toLowerCase().includes(searchKeyword);
            $(this).toggle(matchesFilter);
        });
    }
}

function onSearchFilterClick() {
    const context = $(this).closest(".search-group");
    const $filterInput = $(".search-input", context);
    const id = $(this).attr("data-id");
    const name = items[id].getName();

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
    const inputNames = $("#search-by-name .form-control").val();
    const inputIngredients = $("#search-by-ingredient .form-control").val();

    const nameFilters = inputNames.split(";")
        .map(function (filter) {
            return filter.trim();
        }).filter(function (filter) {
            return filter !== "";
        });
    const ingredientFilters = inputIngredients.split(";")
        .map(function (filter) {
            return filter.trim();
        }).filter(function (filter) {
            return filter !== "";
        });

    if (nameFilters.length === 0 && ingredientFilters.length === 0) {
        return $("#food-info").hide();
    } else {
        $("#food-info").show();
    }

    const results = cookbook.getEntries().filter(function (recipe) {
        if ('spices' in recipe.getOpIngredients() && !(localStorage.getItem("toggle-spices") === "true")) return;

        const ingredients = recipe.ingredients;
        let filteredName = nameFilters.length === 0;
        let filteredIngredient = ingredientFilters.length === 0;

        nameFilters.forEach(function (filter) {
            filteredName = filteredName || recipe.getName().toLowerCase().includes(filter.toLowerCase());
        });

        ingredients.forEach(function (ingredient) {
            const ingredientName = items[ingredient].getName();
            ingredientFilters.forEach(function(filter) {
                filteredIngredient = filteredIngredient || ingredientName.toLowerCase().includes(filter.toLowerCase());
            });
        });

        return filteredName & filteredIngredient;
    });

    $("#info-results-count").html(results.length.toString());
    $("#result-recipes").html("");

    results.forEach(function (recipe) {
        const ingredients = recipe.ingredients;
        let fep = recipe.fep;
        let totalFEP = 0;

        if (fep.length === 0)
            fep = [["???", "?", "???"]];

        const $varEntry = $($("#template-mod-entry").html()
            .replace(new RegExp("{{id}}", 'g'), recipe.id)
            .replace(new RegExp("{{name}}", 'g'), recipe.getName())
            .replace(new RegExp("{{icon}}", 'g'), recipe.getIcon())
        );

        ingredients.forEach(function (ingredient) {
            const item = items[ingredient];

            $(".ingredients", $varEntry).append(
                $("#template-ingredient").html()
                    .replace(new RegExp("{{id}}", 'g'), item.id)
                    .replace(new RegExp("{{name}}", 'g'), item.getName())
                    .replace(new RegExp("{{icon}}", 'g'), item.getIcon())
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
                    .replace(new RegExp("{{type}}", 'g'), type)
                    .replace(new RegExp("{{mult}}", 'g'), mult)
                    .replace(new RegExp("{{value}}", 'g'), val)
            );
        });

        const finalFEP = Math.round(totalFEP * 1000) / 1000 || "???";
        $(".total-feps", $varEntry).html(finalFEP);

        $varEntry.appendTo("#result-recipes");
    });
}

function sortByName(a, b) {
    if (a.getName() > b.getName()) return 1;
    if (a.getName() < b.getName()) return -1;
    return 0;
}

function sortByFEP(a, b) {
    if (a[2] > b[2]) return -1;
    if (a[2] < b[2]) return 1;
    return 0;
}