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