var usersSearch;
$("#searchButton").click(function() {
  usersSearch = document.getElementById('searchInput').value;
   console.log('usersSearch: ',usersSearch);
   if(!$.trim(($("#searchInput")).value).length) { // string  exists AFTER a trim

  $.ajax({
    type: "GET",
    url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=" + usersSearch +"&callback=?",
    contentType: "application/json; charset=utf-8",
    async: false,
    dataType: "json",
    success: function(data, textStatus, jqXHR) {
      console.log(data);

      var markup = data.parse.text["*"];
      var blurb = $('<div class="card animated bounceInLeft" width="100%" height="500px" frameborder="0"></div>').html(markup);

      // remove links as they will not work
      blurb.find('a').each(function() { $(this).replaceWith($(this).html()); });

      // remove any references
      blurb.find('sup').remove();

      // remove cite error
      blurb.find('.mw-ext-cite-error').remove();
      $('#wikiViewer').html($(blurb).find('p'));

    },
    error: function(errorMessage) {}
  });
     } else {
    return;
   }
});




/*


<body
  <div class="container-fluid text-center">
    <div class="row">
      <div class="col-sm-4"></div>
      <div class="col-sm-4">
        <div class="card" style="width:375px; height:375px">
          <img class="card-img-top" style="opacity:0.4; width:auto; height:200px" id="quoteImage" alt="nature image">
          <div class="card-block">
            <h4 class="card-title quote-text" id="text"></h4>
            <h6 class="card-subtitle mb-2 text-muted quote-author" id="author"></h6>
            <a href="#" class="btn btn-secondary" id="tweetBtn" style="opacity:0;"><i class="fa fa-twitter"></i></a>
    <div class="list-group" id="searchResults">
      <a href="#" class="list-group-item">
        <h4 class="list-group-item-heading">List group item heading</h4>
        <p class="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
      </a>
      </div>

      */