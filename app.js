var usersSearch;
var results;
var listInfo = [];
var selectedListItem;
var pageNum;
var id;
var updateFrameHTML;

$("#searchResults").on('click', '.list-group-item', getRealPage);

//if id clicked equals matching id in list info
//populate main page with associated link using iframe
function getRealPage() {
  id = Number($(this).attr('id'));
  console.log('getRealPage pageNum: ', listInfo[id]["$pageIdNum"]);
  var listPageNum = listInfo[id]["$pageIdNum"];

  $.ajax({
    type: "GET",
     url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + usersSearch + "&prop=info&inprop=url&callback=?",
    contentType: "application/json; charset=utf-8",
    async: true,
    dataType: "json",
    success: function(data, textStatus, jqXHR) {

      var pageResults = data.query.pages;
      console.log('real page data: ', pageResults);
      for(var key in pageResults){

       if (Number(key) === listPageNum){

        var fullurl = pageResults[key]['fullurl'];
        updateFrameHTML = '<iframe class="animated bounceInLeft" width="100%" height="500px" frameborder="0" src="' + fullurl +'"></iframe>';

      $("#wikiViewer").html(updateFrameHTML);

       }
      }


//&prop=info&inprop=url
    }
  });
}
/*
function updateFrame() {
  id = Number($(this).attr('id'));
  console.log('updateFrame id: ', id);
  getRealPage();
  for (var key in listInfo) {

    if (listInfo[key].listIndex === id) {
      updateFrameHTML = '<iframe class="animated bounceInLeft" width="100%" height="500px" frameborder="0" src="https://en.wikipedia.org/wiki/The_Jimi_Hendrix_Experience"></iframe>';


      //updateFrameHTML = '<iframe class="animated bounceInLeft" width="100%" height="500px" frameborder="0" src="https://en.wikipedia.org/?curid="' + pageNum +'></iframe>';

      //$("#wikiViewer").html(updateFrameHTML);
    }

  }

  console.log('listInfo[key]', listInfo[key]);
}
*/

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

        $("#searchResults").html('  ');
        results = data.query.pages;
        console.log('first results: ', results);


        var $searchListingBegin;
        var heading;
        var $searchListingMid = '</h4><p class="list-group-item-text">';
        var extract;
        var $searchListingEnd = '</p></span>';
        var index = -1;
        for (var key in results) {
          index++;
          $searchListingBegin = '<span class="list-group-item"' + 'id=' + index + '><h4 class="list-group-item-heading">';

          pageNum = results[key].pageid;

          heading = results[key].title;
          extract = results[key].extract;

          var $listResult = $searchListingBegin + heading + $searchListingMid + extract + $searchListingEnd;

          $("#searchResults").append($listResult);

          listInfo.push({ "listIndex": index, "$pageIdNum": pageNum, "pageHeading": heading });


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