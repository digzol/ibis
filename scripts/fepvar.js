let items = [];
let fepvar = [];

$(async function () {
    $("#search-keyword").focus();

    const itemsReq = $.getJSON("./data/items.json");
    const fepvarReq = $.getJSON("./data/fepvar.json");

    Promise.all([itemsReq, fepvarReq]).then(function (JSONs) {
        const template = $("#template-result-entry").html();

        items = JSONs[0].entries;
        fepvar = JSONs[1].entries.sort(sortByName);

        fepvar.forEach(function (foodEntry) {
            const foodItem = items.find(item => item.id === foodEntry[0]);

            if (foodItem === undefined) {
                console.error("Unknown ID:", foodEntry[0]);
                return;
            }

            $("#search-results").append(template
                .replace(new RegExp("{{id}}", 'g'), foodItem.id)
                .replace(new RegExp("{{name}}", 'g'), foodItem.name)
            );
        });

        $("#search-keyword").on("keyup", onKeywordChange);

        $(".search-result-entry")
            .on("click", onFoodSelect)
            // .on("click mouseover", onFoodSelect)
            // .on("mouseleave", onFoodDeselect);
    });
});

function getItem(id) {
    const result = items.find(item => item.id === id);
    if (result === undefined) {
        console.error("Unknown item ID:", id);
    }
    return result;
}

function getVariation(id) {
    const result = fepvar.find(variation => variation[0] === id);
    if (result === undefined) {
        console.error("Unknown variation ID:", id);
    }
    return result;
}

function sortByName(a, b) {
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
    return 0;
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
            const name = $(this).attr("data-id").toLowerCase();

            if (name.includes(searchKeyword)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
}

function onFoodSelect(event) {
    if (event.type === "click") {
        $(".search-result-entry.selected").removeClass("selected");
        $(this).addClass("selected");
    }

    const foodId = $(this).attr("data-id");
    const foodItem = getItem(foodId);
    const variations = getVariation(foodItem.id)[1];

    $("#variation-entries").html("");

    if (variations === undefined) {
        console.error("Unknown ID:", foodItem.id);
        return;
    }

    variations.forEach(function(variation) {
        const ingredients = variation[0];
        const feps = variation[1].sort(sortByFEP);

        const $varEntry = $($("#template-mod-entry").html()
            .replace(new RegExp("{{id}}", 'g'), foodItem.id)
            .replace(new RegExp("{{name}}", 'g'), foodItem.name)
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

function onFoodDeselect() {
    $(".search-result-entry.selected").trigger("click");
}