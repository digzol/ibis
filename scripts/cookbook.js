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

        recipes.forEach(function (recipe) {
            const recipeItem = getItem(recipe[0]);

            $("#search-by-name .search-results").append(template
                .replace(new RegExp("{{id}}", 'g'), recipeItem.id)
                .replace(new RegExp("{{name}}", 'g'), recipeItem.name)
            );
        });

        cookbook.forEach(function (recipe) {
            const recipeIngredients = recipe[1];

            recipeIngredients.forEach(function (ingredient) {
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
            typingTimeout = setTimeout(onFilterChange, 200);
        });
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
});

function getItem(id) {
    const result = items.find(item => item.id === id);
    if (result === undefined) console.error("Unknown item ID:", id);
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
    const nameFilters = $("#search-by-name .form-control").val().split(";")
        .map(function (filter) {
            return filter.trim();
        }).filter(function (filter) {
            return filter !== "";
        });
    const ingredientFilters = $("#search-by-ingredient .form-control").val().split(";")
        .map(function (filter) {
            return filter.trim();
        }).filter(function (filter) {
            return filter !== "";
        });

    const recipes = cookbook.filter(function (recipe) {
        const ingredients = recipe[1];
        let filteredName = nameFilters.length === 0;
        let filteredIngredient = ingredientFilters.length === 0;
        recipe.name = getItem(recipe[0]).name;
        recipe.ingredients = [];

        nameFilters.forEach(function (filter) {
            filteredName = filteredName || recipe.name.toLowerCase().includes(filter.toLowerCase());
        });

        ingredients.forEach(function (ingredient) {
            const ingredientName = getItem(ingredient).name
            recipe.ingredients.push(ingredientName);
            ingredientFilters.forEach(function(filter) {
                filteredIngredient = filteredIngredient || ingredientName.toLowerCase().includes(filter.toLowerCase());
            });
        });

        return filteredName & filteredIngredient;
    });

    $("#result-recipes").html("");

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