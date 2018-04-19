/**
 * Vysunutí/zasunutí hlavního menu
 */
jQuery.app.video = {
  // Selektory
  css: {
    elem: jQuery.app.ids.video // hlavní selektor			
  },
  elem: null,
  refreshTimer: null,
  refreshTimeout: 250,
  mobileWidth: 1280
};

(function ($, mdl) {
  "use strict";

  // Inicializace skriptu
  mdl.init = function () {
    console.log('Video init...');
    mdl.elem = $(mdl.css.elem);

    $(window).bind('resize', mdl.updateVideoSize);

    mdl.setMaxWidthOfVideo();
  };

  mdl.updateVideoSize = function () {
    console.log('Refresh video...');
    if (mdl.refreshTimer !== null) {
      clearTimeout(mdl.refreshTimer);
    }// end if

    mdl.refreshTimer = setTimeout(function () {
      mdl.setMaxWidthOfVideo();
    }, mdl.refreshTimeout);
  };

  mdl.setMaxWidthOfVideo = function () {
    if (mdl.elem !== null) {
      var _window_height = Number($(window).height());
      var _window_width = Number($(window).width());
      var _max_width = 1200;

      if (_window_width < mdl.mobileWidth) {
        _max_width = Math.round((_window_height - 230) * 1.7777);
      } else {
        _max_width = Math.round((_window_height - 300) * 1.7777);
      }// end if

      mdl.elem.css({'max-width': _max_width + 'px'});
    }// end if
  };

})(jQuery, jQuery.app.video);