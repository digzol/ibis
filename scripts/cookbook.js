import { GetURLParameter } from './main.js';

let items;
let cookbook;
let recipes;

$(async function () {
    const itemsReq = $.getJSON("./data/items.json");
    const cookbookReq = $.getJSON("./data/cookbook.json");

    Promise.all([itemsReq, cookbookReq]).then(function (JSONs) {
        const template = $("#search-panel .template-search-entry").html();
        const ingredients = [];
        let typingTimeout;

        items = JSONs[0].entries;
        cookbook = JSONs[1].entries;
        recipes = JSONs[1].recipes;

        recipes.forEach(function (entry) {
            const recipeItem = getItem(entry[0]);

            $("#search-by-name .search-results").append(template
                .replace(new RegExp("{{id}}", 'g'), recipeItem.id)
                .replace(new RegExp("{{name}}", 'g'), recipeItem.name)
            );
        });

        cookbook.forEach(function (entry) {
            const entryIngredients = entry[1];
            let recipe = getRecipe(entry[0]);

            if (recipe === undefined) {
                const resultItem = getItem(entry[0]);
                recipe = getRecipe(resultItem.recipe);
            }

            if ("spices" in recipe[1]) {
                const fepCount = entry[2].length;

                if (fepCount !== 0) {
                    // Chives
                    const var_chives = [entry[0], entry[1].slice(), entry[2].slice()];

                    // Black Pepper
                    const var_pepper = [entry[0], entry[1].slice(), entry[2].slice()];

                    // Dill
                    const var_dill = [entry[0], entry[1].slice(), entry[2].slice()];

                    // Kvann (Switch first & last FEPs)
                    const var_kvann = [entry[0], entry[1].slice(), entry[2].slice()];
                    var_kvann[1].push("kvann");
                    var_kvann[2][0] = entry[2][0].slice();
                    var_kvann[2][0][2] = entry[2][fepCount - 1][2];
                    var_kvann[2][fepCount - 1] = entry[2][fepCount - 1].slice();
                    var_kvann[2][fepCount - 1][2] = entry[2][0][2];
                    var_kvann[3] = true;

                    // Laurel Leaves (Multiply last FEP by 1.625)
                    const var_laurel = [entry[0], entry[1].slice(), entry[2].slice()];
                    var_laurel[1].push("leaf-laurel");
                    var_laurel[2][fepCount - 1] = entry[2][fepCount - 1].slice();
                    var_laurel[2][fepCount - 1][2] = Math.round(entry[2][fepCount - 1][2] * 1.625 * 100) / 100;
                    var_laurel[3] = true;

                    cookbook.push(var_kvann);
                    cookbook.push(var_laurel);
                }
            }

            entryIngredients.forEach(function (ingredient) {
                if (ingredients[ingredient] === undefined) {
                    const item = getItem(ingredient);
                    ingredients[ingredient] = ingredients.length;
                    ingredients.push({name: item.name, id: item.id});
                }
            });
        });

        ingredients.sort(sortByName);

        ingredients.forEach(function (ingredient) {
            $("#search-by-ingredient .search-results").append(template
                .replace(new RegExp("{{id}}", 'g'), ingredient.id)
                .replace(new RegExp("{{name}}", 'g'), ingredient.name)
            );
        });

        $(".search-dropdown > .form-control").on("change keyup", onSearchChange);
        $(".search-result-entry").on("click", onFoodSelect);
        $(".search-group > .form-control").on("change keyup", function () {
            clearTimeout(typingTimeout);
            typingTimeout = setTimeout(onFilterChange, 500);
        });

        $("#search-by-name .form-control").val(GetURLParameter('name'));
        $("#search-by-ingredient .form-control").val(GetURLParameter('ingredient'));
        onFilterChange();
    });
});

$(function () {
    const hoverTimeouts = [];

    $("#search-by-name > .form-control").focus();
    $(".search-container")
        .hover(function () {
            clearTimeout(hoverTimeouts[this]);
            const context = $(this).parent(".search-group");
            const filterValue = $("> .form-control", context).val().toLowerCase();
            $(".search-dropdown", this).show();
            if ( $('input:focus').length === 0)
                $(".search-dropdown > .form-control", this).focus();
            $(".search-result-entry", this).each(function () {
                const dataName = $(this).attr("data-name").toLowerCase();
                $(this).toggleClass("selected", filterValue.includes(dataName));
            });
        })
        .mouseleave(function () {
            hoverTimeouts[this] = setTimeout(() => {
                $(".search-dropdown > .form-control").val("").trigger("change");
            }, 200);
        });
    $("#search-toggles .btn").click(function() {
        const value = $(this).attr("data-value");
        localStorage.setItem("toggle-" + value, $(this).hasClass("disabled"));
        $(this).toggleClass("disabled");
        onFilterChange();
    });

    window.onpopstate = function(e) {
        if (e.state === null) {
            $("#search-by-name .form-control").val('');
            $("#search-by-ingredient .form-control").val('');
        } else {
            $("#search-by-name .form-control").val(e.state.names);
            $("#search-by-ingredient .form-control").val(e.state.ingredients);
        }
        onFilterChange();
    };
});

