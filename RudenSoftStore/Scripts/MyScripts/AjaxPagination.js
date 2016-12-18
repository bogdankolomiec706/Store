$(document).ready(function () {
    var urlProducts = '/Products/Index';
    $('#products').load(urlProducts);
});

$(document).on("click", ".pageLink",
    function (e) {
        e.preventDefault();
        var pageNumber = $(this).html();
        var url = "/Products/Index?page=" + pageNumber;
        $("#products").fadeOut(200, function () { $("#products").empty().load(url).fadeIn() });
});