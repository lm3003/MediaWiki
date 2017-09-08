$(document).ready(function () {
    $('#custom-search').on('click', function () {
        $(this).replaceWith('<i class="ion ion-ios-search" id="custom-search-icon1"></i>' +
            '<input class="form-control" type="search" id="search-input" placeholder="Search">' +
            '<hr> <div class="btn btn-primary" style="cursor:pointer;" id="search-button" type="button">Search</div>');
    });
    var inpText;

    $(document).on("click", "#search-button", function () {
        $(".info").empty();
        var searchInput = $("#search-input");
        inpText = searchInput.val();
        if (inpText === "") {
            alert("Search needs a value!");
        } else {
            var wikiUrl = "http://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=" + inpText;

            $.get(wikiUrl, function (json) {
                json.query.search.forEach(function (curr) {
                    var getUrlInfo = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&inprop=url&titles=" + curr.title;
                    $.get(getUrlInfo, function (jsonWithUrl) {
                        for (var prop in jsonWithUrl.query.pages) {
                            $(".info").append('<a href="' + jsonWithUrl.query.pages[prop.toString()].fullurl +
                                '" target="_blank" style="text-decoration: none"><div class="card" style="cursor:pointer;">' +
                                '<div class="card-header"><strong>' + curr.title + '</strong></div>' +
                                '<div class="card-block">' + curr.snippet + '</div></div><hr></a>');
                        }
                    });
                });
            });
        }
    });


});