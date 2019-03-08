/**
 * @return {string}
 */
export function GetURLParameter(sParam) {
    const sPageURL = window.location.search.substring(1);
    const sURLVariables = sPageURL.split('&');
    for (let i = 0; i < sURLVariables.length; i++) {
        const sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1];
        }
    }
}

export function GetJSONAsync(sPath) {
    return new Promise(function(resolve, reject) {
        return $.getJSON(sPath).done(resolve).fail(reject)
    });
}