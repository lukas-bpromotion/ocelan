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