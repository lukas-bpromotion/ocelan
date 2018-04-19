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