$(function() {
    $("#search-toggles .btn").each(function() {
        const value = $(this).attr("data-value");
        const disabled = localStorage.getItem("toggle-" + value);
        $(this).toggleClass("disabled", disabled === 'false');
    });
});

function getItem(id) {
    const result = items.find(item => item.id === id);
    if (result === undefined) console.error("Unknown item ID:", id);
    return result;
}

function getRecipe(id) {
    const result = recipes.find(recipe => recipe[0] === id);
    return result;
}

function sortByFEP(a, b) {
    if (a[2] > b[2]) return -1;
    if (a[2] < b[2]) return 1;
    return 0;
}

function sortByName(a, b) {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
}

function onSearchChange() {
    const context = $(this).parent(".search-dropdown");
    const searchKeyword = $(this).val().toLowerCase();
    if (searchKeyword.length === 0) {
        $(".search-result-entry", context).show();
    } else {
        $(".search-result-entry", context).each(function () {
            const name = $(".game-icon", this).attr("title").toLowerCase();
            $(this).toggle(name.includes(searchKeyword));
        });
    }
}

function onFoodSelect() {
    const context = $(this).closest(".search-group");
    const $filterInput = $("> .form-control", context);
    const dataName = $(this).attr("data-name");

    if ($(this).hasClass("selected")) {
        const regexp = new RegExp(dataName + ";?\\s?", 'ig');
        $filterInput.val($filterInput.val().replace(regexp, ''));
    } else {
        if (!$filterInput.val().includes(dataName)) {
            if ($filterInput.val() !== "" && !/;\s?$/.test($filterInput.val().toString()))
                $filterInput.val($filterInput.val() + "; ");
            $filterInput.val($filterInput.val() + dataName + "; ");
        }
    }

    $(this).toggleClass("selected");
    $filterInput.trigger("change");
}

function onFilterChange() {
    const inputNames = $("#search-by-name .form-control").val();
    const inputIngredients = $("#search-by-ingredient .form-control").val();
    let newURL = location.pathname + "?p=cookbook";
    newURL += (inputNames !== "") ? "&name=" + inputNames : '';
    newURL += (inputIngredients !== "") ? "&ingredients=" + inputIngredients : '';

    if (location.origin + newURL !== location.href) {
        console.log(location.origin + newURL, location.href);
        history.pushState({names: inputNames, ingredients: inputIngredients}, '', newURL);
    }

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
        $("#food-info").hide();
        return;
    } else {
        $("#food-info").show();
    }

    const recipes = cookbook.filter(function (recipe) {
        if (recipe[3] === true && !(localStorage.getItem("toggle-spices") === "true")) return;

        const ingredients = recipe[1];
        let filteredName = nameFilters.length === 0;
        let filteredIngredient = ingredientFilters.length === 0;

        recipe.name = getItem(recipe[0]).name;
        recipe.ingredients = [];

        nameFilters.forEach(function (filter) {
            filteredName = filteredName || recipe.name.toLowerCase().includes(filter.toLowerCase());
        });

        ingredients.forEach(function (ingredient) {
            const ingredientName = getItem(ingredient).name;
            recipe.ingredients.push(ingredientName);
            ingredientFilters.forEach(function(filter) {
                filteredIngredient = filteredIngredient || ingredientName.toLowerCase().includes(filter.toLowerCase());
            });
        });

        return filteredName & filteredIngredient;
    });

    if (recipes.length === 0) {
        $("#result-recipes").html("No results found.");
        return
    } else {
        $("#result-recipes").html("");

    }

    recipes.sort(sortByName);
    recipes.forEach(function (recipe) {
        const foodName = recipe.name;
        const foodId = recipe[0];
        const ingredients = recipe[1];
        let feps = recipe[2].sort(sortByFEP);
        let totalFeps = 0;

        if (feps.length === 0)
            feps = [["???", "?", "???"]];

        const $varEntry = $($("#template-mod-entry").html()
            .replace(new RegExp("{{id}}", 'g'), foodId)
            .replace(new RegExp("{{name}}", 'g'), foodName)
        );

        ingredients.forEach(function (ingredient) {
            const item = getItem(ingredient);

            $(".ingredients", $varEntry).append(
                $("#template-ingredient").html()
                    .replace(new RegExp("{{id}}", 'g'), item.id)
                    .replace(new RegExp("{{name}}", 'g'), item.name)
            );
        });

        feps.forEach(function (fep) {
            const type = fep[0];
            const mult = fep[1];
            const val = fep[2];

            if (!isNaN(val))
                totalFeps += val;

            $(".feps", $varEntry).append(
                $("#template-fep").html()
                    .replace(new RegExp("{{type}}", 'g'), type)
                    .replace(new RegExp("{{mult}}", 'g'), mult)
                    .replace(new RegExp("{{value}}", 'g'), val)
            );
        });

        const finalFeps = Math.round(totalFeps * 1000) / 1000 || "???";
        $(".total-feps", $varEntry).html(finalFeps);

        $varEntry.appendTo("#result-recipes");
    });
}