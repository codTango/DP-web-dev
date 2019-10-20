(function($) {
  "use strict"; // Start of use strict

  /* CONSTANT; change the number if need */
  var VIEWMORELIMIT = 30;
  var IMAGELIMIT = 12;
  /* CONSTANT; change the number if need */

  var page = 1;
  var section = 1;
  var list = 1;
  var imgId = 1;

  function loadImages(num) {
    var curItemLen = $("#gallery-1").find(".img-tile").length;
    var item = curItemLen + 1;
    var rowNum = num / 3;
    var row = '';
    var gallery = jsonData.gallery;

    for (var i = 0; i < rowNum; i++) {
      row += '<div class="row">';
      for (var j = 0; j < 3; j++) {
        var url = section === 1 ? 'img/work-gallery/'+page+'/'+section+'/'+list+'/'+item+'.jpg' : 'img/work-gallery/'+page+'/'+section+'/'+item+'.jpg';
        var title = gallery[page] && gallery[page][section] && gallery[page][section][list] && gallery[page][section][list][item] && gallery[page][section][list][item]['title'];

        row += '<div class="img-tile col-md-4">';
        row += '<a href="' + url + '" data-toggle="lightbox" data-gallery="gallery">';
        row += '<img id="'+item+'" src="' + url + '" class="img-fluid rounded grayscale">';
        row += '</a>';
        row += '<p>' + title + '</p>';
        row += '</div>';
        item++;
      }
      row += '</div>';
    }
    $("#gallery-1").append(row);
  }

  function loadImageDetail(id) {
    $("#gallery-nav-2").hide();
    $("#gallery-1").hide();
    $("#viewMore-container").hide();
    $("#gallery-1").empty();
    imgId = id;
    var gallery = jsonData.gallery;
    var row = '<div class="container">'
      + '<div class="row">'
      + '<div class="col-md-9">'
      + '<img src="img/work-gallery/'+page+'/'+section+'/'+id+'/1.jpg" class="img-fluid rounded main-img">'
      + '<div class="thumbnail row">';
    var title = gallery[page] && gallery[page][section] && gallery[page][section][id] && gallery[page][section][id][1] && gallery[page][section][id][1]['title'];
    var description = gallery[page] && gallery[page][section] && gallery[page][section][id] && gallery[page][section][id][1] && gallery[page][section][id][1]['desc'];

    for (var i = 1; i < 4; i++) {
      var thumbnailUrl = 'img/work-gallery/'+page+'/'+section+'/'+id+'/'+i+'.jpg';
      row += '<a data-toggle="thumbnail" class="col-sm-4">';
      row += '<img src="'+thumbnailUrl+'" class="img-fluid rounded grayscale"></a>';
    }
    
    row += '</div></div><div class="col-md-3">';
    row += '<div class="img-desc"><h3>'+title+'</h3><p>'+description+'</p></div>';
    row += '<div class="nav-btn">';
    row += '<span class="leftArrow">&lt;</span>';
    row += '<span class="rightArrow">&gt;</span>';
    row += '</div></div></div></div>';

    $("#gallery-detail").append(row);
    $('a[data-toggle="thumbnail"] img').first().addClass("active");
  }

  $(document).ready(function() {
    $('#resuable-header').load('./resuable-header.html', function() {
      $("a.nav-link.js-scroll-trigger:eq(2)").addClass("active");
      $('a.js-trigger[data-page="1"]').addClass("active");
      $('a.ga-trigger[data-section="1"]').addClass("active");
      $('a[data-list="1"]').addClass("active");
      loadImages(12);
    });
    $('#resuable-footer').load('./resuable-footer.html');
  });

  $(document).on("click", '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    if (section === 1) {
      $(this).ekkoLightbox();
    } else {
      // render image detail
      var id = event.target.id;
      loadImageDetail(id);
    }
  });

  $(document).on("click", '[data-toggle="page"]', function(event) {
    $('a.js-trigger[data-page="' + page + '"]').removeClass("active");
    page = $(this).data('page');
    $('a.js-trigger[data-page="' + page + '"]').addClass("active");

    if (section === 1) {
      $("#gallery-nav-2").show();
    } else {
      $("#gallery-nav-2").hide();
    }
    $("#gallery-1").show();
    $("#viewMore-container").show();

    $("#gallery-1").empty();
    $("#gallery-detail").empty();
    loadImages(12);
  });

  $(document).on("click", '[data-toggle="section"]', function(event) {
    $('a.ga-trigger[data-section="' + section + '"]').removeClass("active");
    section = $(this).data('section');
    $('a.ga-trigger[data-section="' + section + '"]').addClass("active");

    if (section === 1) {
      $("#gallery-nav-2").show();
    } else {
      $("#gallery-nav-2").hide();
      list = 1;
    }
    $("#gallery-1").show();
    $("#viewMore-container").show();
    $("#gallery-1").empty();
    $("#gallery-detail").empty();

    loadImages(12);
  });

  $(document).on("click", '[data-toggle="list"]', function(event) {
    $('a[data-list="' + list + '"]').removeClass("active");
    list = $(this).data('list');
    $('a[data-list="' + list + '"]').addClass("active");

    $("#gallery-1").empty();
    $("#gallery-detail").empty();
    loadImages(12);
  });

  $("#viewMore").click(function() {
    if ($("#gallery-1").find(".img-tile").length !== VIEWMORELIMIT) {
      loadImages(3);
    }
  });

  $(document).on("click", '[data-toggle="thumbnail"]', function(event) {
    var url = event.target.src;
    $(".main-img").attr('src', url);
    $('a[data-toggle="thumbnail"] img').removeClass("active");
    event.target.classList.add("active");
  });

  $(document).on("click", '.leftArrow', function(event) {
    imgId--;
    imgId = imgId%12 !== 0 ? imgId : 12;
    
    event.preventDefault();
    $("#gallery-1").empty();
    $("#gallery-detail").empty();
    loadImageDetail(imgId);
  });

  $(document).on("click", '.rightArrow', function(event) {
    imgId++;
    imgId = imgId%12 !== 0 ? imgId%12 : 12;

    event.preventDefault();
    $("#gallery-1").empty();
    $("#gallery-detail").empty();
    loadImageDetail(imgId);
  });
})(jQuery); // End of use strict
