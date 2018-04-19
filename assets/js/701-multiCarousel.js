/**
 * Multi carousel
 */
jQuery.app.multiCarousel = {
  // Selektory
  css: {
    elem: '.jq-multi-carousel',
    prev: '.jq-multi-carousel-prev',
    next: '.jq-multi-carousel-next',
  },
  elem: null,
  a_clickEvent: false,
  rt_clickEvent: 280,
  mobileWidth: 530 // in px
};

(function ($, mdl) {
  "use strict";

  // Inicializace skriptu
  mdl.init = function () {
    console.log('Init multi carousel...');
    mdl.elem = $(mdl.css.elem);

    if (mdl.isElement()) {
      $(mdl.css.elem).each(function (i, v) {
        mdl.initCarousel($(v));
      });

      $(window).on('resize', function () {
        setTimeout(function () {
          mdl.resizeWindow();
        }, 331);
      });

      $(window).trigger('resize');
    } // end if    
  };

  mdl.isElement = function () {
    if (mdl.elem && mdl.elem.length > 0) {
      return true;
    } else {
      return false;
    }// end if
  };

  mdl.initCarousel = function ($element) {
    console.log('Init element carousel...');
    var _id = $element.attr('data-mc-id');
    var _$items = $element.children();
    var _$prev = $(mdl.css.prev + '[data-mc="' + _id + '"]');
    var _$next = $(mdl.css.next + '[data-mc="' + _id + '"]');

    if (_$prev && _$prev.length > 0) {
      _$prev.bind('click', mdl.clickPrevBtn);
    }// end if

    if (_$next && _$next.length > 0) {
      _$next.bind('click', mdl.clickNextBtn);
    }// end if   

    console.log(_$items);
    console.log(_$items.length);
    console.log(_id);
    console.log(_$prev);
    console.log(_$next);
  };

  mdl.resizeWindow = function () {
    console.log('Window resize...');
    var _w_width = $(window).outerWidth();

    if (_w_width < mdl.mobileWidth) {
      mdl.elem.each(function (i, v) {
        var _$child = $(v).children().first();
        var _e_width = $(v).outerWidth();
        var _ch_width = _$child.outerWidth();

        $(v).css({
          'padding-left': ((_e_width - _ch_width) / 2) + 'px'
        });

      });
    } else {
      mdl.elem.removeAttr('style');
    }// end if

    console.log(_w_width);
  };

  mdl.clickPrevBtn = function (e) {
    e.preventDefault();
    if (!mdl.a_clickEvent) {
      mdl.a_clickEvent = true;
      var _$btn = $(this);
      var _id = _$btn.attr('data-mc');
      var _$elem = $('[data-mc-id="' + _id + '"]');

      console.log('Cleck prev btn...');
      console.log(_id);

      mdl.elementPrev(_$elem);

      setTimeout(function () {
        mdl.a_clickEvent = false;
      }, mdl.rt_clickEvent);
    }// end if
  };

  mdl.clickNextBtn = function (e) {
    e.preventDefault();
    if (!mdl.a_clickEvent) {
      mdl.a_clickEvent = true;
      var _$btn = $(this);
      var _id = _$btn.attr('data-mc');
      var _$elem = $('[data-mc-id="' + _id + '"]');

      console.log('Cleck next btn...');
      console.log(_id);

      mdl.elementNext(_$elem);

      setTimeout(function () {
        mdl.a_clickEvent = false;
      }, mdl.rt_clickEvent);
    }// end if
  };

  mdl.elementPrev = function ($element) {
    console.log('Element prev...');
    $.each($element, function (i, v) {
      var _$last_item = $(v).children().last();

      _$last_item.addClass('invisible hidden');

      setTimeout(function () {
        $(v).prepend(_$last_item);
        _$last_item.addClass('animated');

        setTimeout(function () {
          _$last_item.removeClass('hidden');

          setTimeout(function () {
            _$last_item.removeClass('invisible');

            setTimeout(function () {
              _$last_item.removeClass('animated');
            }, 127);
          }, 127);
        }, 17);
      }, 17);
    });

    /*_$last_item.hide();
     
     setTimeout(function () {
     $element.prepend(_$last_item);
     
     setTimeout(function () {
     _$last_item.fadeIn(331);
     }, 17);
     }, 17);*/
  };

  mdl.elementNext = function ($element) {
    console.log('Element next...');
    $.each($element, function (i, v) {
      var _$first_item = $(v).children().first();

      _$first_item.addClass('animated');

      setTimeout(function () {
        _$first_item.addClass('invisible');

        setTimeout(function () {
          _$first_item.addClass('hidden');

          setTimeout(function () {
            $(v).append(_$first_item);
            _$first_item.removeClass('invisible hidden animated');
          }, 127);
        }, 127);
      }, 17);
    });

    /*_$first_item.fadeOut(331, function () {
     $element.append(_$first_item);
     _$first_item.fadeIn(331);
     });*/
  };

})(jQuery, jQuery.app.multiCarousel);