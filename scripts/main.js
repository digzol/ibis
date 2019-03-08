import * as Utils from './utils.js';

$(function () {
    const page = Utils.GetURLParameter('p');
    const pageUrl = './content/' + page + '.html';
    $("#plink-" + page).addClass("active");
    $("#app-content").load(pageUrl, async function (response, status) {
        if (status === "error") {
            $("#app-content").load('./README.md');
        }
    });
});