$(function() {
  $(".btn").on("click", function() {
    $(this).toggleClass("disabled");
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

/**
 *
 * @param number
 * @returns {string}
 */
function NumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
