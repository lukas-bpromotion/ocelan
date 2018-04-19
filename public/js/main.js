(function ($) {
	"use strict";

	// zabraňuje kliknutí na odkazy v prototypu
	$('a[href="#"]').click(function (e) {
		e.preventDefault();
	});

	// Inicializace AOS pluginu
	/*AOS.init({
		offset: 120,
		duration: 400,
		easing: 'ease',
		delay: 0
	});*/

	// Lightbox option
	lightbox.option({
		'fadeDuration': 300,
		'imageFadeDuration': 300,
		'resizeDuration': 300,
		'showImageNumberLabel': false
	});

	// Init relax plugin
	/*if ($('.jq-rellax').length > 0) {
		var rellax = new Rellax('.jq-rellax', {
			speed: -4,
			center: false,
			round: true,
		});
	}// end if*/

	// Inicializace proměnné pro celou aplikaci.
	// Spuštění jednotlivých částí aplikace probíhá v 99-init.js.
	$.app = {
		// ID elementů jednotlivých částí aplikace
		ids: {
			map: '#jq-map', // mapa
			menuBar: '#jq-menu-bar', // menu
			submenu: '#jq-submenu-bar', // submenu
      video: '#jq-video', // video
      actionBar: '#jq-action-bar', // action bar
      mobileMap: '#jq-mobile-map', // mobile map
      floorMap: '#jq-floor-map', // floor bar
		}
	};

	/**
	 * Inicializuje jednotlivé moduly BPromo.
	 * @param  {string} moduleName Název modulu.
	 * @param  {string} selector jQuery selektor, který musí na stránce existovat právě jednou, aby se modul spustil.
	 * @return {void}
	 */
	$.app.init = function (moduleName, selector) {

		if (typeof selector === 'string') { // pokud je zadaný unikátní selektor, ověří zda existuje
			if ($(selector).length != 1)
				return; // pokud unikátní selektor neexistuje, přeruší funkci
		}

		$.app[moduleName].init(); // spustí inicializační funkci modulu

	};
})(jQuery);
/**
 * Loader SVG
 */
jQuery.app.svgLoader = {
	// Selektory
	css: {
		svg: '.jq-bp-svg' // Element selector
	},
	svgList: [], // SVG elements
	urlList: [] // [{url: 'aaa.bb'}, {url: 'bbb.cc'}]
};

(function ($, mdl) {
	"use strict";

	// Inicializace skriptu
	mdl.init = function () {
		mdl.svgList = $(mdl.css.svg);

		mdl.fillURLList();

		mdl.loadAJAXSVG();
	};

	mdl.fillURLList = function () {
		mdl.svgList.each(function (i, v) {
			var _$el = $(v);
			var _url = mdl.getAbsoluteUrl(_$el.attr('data-src'));
			var _key = _.findKey(mdl.urlList, {'url': _url});
			if (_.isUndefined(_key)) {
				mdl.urlList.push({'url': _url});
				_key = mdl.urlList.length - 1;
			}// end if

			_$el.attr('data-node', _key);
		});
	};

	mdl.getAbsoluteUrl = function (url) {
		var a = document.createElement('a');
		a.href = url;
		return a.href;
	};

	mdl.loadAJAXSVG = function () {
		$.each(mdl.urlList, function (i, v) {
			$.ajax({
				url: v.url,
				type: 'GET',
				dataType: 'html',
				success: function (data, textStatus, jqXHR) {
					$(mdl.css.svg + '[data-node="' + i + '"]').html(data);
				}
			});
		});
	};

})(jQuery, jQuery.app.svgLoader);
/**
 * Vycentrovani obrazku
 */
jQuery.app.centerImage = {
	// Selektory
	css: {
		imageOriginal: '.jq-image-center', // original image
		containClass: 'jq-image-contain' // contain parameter
	}
};

(function ($, mdl) {
	"use strict";

	// Inicializace skriptu
	mdl.init = function () {
		$(mdl.css.imageOriginal).each(mdl.switchImage);
	};

	mdl.switchImage = function () {
		var _img = $(this);
		var _contain = _img.hasClass(mdl.css.containClass);
		var _i_src = _img.attr('src');
		if (_contain) {
			var _sub_img = '<div class="o-image-center__alternative o-image-center__alternative--contain is-replaced" style="background-image: url(' + _i_src + ');"></div>';
		} else {
			var _sub_img = '<div class="o-image-center__alternative is-replaced" style="background-image: url(' + _i_src + ');"></div>';
		}

		_img.before(_sub_img);
		_img.addClass('is-replaced');
	};

	mdl.centerImageInElement = function ($item) {
		$item.find(mdl.css.imageOriginal).each(mdl.switchImage);
	};

})(jQuery, jQuery.app.centerImage); 
/**
 * Vycentrovani obrazku
 */
jQuery.app.centerImage_v2 = {
	// Selektory
	css: {
		imageBox: '.jq-image-center-box' // box s obrazkem		
	},
	resizeTime: 251,
	enableObjectFit: false
};

