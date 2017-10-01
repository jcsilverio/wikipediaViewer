$("#searchButton").click(function() {

  $.ajax({
    type: "GET",
    url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=Jimi_Hendrix&callback=?",
    contentType: "application/json; charset=utf-8",
    async: false,
    dataType: "json",
    success: function(data, textStatus, jqXHR) {
      console.log(data);

      var markup = data.parse.text["*"];
      var blurb = $('<div></div>').html(markup);

      // remove links as they will not work
      blurb.find('a').each(function() { $(this).replaceWith($(this).html()); });

      // remove any references
      blurb.find('sup').remove();

      // remove cite error
      blurb.find('.mw-ext-cite-error').remove();
      $('#searchResults').html($(blurb).find('p'));

    },
    error: function(errorMessage) {}
  });
});


/*
    <div class="list-group" id="searchResults">
      <a href="#" class="list-group-item">
        <h4 class="list-group-item-heading">List group item heading</h4>
        <p class="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
      </a>
      </div>

      */