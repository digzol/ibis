$(function () {
    const page = GetURLParameter('p');
    const pageUrl = './content/' + page + '.html';
    $("#plink-" + page).addClass("active");
    $("#app-content").load(pageUrl, async function (response, status) {
        if (status === "error") {
            $("#app-content").load('./content/index.html');
        }
    });
});

/**
 * @return {string}
 */
function GetURLParameter(sParam) {
    const sPageURL = window.location.search.substring(1);
    const sURLVariables = sPageURL.split('&');
    for (let i = 0; i < sURLVariables.length; i++) {
        const sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1];
        }
    }
}
