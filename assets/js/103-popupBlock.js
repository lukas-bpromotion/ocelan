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