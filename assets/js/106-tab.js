/**
 * Tabs
 */
jQuery.app.tab = {
  // Selektory
  css: {
    block: '.jq-tab-block', // selektor, kde se vse nachazi
    elem: '.jq-tab', // hlavní selektor			
    link: '.jq-tab-link' // link selector
  },
  elem: null,
  transmuteTimer: null,
  lastPosition: 0,
  a_clickEvent: false,
  rt_clickEvent: 499
};

(function ($, mdl) {
  "use strict";

  // Inicializace skriptu
  mdl.init = function () {
    console.log('Tab init...');

    $(mdl.css.link).bind('click', mdl.clickTabLink);

    mdl.initElems();
  };

  mdl.initElems = function () {
    $(mdl.css.block).each(function (j, w) {
      var _$block = $(w);
      _$block.find(mdl.css.link).each(function (i, v) {
        var _$link = $(v);
        var _id = _$link.attr('href');
        var _$item = $(_id);
        if (i === 0) {
          _$link.addClass('active');
          _$item.show();
        } else {
          _$item.hide();
        }// end if
      });
    });
  };

  mdl.clickTabLink = function (e) {
    e.preventDefault();
    if (!mdl.a_clickEvent) {
      mdl.a_clickEvent = true;

      var _$link = $(this);
      var _id = _$link.attr('href');
      var _$item = $(_id);
      var _$block = _$link.closest(mdl.css.block);

      mdl.deactiveAllLinksInBlock(_$block);
      mdl.hideAllItemsInBlock(_$block);
      _$item.show();
      _$link.addClass('active');

      setTimeout(function () {
        mdl.a_clickEvent = false;
      }, mdl.rt_clickEvent);
    }// end if
  };

  mdl.hideAllItems = function () {
    $(mdl.css.elem).hide();
  };

  mdl.hideAllItemsInBlock = function ($block) {
    $block.find(mdl.css.elem).hide();
  };

  mdl.deactiveAllLinks = function () {
    $(mdl.css.link).removeClass('active');
  };

  mdl.deactiveAllLinksInBlock = function ($block) {
    $block.find(mdl.css.link).removeClass('active');
  };

})(jQuery, jQuery.app.tab);