(function ($, mdl) {
	"use strict";

	// Inicializace skriptu
	mdl.init = function () {
		// Test modernizer
		if (Modernizr.objectfit) {
			mdl.enableObjectFit = true;
		} else {
			$('html').addClass('no-objectfit');
		}// end if		

		if (!mdl.enableObjectFit) {
			$(mdl.css.imageBox).each(mdl.imageInit);
		}// end if
	};

	mdl.imageInit = function (i, e) {
		var _$box = $(e);
		mdl.getImgSize(_$box);

		$(window).bind('resize', function () {
			setTimeout(function () {
				mdl.refreshImageBox(_$box);
			}, mdl.resizeTimer);
		});
	};

	mdl.getImgSize = function ($box) {
		var _$image = $box.find('img');
		var _img_src = _$image.attr('src');
		var _img = new Image();

		_img.onload = function () {
			var _height = _img.naturalHeight;
			var _width = _img.naturalWidth;
			_$image.attr('data-width', _width);
			_$image.attr('data-height', _height);

			mdl.refreshImageBox($box);
		};// end function

		_img.src = _img_src;
	};

	mdl.refreshImageBox = function ($box) {
		if (!mdl.enableObjectFit) {
			var _$image = $box.find('img');
			var _img_width = parseFloat(_$image.attr('data-width'));
			var _img_height = parseFloat(_$image.attr('data-height'));

			if (!(_img_width != undefined && _img_width > 0 && _img_height != undefined && _img_height > 0)) {
				_$image.attr('data-width', _$image.naturalWidth);
				_$image.attr('data-height', _$image.naturalHeight);
			//console.log(_$image[0]);
			//console.log(_$image[0].naturalWidth);
			//console.log(_$image[0].naturalHeight);
				_img_width = parseFloat(_$image[0].naturalWidth);
				_img_height = parseFloat(_$image[0].naturalHeight);
			}// end if

			var _$parent = $box.parent();
			var _parent_width = parseFloat(_$parent.width());
			var _parent_height = parseFloat(_$parent.height());
			var _parent_scale = _parent_width / _parent_height;
			var _img_scale = _img_width / _img_height;

			if (_parent_scale < _img_scale) {
				$box.removeClass('vertical');
			} else {
				$box.addClass('vertical');
			}// end if

		//console.log('Parent scale: ' + _parent_scale);
		//console.log('Image scale: ' + _img_scale);
		}// end if

	};

})(jQuery, jQuery.app.centerImage_v2); 
/**
 * Scrollne ke kotve
 */
jQuery.app.scrollToAnchor = {
	// Selektory
	css: {
		link: '.jq-anchor-scroll', // link pro scrollovani
	},
	listElem: null,
	a_clickEvent: false,
	rt_clickEvent: 499,
	topBarHeight: 80
};

(function ($, mdl) {
	"use strict";

	// Inicializace skriptu
	mdl.init = function () {
		$(mdl.css.link).bind('click touchstart', mdl.onLinkClick);
	};

	mdl.onLinkClick = function (e) {
		if (!mdl.a_clickEvent) {
			mdl.a_clickEvent = true;
			var _link = $(this);
			var _href = mdl.getAnchor(_link.attr('href'));			
			var _to_element = (!_href) ? undefined : $(_href);
			
			console.log(_to_element);

			if ((typeof _to_element !== 'undefined') && (_to_element.length > 0)) {
				e.preventDefault();
				var _scroll_to = _to_element.offset().top - mdl.topBarHeight;
				// Sanitize scroll
				if (_scroll_to < 0) {
					_scroll_to = 0;
				}// end if
				$('html, body').stop(true, true).animate({scrollTop: _scroll_to}, 777);
			}// end if		

			setTimeout(function () {
				mdl.a_clickEvent = false;
			}, mdl.rt_clickEvent);
		}// end if
	};
	
	mdl.getAnchor = function (link) {
		var _link_parts = link.split('#');
		
		if ((typeof _link_parts[1] !== 'undefined') && (_link_parts[1] !== '')) {
			return '#' + _link_parts[1];
		} else {
			return false;
		}// end if		
	};

})(jQuery, jQuery.app.scrollToAnchor);
/**
 * Burger menu
 */
jQuery.app.burgerMenu = {
	// Selektory
	css: {
		toggler: '.jq-burger-menu-toggler', // Element selector
		content: '.jq-burger-menu-content'
	},
	a_clickEvent: false,
	rt_clickEvent: 499
};

