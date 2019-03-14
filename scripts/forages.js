import {getItemsData} from '../model/ItemCollection.js';

$(function () {
    getItemsData().then(data => {
        const items = data.getEntries();
        const forages = items.filter(isForageable).sort(sortForageable);
        const template = $("#template-forage-entry").html();

        forages.forEach(function (forage) {
            $("#forage-entries").append(template
                .replace(new RegExp("{{name}}", 'g'), forage.name)
                .replace(new RegExp("{{id}}", 'g'), forage.id)
                .replace("{{detection}}", forage.detection)
                .replace("{{detection-min}}", Math.round(forage.detection / 2))
                .replace("{{detection-max}}", forage.detection * 2)
            );
        });

        onDetectionChange();
    });

    $("#forage-perception")
        .on("keyup change", onDetectionChange)
        .val(localStorage.getItem("perception") || 10);

    $("#forage-exploration")
        .on("keyup change", onDetectionChange)
        .val(localStorage.getItem("exploration") || 1);
});

function isForageable(item) {
    return 'detection' in item;
}

function sortForageable(a, b) {
    if (a.detection < b.detection) return -1;
    if (a.detection > b.detection) return 1;
    return 0;
}

function onDetectionChange() {
    const p_perception = $("#forage-perception").val();
    const p_exploration = $("#forage-exploration").val();
    const p_detection = p_perception * p_exploration;

    localStorage.setItem("perception", p_perception);
    localStorage.setItem("exploration", p_exploration);

    $("#forage-detection").html(p_detection);

    $("#forage-entries .card").each(function() {
        const detectionReq = $(this).attr("detection");
        let percentDetected = Math.round(100 * (2 * p_detection - detectionReq) / (3 * detectionReq));

        percentDetected = (percentDetected > 100) ? 100 : percentDetected;
        percentDetected = (percentDetected < 0) ? 0 : percentDetected;

        $(".progress-bar", this).css("width", percentDetected + "%");
        $(".forage-percentage", this).html(percentDetected + "%");
    })
}