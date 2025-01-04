import {Forages} from './data/ForagesStatic.js';

$(function () {
    const template = $("#template-forage-entry").html();

    for (let forage of Forages) {
        $("#forage-entries").append(template
          .replace(new RegExp("{name}", 'g'), forage.item.name)
          .replace(new RegExp("{id}", 'g'), forage.item.id)
          .replace("{detection}", forage.detection)
          .replace("{detection-min}", numberFormat(Math.round(forage.detection / 2)))
          .replace("{detection-max}", numberFormat(forage.detection * 2))
        );
    }

    $("#forage-perception")
        .on("keyup change", onDetectionChange)
        .val(localStorage.getItem("perception") || 10);

    $("#forage-exploration")
        .on("keyup change", onDetectionChange)
        .val(localStorage.getItem("exploration") || 1);

    onDetectionChange();
});

function onDetectionChange() {
    const p_perception = $("#forage-perception").val();
    const p_exploration = $("#forage-exploration").val();
    const p_detection = p_perception * p_exploration;

    localStorage.setItem("perception", p_perception);
    localStorage.setItem("exploration", p_exploration);

    $("#forage-detection").html(numberFormat(p_detection));

    $("#forage-entries .card").each(function() {
        const detectionReq = $(this).attr("detection");
        let percentDetected = Math.round(100 * (2 * p_detection - detectionReq) / (3 * detectionReq));

        percentDetected = Math.min(100, percentDetected);
        percentDetected = Math.max(0, percentDetected);

        $(".progress-bar", this).css("width", percentDetected + "%");
        $(".forage-percentage", this).html(percentDetected + "%");
    })
}

function numberFormat(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