(function ($, mdl) {
	"use strict";

	// Inicializace skriptu
	mdl.init = function () {
		if (mdl.checkElements()) {
			$(mdl.css.toggler).bind('click touchstart', mdl.clickToToggler);
		}// end if
	};

	mdl.checkElements = function () {
		var _is_ok = false;
		var _toggler_list = $(mdl.css.toggler);
		var _content_list = $(mdl.css.content);

		if (!_.isUndefined(_toggler_list)
			 && _toggler_list.length > 0
			 && !_.isUndefined(_content_list)
			 && _content_list.length) {
			_is_ok = true;
		}// end if

		return _is_ok;
	};

	mdl.clickToToggler = function (e) {
		if (!mdl.a_clickEvent) {
			mdl.a_clickEvent = true;
			var _$toggler = $(mdl.css.toggler);
			var _$content = $(mdl.css.content);
			var _is_open = _$toggler.hasClass('is-open');

			if (_is_open) {
				mdl.closeMenu(_$toggler, _$content);
			} else {
				mdl.openMenu(_$toggler, _$content);
			}// end if

			setTimeout(function () {
				mdl.a_clickEvent = false;
			}, mdl.rt_clickEvent);
		}// end if
	};

	mdl.openMenu = function ($toggler, $content) {
		$toggler.addClass('is-open');
		$content.addClass('is-open');
		$.app.menuBar.__public__setOpen(true);
		$.app.menuBar.__public__setScrolled();
	};

	mdl.closeMenu = function ($toggler, $content) {
		$toggler.removeClass('is-open');
		$content.removeClass('is-open');
		$.app.menuBar.__public__setOpen(false);
		$.app.menuBar.__public__setToNormal();
	};

	mdl.__public__closeMenu = function () {
		var _$toggler = $(mdl.css.toggler);
		var _$content = $(mdl.css.content);
		mdl.closeMenu(_$toggler, _$content);
	};

})(jQuery, jQuery.app.burgerMenu);
/**
 * Language menu
 */
jQuery.app.languageMenu = {
	// Selektory
	css: {
		toggler: '.jq-language-menu-toggler', // Element selector
		content: '.jq-language-menu-content'
	},
	a_clickEvent: false,
	rt_clickEvent: 499
};

(function ($, mdl) {
	"use strict";

	// Inicializace skriptu
	mdl.init = function () {
		if (mdl.checkElements()) {
			$(mdl.css.toggler).bind('click touchstart', mdl.clickToToggler);
		}// end if
	};

	mdl.checkElements = function () {
		var _is_ok = false;
		var _toggler_list = $(mdl.css.toggler);
		var _content_list = $(mdl.css.content);
		
		if (!_.isUndefined(_toggler_list) 
			 && _toggler_list.length > 0 
			 && !_.isUndefined(_content_list) 
			 && _content_list.length) {
			_is_ok = true;
		}// end if

		return _is_ok;
	};

	mdl.clickToToggler = function (e) {
		if (!mdl.a_clickEvent) {
			mdl.a_clickEvent = true;
			var _$toggler = $(mdl.css.toggler);
			var _$content = $(mdl.css.content);
			var _is_open = _$content.hasClass('is-open');

			if (_is_open) {
				mdl.closeMenu(_$toggler, _$content);
			} else {
				mdl.openMenu(_$toggler, _$content);
			}// end if

			setTimeout(function () {
				mdl.a_clickEvent = false;
			}, mdl.rt_clickEvent);
		}// end if
	};

	mdl.openMenu = function ($toggler, $content) {
		$content.addClass('is-open');
	};

	mdl.closeMenu = function ($toggler, $content) {
		$content.removeClass('is-open');
	};

})(jQuery, jQuery.app.languageMenu);
/**
 * Vysunutí/zasunutí hlavního menu
 */
jQuery.app.menuBar = {
	// Selektory
	css: {
		elem: jQuery.app.ids.menuBar // hlavní selektor			
	},
	elem: null,
	transmuteTimer: null,
	lastPosition: 0
};

(function ($, mdl) {
	"use strict";

	// Inicializace skriptu
	mdl.init = function () {
		console.log('Navigation init...');
		mdl.elem = $(mdl.css.elem);

		// init transmute
		mdl.transmute();

		// scrollovani
		$(window).on('scroll', function (e) {
			mdl.transmute(true);
		});

		//resize
		$(window).on('resize', function (e) {
			clearTimeout(mdl.transmuteTimer);
			mdl.transmuteTimer = setTimeout(mdl.transmute, 250);
		});

	};

	// Zmena zobrazeni bar menu na zaklade scroll/resize/reload
	mdl.transmute = function (is_scroll, external_call) {
		var _window = $(window);
		var _scroll_value = parseInt(_window.scrollTop(), 10);
		var _no_hero = mdl.elem.hasClass('no-hero');
		
		// Sanitize scroll value
		if (_scroll_value < 0) {
			_scroll_value = 0;
		}// end if

		if (_no_hero) {
			if (is_scroll) {
				//mdl.closeNavigation();
				if ((_scroll_value) > mdl.lastPosition) {
					// scrolling downwards
					mdl.elem.removeClass('visible');
					$.app.submenu.__public__setToTop();		
				} else {
					// scrolling upwards 
					mdl.elem.addClass('visible');
					$.app.submenu.__public__setLower();		
				}// end if		  
			}// end if
		} else {
			if (_scroll_value > 0) {
				mdl.elem.addClass('scrolled');
			} else {
				mdl.elem.removeClass('scrolled');
			}// end if

			if (is_scroll) {
				//mdl.closeNavigation();
				if ((_scroll_value) > mdl.lastPosition) {
					// scrolling downwards
					mdl.elem.removeClass('visible');
				} else {
					// scrolling upwards 
					mdl.elem.addClass('visible');
				}// end if		  
			}// end if
		}// end if

		if (typeof external_call == 'undefined') {			
			$.app.burgerMenu.__public__closeMenu();		
		}// end if

		mdl.lastPosition = _scroll_value;
	};

	mdl.__public__setScrolled = function () {
		mdl.elem.addClass('scrolled');
		mdl.elem.addClass('visible');
	};

	mdl.__public__setToNormal = function () {
		mdl.transmute(false, true);
	};
	
	mdl.__public__setOpen = function (bool_value) {
		if (bool_value) {
			mdl.elem.addClass('is-open');
		} else {
			mdl.elem.removeClass('is-open');
		}// end if		
	};

})(jQuery, jQuery.app.menuBar);
/**
 * Popup block
 */
