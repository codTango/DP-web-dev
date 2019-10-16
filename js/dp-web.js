(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 56
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").length && $("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else if ($("#mainNav-2").length && $("#mainNav-2").offset().top > 100) {
      $("#mainNav-2").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
      $("#mainNav-2").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  // $(window).scroll(navbarCollapse);

  // Collapse Second Level Navbar
  var secondNavbarCollapse = function() {
    if ($(".masthead").length && $(".masthead").offset().top > 100) {
      $(".masthead").addClass("navbar-shrink");
    } else if ($(".masthead-2").length && $(".masthead-2").offset().top > 100) {
      $(".masthead-2").addClass("navbar-shrink");
    } else {
      $(".masthead").removeClass("navbar-shrink");
      $(".masthead-2").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  secondNavbarCollapse();

  // Work page
  

})(jQuery); // End of use strict
