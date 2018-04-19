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