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