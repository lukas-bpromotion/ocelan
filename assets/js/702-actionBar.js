/**
 * Action bar
 */
jQuery.app.actionBar = {
  // Selektory
  css: {
    elem: $.app.ids.actionBar,
    item: '.jq-action-bar-item',
    itemImage: '.jq-action-bar-item-image',
    itemText: '.jq-action-bar-item-text',
    prev: '.jq-action-bar-prev',
    next: '.jq-action-bar-next',
  },
  elem: null,
  a_clickEvent: false,
  rt_clickEvent: 331,
  loopTimer: null,
  loopTimerDelay: 7000
};

(function ($, mdl) {
  "use strict";

  // Inicializace skriptu
  mdl.init = function () {
    console.log('Init action bar...');
    mdl.elem = $(mdl.css.elem);

    if (mdl.isElement()) {

      mdl.initCarousel();
    } // end if    
  };

  mdl.isElement = function () {
    if (mdl.elem && mdl.elem.length > 0) {
      return true;
    } else {
      return false;
    }// end if
  };

  mdl.initCarousel = function () {
    console.log('Init action bar carousel...');

    $(mdl.css.prev).bind('click', mdl.clickPrevBtn);
    $(mdl.css.next).bind('click', mdl.clickNextBtn);

    mdl.resetTimer();
  };

  mdl.resetTimer = function () {
    mdl.stopTimer();

    mdl.loopTimer = setInterval(function () {
      mdl.elementNext();
    }, mdl.loopTimerDelay);
  };
  
  mdl.stopTimer = function () {
    clearInterval(mdl.loopTimer);
  };

  mdl.clickPrevBtn = function (e) {
    e.preventDefault();
    if (!mdl.a_clickEvent) {
      mdl.a_clickEvent = true;

      mdl.elementPrev();
      mdl.stopTimer();

      setTimeout(function () {
        mdl.a_clickEvent = false;
      }, mdl.rt_clickEvent);
    }// end if
  };

  mdl.clickNextBtn = function (e) {
    e.preventDefault();
    if (!mdl.a_clickEvent) {
      mdl.a_clickEvent = true;

      mdl.elementNext();
      mdl.stopTimer();

      setTimeout(function () {
        mdl.a_clickEvent = false;
      }, mdl.rt_clickEvent);
    }// end if
  };

  mdl.elementPrev = function () {
    //console.log('Element prev...');
    var _$items = mdl.elem.children();
    var _$active_item = mdl.elem.children('.active');
    var _active_index = _$active_item.index();
    var _prev_index = _active_index - 1;

    if (_prev_index < 0) {
      _prev_index = _$items.length - 1;
    }// end if

    if (_active_index !== _prev_index) {
      _$active_item.removeClass('active');
      $(_$items[_prev_index]).addClass('active');
    }// end if
  };

  mdl.elementNext = function () {
    //console.log('Element next...');
    var _$items = mdl.elem.children();
    var _$active_item = mdl.elem.children('.active');
    var _active_index = _$active_item.index();
    var _next_index = _active_index + 1;

    if (_next_index >= _$items.length) {
      _next_index = 0;
    }// end if

    if (_active_index !== _next_index) {
      _$active_item.removeClass('active');
      $(_$items[_next_index]).addClass('active');
    }// end if
  };

})(jQuery, jQuery.app.actionBar);