jQuery.app.popupBlock = {
	// Selektory
	css: {
		link: '.jq-popup-inner-link', // toggle pro otevreni vnitrniho popupu
		inner: '.jq-popup-inner',
		list: '.jq-popup-list',
		popup: '.o-popup-block',
		closeBtn: '.o-popup-block__close'
	},
	listElem: null,
	classOpen: 'open',
	classActive: 'active',
	a_clickEvent: false,
	rt_clickEvent: 499
};

(function ($, mdl) {
	"use strict";

	// Inicializace skriptu
	mdl.init = function () {
		console.log('Popup init...');
		$(mdl.css.link).bind('click touchstart', mdl.onLinkClick);
		$(mdl.css.closeBtn).bind('click touchstart', mdl.onCloseClick);
		$(document).bind('click touchstart', function () {
			if (!mdl.a_clickEvent) {
				mdl.a_clickEvent = true;

				mdl.closeAllPopup();

				setTimeout(function () {
					mdl.a_clickEvent = false;
				}, mdl.rt_clickEvent);
			}// end if
		});
		$(mdl.css.popup).bind('click touchstart', function (e) {
			e.stopPropagation();
		});
		$(mdl.css.inner).bind('click touchstart', function (e) {
			e.stopPropagation();
		});
	};

	mdl.onLinkClick = function (e) {
		console.log('Click link popup...');
		e.stopPropagation();
		e.preventDefault();
		if (!mdl.a_clickEvent) {
			mdl.a_clickEvent = true;

			var _link = $(this);
			var _$inner = _link.closest(mdl.css.inner);
			var _is_open = _$inner.hasClass(mdl.classOpen);
			var _popup = _$inner.find(mdl.css.popup);
			var _list = _popup.closest(mdl.css.list);

			mdl.closeAllPopup();

			if (!_is_open) {
				if (_popup != undefined && _popup.length > 0) {
					_popup.addClass(mdl.classOpen);
					_$inner.addClass(mdl.classOpen);
					mdl.setLinkToOpen(_link);
					if (_list != undefined && _list.length > 0) {
						_list.addClass(mdl.classActive);
					}// end if
				}// end if
			}// end if

			setTimeout(function () {
				mdl.a_clickEvent = false;
			}, mdl.rt_clickEvent);
		}// end if
	};

	mdl.onCloseClick = function (e) {
		e.stopPropagation();
		e.preventDefault();
		if (!mdl.a_clickEvent) {
			mdl.a_clickEvent = true;

			var _close_btn = $(this);
			var _$inner = _close_btn.closest(mdl.css.inner);
			var _link = _$inner.find(mdl.css.link);
			var _popup = _close_btn.closest(mdl.css.popup);
			var _list = _popup.closest(mdl.css.list);

			if (_popup != undefined && _popup.length > 0) {
				_popup.removeClass(mdl.classOpen);
				if (_$inner != undefined && _$inner.length > 0) {
					_$inner.removeClass(mdl.classOpen);
					mdl.setLinkToClose(_link);
				}// end if
				if (_list != undefined && _list.length > 0) {
					_list.removeClass(mdl.classActive);
				}// end if
			}// end if

			setTimeout(function () {
				mdl.a_clickEvent = false;
			}, mdl.rt_clickEvent);
		}// end if
	};

	mdl.closeAllPopup = function () {
		$(mdl.css.inner).removeClass(mdl.classOpen);
		$(mdl.css.popup).removeClass(mdl.classOpen);
		$(mdl.css.list).removeClass(mdl.classActive);
		$(mdl.css.link).each(function (i, v) {
			mdl.setLinkToClose($(this));
		});
	};

	mdl.setLinkToClose = function ($e) {
		var _$link = $e;
		var _s_open = _$link.attr('data-more');

		if (typeof _s_open != 'undefined' && _s_open) {
			_$link.html(_s_open);
		}// end if
	};

	mdl.setLinkToOpen = function ($e) {
		var _$link = $e;
		var _s_close = _$link.attr('data-close');

		if (typeof _s_close != 'undefined' && _s_close) {
			_$link.html(_s_close);
		}// end if
	};

})(jQuery, jQuery.app.popupBlock);
/**
 * Vysunutí/zasunutí hlavního menu
 */
