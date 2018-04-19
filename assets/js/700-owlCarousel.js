/**
 * Owl Carousel
 */
jQuery.app.owlCarousel = {
  // Selektory
  css: {
    elem: '.jq-owl-carousel', // Element selector		
    btnLeft: '.jq-owl-carousel-btn-left',
    btnRight: '.jq-owl-carousel-btn-right'
  },
  elem: null,
  a_clickEvent: false,
  rt_clickEvent: 499
};

(function ($, mdl) {
  "use strict";

  // Inicializace skriptu
  mdl.init = function () {
    mdl.elem = $(mdl.css.elem);
    mdl.elem.owlCarousel({
      animateOut: 'slideOutDown',
      animateIn: 'flipInX',
      loop: true,
      dots: false,
      margin: 30,
      items: 4,
      autoplay: true,
      autoplayTimeout: 2000,
      autoplayHoverPause: true,
      smartSpeed: 300
    });

    $(mdl.css.btnLeft).bind('click touchstart', mdl.onLeftBtnClick);
    $(mdl.css.btnRight).bind('click touchstart', mdl.onRightBtnClick);
  };

  mdl.onLeftBtnClick = function (e) {
    if (!mdl.a_clickEvent) {
      mdl.a_clickEvent = true;

      mdl.elem.trigger('prev.owl.carousel');

      setTimeout(function () {
        mdl.a_clickEvent = false;
      }, mdl.rt_clickEvent);
    }// end if
  };

  mdl.onRightBtnClick = function (e) {
    if (!mdl.a_clickEvent) {
      mdl.a_clickEvent = true;

      mdl.elem.trigger('next.owl.carousel');

      setTimeout(function () {
        mdl.a_clickEvent = false;
      }, mdl.rt_clickEvent);
    }// end if
  };

})(jQuery, jQuery.app.owlCarousel);