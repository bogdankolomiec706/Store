$(document).on("click", ".pageLink",
    function (e) {
        e.preventDefault();
        var pageNumber = $(".pageLink").html();
        var url = "/Products/Index?page=" + pageNumber;
        $(".productList").html("").load(url);
    });