jQuery.app.submenu = {
	// Selektory
	css: {
		elem: jQuery.app.ids.submenu // hlavní selektor			
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
		console.log('Submenu init...');
		mdl.elem = $(mdl.css.elem);

		//mdl.elem.find('a').bind('click touchstart', mdl.onLinkClick);
	};

	mdl.onLinkClick = function () {
		if (!mdl.a_clickEvent) {
			mdl.a_clickEvent = true;

			var _$link = $(this);
			mdl.elem.find('a').removeClass('active');
			_$link.addClass('active');

			setTimeout(function () {
				mdl.a_clickEvent = false;
			}, mdl.rt_clickEvent);
		}// end if	
	};

	mdl.__public__setToTop = function () {
		if ((mdl.elem != null) && (mdl.elem.length > 0)) {
			mdl.elem.addClass('top-position');
		}// end if
	};

	mdl.__public__setLower = function () {
		if ((mdl.elem != null) && (mdl.elem.length > 0)) {
			mdl.elem.removeClass('top-position');
		}// end if
	};

})(jQuery, jQuery.app.submenu);
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
/**
 * Google mapa
 */
jQuery.app.map = {
	// Selektory
	css: {
		elem: jQuery.app.ids.map, // hlavní selektor	
		mapID: 'jq-map' // ID map conteineru
	},
	elem: null, // element s mapu
	map: null, // objekt mapy
	marker: null, // objekt markeru na mape
	iconFolder: 'images', // slozka s markery
	markerIcon: {
    main: 'pin_point.png'
	},
	resizeTimer: null,
	mapOption: {
		center: {lat: 49.7806598, lng: 18.4296177},
		zoom: 17,
		zoomControl: true,
		disableDefaultUI: true,
		scrollwheel: false,
		disableDoubleClickZoom: true,
		navigationControl: false,
		mapTypeControl: false,
		scaleControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
};

(function ($, mdl) {
	"use strict";

	// Inicializace skriptu
	mdl.init = function () {
		console.log('Map init... ' + mdl.css.elem);

		setTimeout(mdl.loadMap, 997);

		$(window).resize(function () {
			clearTimeout(mdl.resizeTimer);
			mdl.resizeTimer = setTimeout(mdl.setToCenter, 251);
		});
	};

	mdl.loadMap = function () {
		mdl.elem = document.getElementById(mdl.css.mapID);
		mdl.map = new google.maps.Map(mdl.elem, mdl.mapOption);
		//mdl.setPolygon();
		mdl.setMarker();
	};

	mdl.setMarker = function () {
		// Tram marker
		mdl.marker = new google.maps.Marker({
			position: {lat: 49.780704, lng: 18.431812},
			icon: mdl.iconFolder + '/' + mdl.markerIcon.main
		});

		mdl.marker.setMap(mdl.map);
	};

	mdl.setPolygon = function () {
		// Define the LatLng coordinates for the polygon's path.
		var coords = [
			{lat: 50.091164, lng: 14.453703},
			{lat: 50.091653, lng: 14.453435},
			{lat: 50.091900, lng: 14.454563},
			{lat: 50.092147, lng: 14.454450},
			{lat: 50.092181, lng: 14.454629},			
			{lat: 50.092499, lng: 14.454463},
			{lat: 50.092550, lng: 14.454684},
			{lat: 50.092231, lng: 14.454848},
			{lat: 50.092275, lng: 14.455068},
			{lat: 50.091814, lng: 14.455305},
			{lat: 50.091788, lng: 14.455104},
			{lat: 50.091509, lng: 14.455241}			
		];

		// Construct the polygon.
		var polygon = new google.maps.Polygon({
			paths: coords,
			strokeColor: '#FDDB00',
			strokeOpacity: 1,
			strokeWeight: 0,
			fillColor: '#FDDB00',
			fillOpacity: 1
		});
		polygon.setMap(mdl.map);
	};

	mdl.setToCenter = function () {
		mdl.map.panTo(mdl.marker.getPosition());
	};

})(jQuery, jQuery.app.map);
/**
 * Floor map
 */
jQuery.app.floorMap = {
  // Selektory
  css: {
    elem: $.app.ids.floorMap,
    storeBox: '.store-box',
    storePopup: '.jq-floor-map-store-popup'
  },
  elem: null,
  a_clickEvent: false,
  rt_clickEvent: 331,
  mobileWidth: 640, // in px
  classList: [
    'category__fashion',
    'category__shoes',
    'category__jewel',
    'category__service',
    'category__meal',
    'category__home',
    'category__health',
    'category__kids'
  ],
  mapOption: [
    {
      id: 'ocelan-map-1-01',
      type: 'fashion',
      position: ['75%', '14%'] // left, top
    },
    {
      id: 'ocelan-map-1-02',
      type: 'shoes',
      position: ['69%', '15%'] // left, top
    },
    {
      id: 'ocelan-map-1-03',
      type: 'jewel',
      position: ['40%', '15%'] // left, top
    },
    {
      id: 'ocelan-map-1-04',
      type: 'service',
      position: ['50%', '24%'] // left, top
    },
    {
      id: 'ocelan-map-1-05',
      type: 'meal',
      position: ['30%', '27%'] // left, top
    },
    {
      id: 'ocelan-map-1-06',
      type: 'home',
      position: ['58%', '17%'] // left, top
    },
    {
      id: 'ocelan-map-1-07',
      type: 'health',
      position: ['44%', '33%'] // left, top
    },
    {
      id: 'ocelan-map-1-08',
      type: '',
      position: ['84%', '18%'] // left, top
    },
    {
      id: 'ocelan-map-1-09',
      type: 'fashion',
      position: ['63%', '31%'] // left, top
    },
    {
      id: 'ocelan-map-1-10',
      type: 'shoes',
      position: ['27%', '31%'] // left, top
    },
    {
      id: 'ocelan-map-1-11',
      type: 'jewel',
      position: ['66%', '34%'] // left, top
    },
    {
      id: 'ocelan-map-1-12',
      type: 'service',
      position: ['42%', '38%'] // left, top
    },
    {
      id: 'ocelan-map-1-13',
      type: 'meal',
      position: ['73%', '32%'] // left, top
    },
    {
      id: 'ocelan-map-1-14',
      type: 'home',
      position: ['85%', '39%'] // left, top
    },
    {
      id: 'ocelan-map-1-15',
      type: 'health',
      position: ['40%', '41%'] // left, top
    },
    {
      id: 'ocelan-map-1-16',
      type: 'kids',
      position: ['38%', '45%'] // left, top
    },
    {
      id: 'ocelan-map-1-17',
      type: 'fashion',
      position: ['19%', '39%'] // left, top
    },
    {
      id: 'ocelan-map-1-18',
      type: 'shoes',
      position: ['49%', '44%'] // left, top
    },
    {
      id: 'ocelan-map-1-19',
      type: 'jewel',
      position: ['42%', '57%'] // left, top
    },
    {
      id: 'ocelan-map-1-20',
      type: 'service',
      position: ['36%', '56%'] // left, top
    },
    {
      id: 'ocelan-map-1-21',
      type: 'meal',
      position: ['31%', '54%'] // left, top
    },
    {
      id: 'ocelan-map-1-22',
      type: 'home',
      position: ['70%', '60%'] // left, top
    },
    {
      id: 'ocelan-map-1-23',
      type: 'health',
      position: ['40%', '62%'] // left, top
    },
    {
      id: 'ocelan-map-1-24',
      type: 'kids',
      position: ['67%', '66%'] // left, top
    },
    {
      id: 'ocelan-map-1-25',
      type: 'fashion',
      position: ['45%', '72%'] // left, top
    },
    {
      id: 'ocelan-map-1-26',
      type: 'shoes',
      position: ['65%', '72%'] // left, top
    },
    {
      id: 'ocelan-map-1-27',
      type: 'jewel',
      position: ['59%', '77%'] // left, top
    },
    {
      id: 'ocelan-map-1-28',
      type: 'service',
      position: ['83%', '54%'] // left, top
    },
    {
      id: 'ocelan-map-1-29',
      type: 'meal',
      position: ['7%', '45%'] // left, top
    },
    {
      id: 'ocelan-map-0-01',
      type: 'fashion',
      position: ['39%', '25%'] // left, top
    },
    {
      id: 'ocelan-map-0-02',
      type: 'shoes',
      position: ['32%', '59%'] // left, top
    },
    {
      id: 'ocelan-map-0-03',
      type: 'jewel',
      position: ['69%', '11%'] // left, top
    },
    {
      id: 'ocelan-map-0-04',
      type: 'service',
      position: ['95%', '21%'] // left, top
    },
    {
      id: 'ocelan-map-0-05',
      type: 'meal',
      position: ['66%', '20%'] // left, top
    },
    {
      id: 'ocelan-map-0-06',
      type: 'home',
      position: ['76%', '25%'] // left, top
    },
    {
      id: 'ocelan-map-0-07',
      type: 'health',
      position: ['71%', '30%'] // left, top
    },
    {
      id: 'ocelan-map-0-08',
      type: 'kids',
      position: ['74%', '32%'] // left, top
    },
    {
      id: 'ocelan-map-0-09',
      type: 'fashion',
      position: ['86%', '20%'] // left, top
    },
    {
      id: 'ocelan-map-0-10',
      type: 'shoes',
      position: ['85%', '39%'] // left, top
    },
    {
      id: 'ocelan-map-0-11',
      type: 'jewel',
      position: ['61%', '32%'] // left, top
    },
    {
      id: 'ocelan-map-0-12',
      type: 'service',
      position: ['57%', '41%'] // left, top
    },
    {
      id: 'ocelan-map-0-13',
      type: 'meal',
      position: ['54%', '46%'] // left, top
    },
    {
      id: 'ocelan-map-0-14',
      type: 'home',
      position: ['52%', '51%'] // left, top
    },
    {
      id: 'ocelan-map-0-15',
      type: 'health',
      position: ['47%', '61%'] // left, top
    },
    {
      id: 'ocelan-map-0-16',
      type: 'kids',
      position: ['43%', '65%'] // left, top
    },
    {
      id: 'ocelan-map-0-17',
      type: 'fashion',
      position: ['84%', '49%'] // left, top
    },
    {
      id: 'ocelan-map-0-18',
      type: 'shoes',
      position: ['63%', '43%'] // left, top
    },
    {
      id: 'ocelan-map-0-19',
      type: 'jewel',
      position: ['72%', '42%'] // left, top
    },
    {
      id: 'ocelan-map-0-20',
      type: 'service',
      position: ['81%', '60%'] // left, top
    },
    {
      id: 'ocelan-map-0-21',
      type: 'meal',
      position: ['81%', '70%'] // left, top
    },
    {
      id: 'ocelan-map-0-22',
      type: 'home',
      position: ['86%', '64%'] // left, top
    },
    {
      id: 'ocelan-map-0-23',
      type: 'health',
      position: ['60%', '67%'] // left, top
    },
    {
      id: 'ocelan-map-0-24',
      type: 'kids',
      position: ['57%', '70%'] // left, top
    },
    {
      id: 'ocelan-map-0-25',
      type: 'fashion',
      position: ['56%', '73%'] // left, top
    },
    {
      id: 'ocelan-map-0-26',
      type: 'shoes',
      position: ['69%', '77%'] // left, top
    },
    {
      id: 'ocelan-map--1-01',
      type: 'fashion',
      position: ['52%', '13%'] // left, top
    },
    {
      id: 'ocelan-map--1-02',
      type: 'shoes',
      position: ['39%', '11%'] // left, top
    },
    {
      id: 'ocelan-map--1-03',
      type: 'jewel',
      position: ['34%', '21%'] // left, top
    },
    {
      id: 'ocelan-map--1-04',
      type: 'service',
      position: ['44%', '27%'] // left, top
    },
    {
      id: 'ocelan-map--1-05',
      type: 'meal',
      position: ['48%', '27%'] // left, top
    },
    {
      id: 'ocelan-map--1-06',
      type: 'home',
      position: ['53%', '30%'] // left, top
    },
    {
      id: 'ocelan-map--1-07',
      type: 'health',
      position: ['26%', '37%'] // left, top
    },
    {
      id: 'ocelan-map--1-08',
      type: 'kids',
      position: ['47%', '49%'] // left, top
    },
    {
      id: 'ocelan-map--1-09',
      type: 'fashion',
      position: ['53%', '54%'] // left, top
    },
    {
      id: 'ocelan-map--1-10',
      type: 'shoes',
      position: ['65%', '20%'] // left, top
    },
    {
      id: 'ocelan-map--1-11',
      type: 'jewel',
      position: ['60%', '31%'] // left, top
    },
    {
      id: 'ocelan-map--1-12',
      type: 'service',
      position: ['75%', '23%'] // left, top
    },
    {
      id: 'ocelan-map--1-13',
      type: 'meal',
      position: ['70%', '31%'] // left, top
    },
    {
      id: 'ocelan-map--1-14',
      type: 'home',
      position: ['67%', '38%'] // left, top
    },
    {
      id: 'ocelan-map--1-15',
      type: 'health',
      position: ['82%', '36%'] // left, top
    },
    {
      id: 'ocelan-map--1-16',
      type: 'kids',
      position: ['71%', '41%'] // left, top
    },
    {
      id: 'ocelan-map--1-17',
      type: 'fashion',
      position: ['75%', '51%'] // left, top
    },
    {
      id: 'ocelan-map--1-18',
      type: 'shoes',
      position: ['62%', '61%'] // left, top
    },
  ]
};

(function ($, mdl) {
  "use strict";

  // Inicializace skriptu
  mdl.init = function () {
    console.log('Init floor map...');
    mdl.elem = $(mdl.css.elem);

    if (mdl.isElement()) {

      setTimeout(function () {
        mdl.initMap();
      }, 37);
    } // end if    
  };

  mdl.isElement = function () {
    if (mdl.elem && mdl.elem.length > 0) {
      return true;
    } else {
      return false;
    }// end if
  };

  mdl.initMap = function () {
    console.log('Init floor map element...');

    mdl.useMapOption();

    $(mdl.css.storeBox).bind('mouseenter', mdl.enterStore);
    $(mdl.css.storeBox).bind('mouseleave', mdl.leaveStore);
    $(mdl.css.storePopup).bind('mouseenter', mdl.enterStorePopup);
    $(mdl.css.storePopup).bind('mouseleave', mdl.leaveStorePopup);
    $(mdl.css.storeBox).bind('click', mdl.clickStore);
  };

  mdl.isMobileWidth = function () {
    var _w_width = Number($(window).outerWidth());
    if (_w_width < mdl.mobileWidth) {
      return true;
    }// end if
    return false;
  };

  mdl.clickStore = function (e) {
    //console.log('Click store ...');
    e.preventDefault();
    if (!mdl.a_clickEvent) {
      mdl.a_clickEvent = true;

      var _$store = $(this);
      var _href = _$store.attr('data-url');

      //console.log(_href);

      if (_href && _href.length > 0) {
        window.location.href = _href;
      }// end if

      setTimeout(function () {
        mdl.a_clickEvent = false;
      }, mdl.rt_clickEvent);
    }// end if
  };

  mdl.enterStore = function (e) {
    //console.log('Enter store ...');    
    if (!mdl.isMobileWidth()) {
      var _$item = $(this);
      var _id = _$item.attr('id');

      if (mdl.isActiveStore(_$item)) {
        mdl.setAllStoreActivity(true);
        _$item.removeClass('passive');
        mdl.setStorePopupPassive();
        mdl.setStorePopupActiveByID(_id);
      }// end if  
    }// end if
  };

  mdl.leaveStore = function (e) {
    //console.log('Leave store ...');
    if (!mdl.isMobileWidth()) {
      var _$item = $(this);
      var _id = _$item.attr('id');

      if (mdl.isActiveStore(_$item)) {
        mdl.setAllStoreActivity(false);
        mdl.setStorePopupPassive();
      }// end if  
    }// end if
  };

  mdl.enterStorePopup = function (e) {
    //console.log('Enter store ...');
    if (!mdl.isMobileWidth()) {
      var _$item = $(this);
      var _id = _$item.attr('data-store-id');
      var _$store = $('#' + _id);

      if (mdl.isActiveStore(_$store)) {
        mdl.setAllStoreActivity(true);
        _$store.removeClass('passive');
        mdl.setStorePopupPassive();
        mdl.setStorePopupActiveByID(_id);
      }// end if   
    }// end if
  };

  mdl.leaveStorePopup = function (e) {
    //console.log('Leave store ...');
    if (!mdl.isMobileWidth()) {
      var _$item = $(this);
      var _id = _$item.attr('data-store-id');
      var _$store = $('#' + _id);

      if (mdl.isActiveStore(_$store)) {
        mdl.setAllStoreActivity(false);
        mdl.setStorePopupPassive();
      }// end if   
    }// end if
  };

  mdl.isActiveStore = function ($item) {
    for (var _i = 0; _i < mdl.classList.length; _i++) {
      if ($item.hasClass(mdl.classList[_i])) {
        return true;
      }// end if
    }// end for

    return false;
  };

  mdl.setAllStoreActivity = function (passive) {
    var _passive = true;
    if (typeof passive !== 'undefined') {
      if (!passive) {
        _passive = false;
      }// end if
    }// end if

    if (_passive) {
      $(mdl.css.storeBox).addClass('passive');
    } else {
      $(mdl.css.storeBox).removeClass('passive');
    }// end if
  };

  mdl.setStorePopupPassive = function () {
    var _$item = $(mdl.css.storePopup + '.active');
    if (_$item && _$item.length) {
      _$item.removeClass('active');
    }// end if
  };

  mdl.setStorePopupActiveByID = function (id) {
    $(mdl.css.storePopup + '[data-store-id="' + id + '"]').addClass('active');
  };

  mdl.useMapOption = function () {
    $.each(mdl.mapOption, function (i, v) {
      var _$el = $('#' + v.id);

      switch (v.type) {
        case 'fashion':
          _$el.addClass('category__fashion');
          break;
        case 'shoes':
          _$el.addClass('category__shoes');
          break;
        case 'jewel':
          _$el.addClass('category__jewel');
          break;
        case 'service':
          _$el.addClass('category__service');
          break;
        case 'meal':
          _$el.addClass('category__meal');
          break;
        case 'home':
          _$el.addClass('category__home');
          break;
        case 'health':
          _$el.addClass('category__health');
          break;
        case 'kids':
          _$el.addClass('category__kids');
          break;

        default:

          break;
      }

      mdl.setupPopup(v);
    });
  };

  mdl.setupPopup = function (option) {
    if (option.type !== '') {
      console.log('Setup popup...');
      var _$popup = $(mdl.css.storePopup + '[data-store-id="' + option.id + '"]');

      _$popup.css({
        'left': option.position[0],
        'top': option.position[1]
      });
    }// end if
  };

})(jQuery, jQuery.app.floorMap);
/*
 Inicializace všech javascriptů. Některé se inicializují automaticky vždy, jiné pouze pokud existuje jejich "spouštěč", což je vždy element s konkrétním ID.
 TODO: po nasazení na CMS lze jednotlivé init funkce rozmístit na samostatné stránky, kde budou reálně potřeba
 */
jQuery(document).ready(function ($) {
	"use strict";

	$.app.init('svgLoader'); // Inicializuje SVG loader
	$.app.init('centerImage'); // Inicializuje centrovani obrazku
	$.app.init('centerImage_v2'); // Inicializuje centrovani obrazku v.2
	$.app.init('scrollToAnchor'); // Inicializuje scroll ke kotve
	$.app.init('burgerMenu'); // Inicializuje menu v zahlavi
	$.app.init('languageMenu'); // Inicializuje menu jazyku v zahlavi
	$.app.init('popupBlock'); // Inicializuje vnitrni popup okna s texty
  $.app.init('tab'); // Inicializuje tab
	$.app.init('owlCarousel'); // Inicializuje owl carousel
  $.app.init('multiCarousel'); // Inicializuje multi carousel

	$.app.init('map', $.app.ids.map); // Inicializuje mapu
	$.app.init('menuBar', $.app.ids.menuBar); // Inicializuje menu
	$.app.init('submenu', $.app.ids.submenu); // Inicializuje submenu
  $.app.init('video', $.app.ids.video); // Inicializuje video
  $.app.init('actionBar', $.app.ids.actionBar); // Inicializuje actionBar
  $.app.init('mobileMap', $.app.ids.mobileMap); // Inicializuje mobileMap
  $.app.init('floorMap', $.app.ids.floorMap); // Inicializuje floorMap
});
//# sourceMappingURL=main.js.map