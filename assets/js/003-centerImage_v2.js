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