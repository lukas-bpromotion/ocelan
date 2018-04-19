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