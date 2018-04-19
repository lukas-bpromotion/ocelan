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