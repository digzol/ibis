$(function() {
  $(".btn").on("click", function() {
    $(this).toggleClass("disabled");
  });
});

function NumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
