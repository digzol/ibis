import {Forages} from './data/ForagesStatic.js';

$(function () {
    const template = $("#template-forage-entry").html();

    for (let forage of Forages) {
        $("#forage-entries").append(template
          .replace(new RegExp("{name}", 'g'), forage.item.name)
          .replace(new RegExp("{id}", 'g'), forage.item.id)
          .replace("{detection}", forage.detection)
          .replace("{detection-min}", NumberWithCommas(Math.round(forage.detection / 2)))
          .replace("{detection-max}", NumberWithCommas(forage.detection * 2))
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

    $("#forage-detection").html(NumberWithCommas(p_detection));

    $("#forage-entries .card").each(function() {
        const detectionReq = $(this).attr("detection");
        let percentDetected = Math.round(100 * (2 * p_detection - detectionReq) / (3 * detectionReq));

        percentDetected = Math.min(100, percentDetected);
        percentDetected = Math.max(0, percentDetected);

        $(".progress-bar", this).css("width", percentDetected + "%");
        $(".forage-percentage", this).html(percentDetected + "%");
    })
}
