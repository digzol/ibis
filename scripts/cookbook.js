let items = [];
let cookbook = [];

$(async function () {
    $("#search-keyword").focus();

    const itemsReq = $.getJSON("./data/items.json");
    const cookbookReq = $.getJSON("./data/cookbook.json");

    Promise.all([itemsReq, cookbookReq]).then(function (JSONs) {
        const template = $("#template-result-entry").html();

        items = JSONs[0].entries;
        cookbook = JSONs[1].entries;

        cookbook.forEach(function (recipe) {
            const foodItem = getItem(recipe[0]);
            $("#search-results").append(template
                .replace(new RegExp("{{id}}", 'g'), foodItem.id)
                .replace(new RegExp("{{name}}", 'g'), foodItem.name)
            );
        });

        $("#search-keyword").on("keyup", onKeywordChange);
        $(".search-result-entry").on("click", onFoodSelect)
    });
});

function getItem(id) {
    const result = items.find(item => item.id === id);
    if (result === undefined) console.error("Unknown item ID:", id);
    return result;
}

function getRecipes(id) {
    const result = cookbook.find(recipe => recipe[0] === id);
    if (result === undefined) console.error("Unknown recipe ID:", id);
    return result
}

function sortByFEP(a, b) {
    if (a[2] > b[2]) return -1;
    if (a[2] < b[2]) return 1;
    return 0;
}

function onKeywordChange() {
    const searchKeyword = $("#search-keyword").val().toLowerCase();
    if (searchKeyword.length === 0) {
        $(".search-result-entry").show();
    } else {
        $(".search-result-entry").each(function () {
            const name = $(".game-icon", this).attr("title").toLowerCase();
            $(this).toggle(name.includes(searchKeyword));
        });
    }
}

function onFoodSelect() {
    const selectedFoodId = $(this).attr("data-id");
    const recipes = getRecipes(selectedFoodId)[1];

    $(".search-result-entry.selected").removeClass("selected");
    $("#variation-entries").html("");
    $(this).addClass("selected");

    recipes.forEach(function(recipe) {
        const resultItem = getItem(recipe[0]);
        const ingredients = recipe[1];
        const feps = recipe[2].sort(sortByFEP);

        const $varEntry = $($("#template-mod-entry").html()
            .replace(new RegExp("{{id}}", 'g'), resultItem.id)
            .replace(new RegExp("{{name}}", 'g'), resultItem.name)
        );

        ingredients.forEach(function(ingredient) {
            const item = getItem(ingredient);

            $(".ingredients", $varEntry).append(
                $("#template-ingredient").html()
                    .replace(new RegExp("{{id}}", 'g'), item.id)
                    .replace(new RegExp("{{name}}", 'g'), item.name)
            );
        });

        feps.forEach(function(fep) {
            const type = fep[0];
            const mult = fep[1];
            const val = fep[2];

            $(".feps", $varEntry).append(
                $("#template-fep").html()
                    .replace(new RegExp("{{type}}", 'g'), type)
                    .replace(new RegExp("{{mult}}", 'g'), mult)
                    .replace(new RegExp("{{value}}", 'g'), val)
            );
        });

        $varEntry.appendTo("#variation-entries");
    });
}