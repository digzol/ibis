import * as Utils from './utils.js';

const sItemDataPath = "./data/items.json";
const sCookbookDataPath = "./data/cookbook.json";

let items = {
    entries: []
};

let cookbook = {
    entries: [],
    recipeTable: [],
    ingredientIndex: []
};

// Fills user data
$(function() {
    const nameParam = Utils.GetURLParameter('name');
    const ingredientParam = Utils.GetURLParameter('ingredient');

    // URL search params
    if (nameParam !== undefined)
        $("#search-by-name .search-input").val(decodeURI(nameParam));
    if (ingredientParam !== undefined)
        $("#search-by-ingredient .search-input").val(decodeURI(ingredientParam));

    // Local storage user preferences
    $("#search-toggles .btn").each(function() {
        const value = $(this).attr("data-value");
        const disabled = localStorage.getItem("toggle-" + value);
        $(this).toggleClass("disabled", disabled === 'false');
    });
});

// Data setup
$(function () {
    const dItemData = $.getJSON(sItemDataPath);
    const dCookbookData = $.getJSON(sCookbookDataPath);

    $.when(dItemData, dCookbookData).then(function (vItems, vCookbook) {
        mapItems(items, vItems[0].entries);
        mapCookbook(cookbook, items.entries, vCookbook[0].entries);

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
                const name = items.entries[id].name;
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

function mapItems(items, entries) {
    const map = items.entries;

    entries.forEach(function(entry) {
        const id = entry.id;
        const len = map.push(entry);
        map[id] = map[len - 1];
    });
}

function mapCookbook(cookbook, items, entries) {
    const map = cookbook.entries;
    const table = cookbook.recipeTable;
    const index = cookbook.ingredientIndex;

    entries.forEach(function(recipe) {
        const sRecipeId = recipe.id;
        const oRecipeItem = items[sRecipeId];
        const aRecipeEntries = recipe.entries;
        const oRecipeOptional = recipe.optional || {};

        table.push(oRecipeItem);

        aRecipeEntries.forEach(function(entry) {
            const id = entry[0] || sRecipeId;
            if (items[id] === undefined)
                return console.error("Missing item ID:", id);
            const name = items[id].name;
            const ingredients = entry[1];
            const fep = entry[2];

            addRecipe(map, id, name, ingredients, fep, {});

            // Inserting spices
            if ("spices" in oRecipeOptional) {
                const iSpiceCount = oRecipeOptional.spices;
                addSpices(map, iSpiceCount, id, name, ingredients, fep);
            }

            // Indexing ingredients
            ingredients.forEach(function(id) {
                const entry = items[id];
                if (!(id in index)){
                    const len = index.push(entry);
                    index[id] = index[len - 1];
                }
            });

            ingredients.sort(sortByFEP);
        });
    });

    map.sort(sortByName);
    table.sort(sortByName);
    index.sort(sortByName);
}

function addRecipe(map, id, name, ingredients, fep, optional) {
    map.push({id: id, name: name, ingredients: ingredients, fep: fep, optional: optional});
}

function addSpices(map, count, id, name, ingredients, fep) {
    if (fep.length < 1) return;
    const len = fep.length;
    let _ingredients;
    let _fep;

    // Chives
    // ...

    // Black Pepper
    // ...

    // Dill
    // ...

    // Kvann (Switch first & last FEPs)
    _ingredients = ingredients.slice();
    _ingredients.push("kvann");
    _fep = fep.slice();
    _fep[0] = fep[0].slice();
    _fep[0][2] = fep[len - 1][2];
    _fep[len - 1] = fep[len - 1].slice();
    _fep[len - 1][2] = fep[0][2];
    addRecipe(map, id, name, _ingredients, _fep, {"spices": count});

    // Laurel Leaves (Multiply last FEP by 1.625)
    _ingredients = ingredients.slice();
    _ingredients.push("leaf-laurel");
    _fep[len - 1] = fep[len - 1].slice();
    _fep[len - 1][2] = Math.round(fep[len - 1][2] * 1.625 * 100) / 100;
    addRecipe(map, id, name, _ingredients, _fep, {"spices": count});
}

function populateSearches() {
    const tSearchEntry = $("#search-panel .template-search-entry").html();

    cookbook.recipeTable.forEach(function (recipe) {
        $("#search-by-name .search-results").append(tSearchEntry
            .replace(new RegExp("{{id}}", 'g'), recipe.id)
            .replace(new RegExp("{{name}}", 'g'), recipe.name)
        );
    });

    cookbook.ingredientIndex.forEach(function (ingredient) {
        $("#search-by-ingredient .search-results").append(tSearchEntry
            .replace(new RegExp("{{id}}", 'g'), ingredient.id)
            .replace(new RegExp("{{name}}", 'g'), ingredient.name)
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
            const name = items.entries[id].name;
            const matchesFilter = name.toLowerCase().includes(searchKeyword);
            $(this).toggle(matchesFilter);
        });
    }
}

function onSearchFilterClick() {
    const context = $(this).closest(".search-group");
    const $filterInput = $(".search-input", context);
    const id = $(this).attr("data-id");
    const name = items.entries[id].name;

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
    const inputNames = $("#search-by-name .form-control").val();
    const inputIngredients = $("#search-by-ingredient .form-control").val();

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

    const results = cookbook.entries.filter(function (recipe) {
        if ('spices' in recipe.optional && !(localStorage.getItem("toggle-spices") === "true")) return;

        const ingredients = recipe.ingredients;
        let filteredName = nameFilters.length === 0;
        let filteredIngredient = ingredientFilters.length === 0;

        nameFilters.forEach(function (filter) {
            filteredName = filteredName || recipe.name.toLowerCase().includes(filter.toLowerCase());
        });

        ingredients.forEach(function (ingredient) {
            const ingredientName = items.entries[ingredient].name;
            ingredientFilters.forEach(function(filter) {
                filteredIngredient = filteredIngredient || ingredientName.toLowerCase().includes(filter.toLowerCase());
            });
        });

        return filteredName & filteredIngredient;
    });

    if (results.length === 0) {
        return $("#result-recipes").html("No results found.");
    } else {
        $("#result-recipes").html("");
    }

    results.forEach(function (recipe) {
        const ingredients = recipe.ingredients;
        let fep = recipe.fep;
        let totalFEP = 0;

        if (fep.length === 0)
            fep = [["???", "?", "???"]];

        const $varEntry = $($("#template-mod-entry").html()
            .replace(new RegExp("{{id}}", 'g'), recipe.id)
            .replace(new RegExp("{{name}}", 'g'), recipe.name)
        );

        ingredients.forEach(function (ingredient) {
            const item = items.entries[ingredient]

            $(".ingredients", $varEntry).append(
                $("#template-ingredient").html()
                    .replace(new RegExp("{{id}}", 'g'), item.id)
                    .replace(new RegExp("{{name}}", 'g'), item.name)
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
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
}

function sortByFEP(a, b) {
    if (a[2] > b[2]) return -1;
    if (a[2] < b[2]) return 1;
    return 0;
}