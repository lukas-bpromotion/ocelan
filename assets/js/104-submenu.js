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