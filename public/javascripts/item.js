(function() {
    var lastClickedSort = "cardName";
    var lastFilter = "";
    function fetchItems(filter, sort, target) {
        var location = "/inventory?bodyonly=true&cardName=" + filter.trim() + "&sort=" + sort.trim();
        $.get(location).then(function (results) {
            $(target).html(results);
        })
    }

    function sortButtonClick(e) {
        lastClickedSort = $(e.target).attr('data-sort');
        fetchItems(lastFilter, lastClickedSort, $("#groupItemContainer"));
    }

    $(function () {
        var search = $('#inSearch');

        search.on('input', function (e) {
            var lastFilter = e.target.value;
            fetchItems(lastFilter, lastClickedSort, $("#groupItemContainer"));
        });

        $(".sort-btn").click(sortButtonClick)
    });

})();
