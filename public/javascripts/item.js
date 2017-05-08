function fetchItems(filter, sort, target) {
    $.get("/inventory?bodyonly=true&cardName=" + filter.trim()).then(function (results) {
        $(target).html(results);
    })
}


$(function () {
    var search = $('#inSearch');

    search.on('input',function (e) {
        var filter = e.target.value;
        fetchItems(filter, null, $("#groupItemContainer"));
    });
});