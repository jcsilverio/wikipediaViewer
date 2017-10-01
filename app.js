var usersSearch;
var results;
$("#searchButton").click(function() {
  usersSearch = document.getElementById('searchInput').value;
  console.log('usersSearch: ', usersSearch);
  if (!$.trim(($("#searchInput")).value).length) { // string  exists AFTER a trim

    $.ajax({
      type: "GET",
      url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + usersSearch + "&callback=?",
      contentType: "application/json; charset=utf-8",
      async: true,
      dataType: "json",
      success: function(data, textStatus, jqXHR) {
        //console.log('data: ', data);

        //var markup = data.parse.text["*"];
        //var blurb = $('<div class="card animated bounceInLeft" width="100%" height="500px" frameborder="0"></div>').html(markup);

        // remove links as they will not work
        // blurb.find('a').each(function() { $(this).replaceWith($(this).html()); });

        // remove any references
        // blurb.find('sup').remove();

        // remove cite error
        //blurb.find('.mw-ext-cite-error').remove();
        //  $('#wikiViewer').html($(blurb).find('p'));
        results = data.query.pages;
        var pageNum;
        var $pageId;
        var $searchListingBegin = ' class="list-group-item"><h4 class="list-group-item-heading">';
        var heading;
        var $searchListingMid = '</h4><p class="list-group-item-text">';
        var extract;
        var $searchListingEnd = '</p></a>';
        for (var key in results) {
          pageNum = results[key].pageid;
          $pageId = '<a href="https://en.wikipedia.org/?curid=' + pageNum + '"';
          heading = results[key].title;
          extract = results[key].extract;
          console.log('pagenum: ',pageNum);
          console.log('results key: ', $pageId);

          var $listResult = $pageId + $searchListingBegin + heading + $searchListingMid + extract + $searchListingEnd;

          $("#searchResults").append($listResult);
        }


        console.log('results: ', results);


      },
      error: function(errorMessage) {}
    });
  } else {
    return;
  }
});

/*
$scope.search = function() {
  $scope.results = [];
  help.addClass('hide');
  search.removeClass('fullHeight');
  var title = input.val();
  var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
  var cb = '&callback=JSON_CALLBACK';
  var page = 'https://en.wikipedia.org/?curid=';

  $http.jsonp(api + title + cb)
    .success(function(data) {
      var results = data.query.pages;
      angular.forEach(results, function(v, k) {
        $scope.results.push({ title: v.title, body: v.extract, page: page + v.pageid })
      })
    });
}
*/