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
  $("#wikiViewer").hide();
  id = Number($(this).attr('id'));
  console.log('getRealPage pageNum: ', listInfo[id].$pageIdNum);
  var listPageNum = listInfo[id].$pageIdNum;

  $.ajax({
    type: "GET",
    url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + usersSearch + "&prop=info&inprop=url&callback=?",
    contentType: "application/json; charset=utf-8",
    async: true,
    dataType: "json",
    success: function(data, textStatus, jqXHR) {

      var pageResults = data.query.pages;
      console.log('real page data: ', pageResults);
      for (var key in pageResults) {

        if (Number(key) === listPageNum) {

          var fullurl = pageResults[key].fullurl;
          updateFrameHTML = '<iframe class="animated bounceInLeft" width="100%" height="500px" frameborder="0" src="' + fullurl + '"></iframe>';

          $("html, body").animate({ scrollTop: 0, duration: 500, queue: false });
          $("#wikiViewer").html(updateFrameHTML);
          $("#wikiViewer").show();

        }
      }
    }
  });
}

function init() {
   $("#wikiViewer").html('');
   $("#wikiViewer").hide();

  listInfo = [];
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
        console.log('results: ', results);
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

          console.log('thumbnail: ', thumbnail);
          console.log('thumbnailHTML: ', thumbnailHTML);

          var $listResult = $searchListingBegin1 + thumbnailHTML + $searchListingBegin2 + heading + $searchListingMid + extract + $searchListingEnd;

          $("#searchResults").append($listResult);

          listInfo.push({ "listIndex": index, "$pageIdNum": pageNum, "pageHeading": heading });

        }

      },
      error: function(errorMessage) {}
    });
  } else {
    return;
  }
  var form = document.getElementById("searchInput");
  form.reset();
}