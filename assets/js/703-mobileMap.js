/**
 * Mobile map
 */
jQuery.app.mobileMap = {
  // Selektory
  css: {
    elem: $.app.ids.mobileMap,
    open: '.jq-mobile-map-open',
    close: '.jq-mobile-map-close',
    list: '.jq-mobile-map-list',
    content: '.jq-mobile-map-content',
  },
  elem: null,
  a_clickEvent: false,
  rt_clickEvent: 331
};

(function ($, mdl) {
  "use strict";

  // Inicializace skriptu
  mdl.init = function () {
    console.log('Init mobile map...');
    mdl.elem = $(mdl.css.elem);

    if (mdl.isElement()) {
      mdl.initMobileMap();
    } // end if    
  };

  mdl.isElement = function () {
    if (mdl.elem && mdl.elem.length > 0) {
      return true;
    } else {
      return false;
    }// end if
  };

  mdl.initMobileMap = function () {
    console.log('Init mobile map...');

    $(mdl.css.open).bind('click', mdl.clickOpenBtn);
    $(mdl.css.close).bind('click', mdl.clickCloseBtn);
  };

  mdl.clickOpenBtn = function (e) {
    e.preventDefault();
    if (!mdl.a_clickEvent) {
      mdl.a_clickEvent = true;
      
      mdl.elem.addClass('active');
      mdl.scrollMapToCenter();

      setTimeout(function () {
        mdl.a_clickEvent = false;
      }, mdl.rt_clickEvent);
    }// end if
  };

  mdl.clickCloseBtn = function (e) {
    e.preventDefault();
    if (!mdl.a_clickEvent) {
      mdl.a_clickEvent = true;

      mdl.elem.removeClass('active');

      setTimeout(function () {
        mdl.a_clickEvent = false;
      }, mdl.rt_clickEvent);
    }// end if
  };

  mdl.scrollMapToCenter = function () {
    var _$list = $(mdl.css.list);
    var _$content = $(mdl.css.content);

    if (mdl.checkElementsToCenter(_$list, _$content)) {
      var _s_list = {
        width: parseInt(_$list.outerWidth(), 10), 
        height: parseInt(_$list.outerHeight(), 10)
      };
      
      var _s_content = {
        width: parseInt(_$content.outerWidth(), 10), 
        height: parseInt(_$content.outerHeight(), 10)
      };
      
      var _left = Math.round((_s_content.width - _s_list.width) / 2);
      if (_left < 0) {
        _left = 0;
      }// end if
      
      var _top = Math.round((_s_content.height - _s_list.height) / 2);
      if (_top < 0) {
        _top = 0;
      }// end if
      
      _$list.scrollLeft(_left);
      _$list.scrollTop(_top);
      
      console.log(_s_list);
      console.log(_s_content);
    }// end if
  };

  mdl.checkElementsToCenter = function ($list, $content) {
    if (($list && $list.length > 0) && ($content && $content.length > 0)) {
      return true;
    } else {
      return false;
    }// end if
  };

})(jQuery, jQuery.app.mobileMap);