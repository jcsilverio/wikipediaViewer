var usersSearch;
var results;
var listInfo = [];
var pageNum;
var id;
var updateFrameHTML;



var searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keydown", function(e) {
  if (e.keyCode === 13) { //checks whether the pressed key is "Enter"
    init();
    e.preventDefault();
  }
});

$("#searchButton").click(function() {
  init();
});

$("#searchResults").on('click', '.list-group-item', getRealPage);


function getRealPage() {
$("html, body").animate({ scrollTop: 0, duration: 500, queue: false });

  id = Number($(this).attr('id'));
  var listPageNum = listInfo[id].$pageIdNum;

  $.ajax({
    type: "GET",
    url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + usersSearch + "&prop=info&inprop=url&callback=?",
    contentType: "application/json; charset=utf-8",
    async: true,
    dataType: "json",
    success: function(data, textStatus, jqXHR) {

      var pageResults = data.query.pages;
      for (var key in pageResults) {

        if (Number(key) === listPageNum) {

          var fullurl = pageResults[key].fullurl;
          updateFrameHTML = '<iframe class="animated bounceInLeft" width="100%" height="500px" frameborder="0" src="' + fullurl + '"></iframe>';

          $("#wikiViewer").html(updateFrameHTML);

        }
      }
    }

  });

}

function init() {

  listInfo = [];
  usersSearch = document.getElementById('searchInput').value;
  if (!$.trim(($("#searchInput")).value).length) { // string  exists AFTER a trim
    $.ajax({
      type: "GET",

      url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + usersSearch + "&callback=?",
      contentType: "application/json; charset=utf-8",
      async: true,
      dataType: "json",
      success: function(data, textStatus, jqXHR) {
        if (!data.query) { // if search input yields no matches
          if (usersSearch.length === 0) { //empty search box, do nothing
            return;
          }
          var noResultHTML = '<div class="animated fadeInUp clearfix text-center"><h3>Your seach yielded no results<h3> </div>';
          $("#searchResults").html(noResultHTML);

        } else {

          $("#searchResults").html('  ');
          results = data.query.pages;
          var thumbnail;
          var $searchListingBegin;
          var heading;
          var $searchListingMid = '<p class="list-group-item-text animated fadeInUpBig">';
          var extract;
          var $searchListingEnd = '</p></div>';

          var index = -1;
          var thumbnailHTML;
          for (var key in results) {
            index++;
            $searchListingBegin1 = '<div class="list-group-item toHighlight animated fadeInUp clearfix"' + 'id=' + index + '>';

            $searchListingBegin2 = '<h4 class="list-group-item-heading animated fadeInUp">';
            pageNum = results[key].pageid;

            heading = results[key].title + '</h4>';
            extract = results[key].extract;
            if (results[key].thumbnail) {
              thumbnail = results[key].thumbnail.source;
              thumbnailHTML = '<img class="img img-responsive pull-left gap-right img-rounded" src="' + thumbnail + '">';

            } else {
              thumbnail = "";
              thumbnailHTML = "";
            }

            var $listResult = $searchListingBegin1 + thumbnailHTML + $searchListingBegin2 + heading + $searchListingMid + extract + $searchListingEnd;

            $("#searchResults").append($listResult);

            listInfo.push({ "listIndex": index, "$pageIdNum": pageNum, "pageHeading": heading });

          }
        }
      },
      error: function(errorMessage) {
        alert('no data');
        // $("#searchResults").html($listResult);
      }
    });
  } else {
    return;
  }
}