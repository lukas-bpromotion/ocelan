/**
 * Floor map
 */
jQuery.app.floorMap = {
  // Selektory
  css: {
    elem: $.app.ids.floorMap,
    storeBox: '.store-box',
    storePopup: '.jq-floor-map-store-popup'
  },
  elem: null,
  a_clickEvent: false,
  rt_clickEvent: 331,
  mobileWidth: 640, // in px
  classList: [
    'category__fashion',
    'category__shoes',
    'category__jewel',
    'category__service',
    'category__meal',
    'category__home',
    'category__health',
    'category__kids'
  ],
  mapOption: [
    {
      id: 'ocelan-map-1-01',
      type: 'fashion',
      position: ['75%', '14%'] // left, top
    },
    {
      id: 'ocelan-map-1-02',
      type: 'shoes',
      position: ['69%', '15%'] // left, top
    },
    {
      id: 'ocelan-map-1-03',
      type: 'jewel',
      position: ['40%', '15%'] // left, top
    },
    {
      id: 'ocelan-map-1-04',
      type: 'service',
      position: ['50%', '24%'] // left, top
    },
    {
      id: 'ocelan-map-1-05',
      type: 'meal',
      position: ['30%', '27%'] // left, top
    },
    {
      id: 'ocelan-map-1-06',
      type: 'home',
      position: ['58%', '17%'] // left, top
    },
    {
      id: 'ocelan-map-1-07',
      type: 'health',
      position: ['44%', '33%'] // left, top
    },
    {
      id: 'ocelan-map-1-08',
      type: '',
      position: ['84%', '18%'] // left, top
    },
    {
      id: 'ocelan-map-1-09',
      type: 'fashion',
      position: ['63%', '31%'] // left, top
    },
    {
      id: 'ocelan-map-1-10',
      type: 'shoes',
      position: ['27%', '31%'] // left, top
    },
    {
      id: 'ocelan-map-1-11',
      type: 'jewel',
      position: ['66%', '34%'] // left, top
    },
    {
      id: 'ocelan-map-1-12',
      type: 'service',
      position: ['42%', '38%'] // left, top
    },
    {
      id: 'ocelan-map-1-13',
      type: 'meal',
      position: ['73%', '32%'] // left, top
    },
    {
      id: 'ocelan-map-1-14',
      type: 'home',
      position: ['85%', '39%'] // left, top
    },
    {
      id: 'ocelan-map-1-15',
      type: 'health',
      position: ['40%', '41%'] // left, top
    },
    {
      id: 'ocelan-map-1-16',
      type: 'kids',
      position: ['38%', '45%'] // left, top
    },
    {
      id: 'ocelan-map-1-17',
      type: 'fashion',
      position: ['19%', '39%'] // left, top
    },
    {
      id: 'ocelan-map-1-18',
      type: 'shoes',
      position: ['49%', '44%'] // left, top
    },
    {
      id: 'ocelan-map-1-19',
      type: 'jewel',
      position: ['42%', '57%'] // left, top
    },
    {
      id: 'ocelan-map-1-20',
      type: 'service',
      position: ['36%', '56%'] // left, top
    },
    {
      id: 'ocelan-map-1-21',
      type: 'meal',
      position: ['31%', '54%'] // left, top
    },
    {
      id: 'ocelan-map-1-22',
      type: 'home',
      position: ['70%', '60%'] // left, top
    },
    {
      id: 'ocelan-map-1-23',
      type: 'health',
      position: ['40%', '62%'] // left, top
    },
    {
      id: 'ocelan-map-1-24',
      type: 'kids',
      position: ['67%', '66%'] // left, top
    },
    {
      id: 'ocelan-map-1-25',
      type: 'fashion',
      position: ['45%', '72%'] // left, top
    },
    {
      id: 'ocelan-map-1-26',
      type: 'shoes',
      position: ['65%', '72%'] // left, top
    },
    {
      id: 'ocelan-map-1-27',
      type: 'jewel',
      position: ['59%', '77%'] // left, top
    },
    {
      id: 'ocelan-map-1-28',
      type: 'service',
      position: ['83%', '54%'] // left, top
    },
    {
      id: 'ocelan-map-1-29',
      type: 'meal',
      position: ['7%', '45%'] // left, top
    },
    {
      id: 'ocelan-map-0-01',
      type: 'fashion',
      position: ['39%', '25%'] // left, top
    },
    {
      id: 'ocelan-map-0-02',
      type: 'shoes',
      position: ['32%', '59%'] // left, top
    },
    {
      id: 'ocelan-map-0-03',
      type: 'jewel',
      position: ['69%', '11%'] // left, top
    },
    {
      id: 'ocelan-map-0-04',
      type: 'service',
      position: ['95%', '21%'] // left, top
    },
    {
      id: 'ocelan-map-0-05',
      type: 'meal',
      position: ['66%', '20%'] // left, top
    },
    {
      id: 'ocelan-map-0-06',
      type: 'home',
      position: ['76%', '25%'] // left, top
    },
    {
      id: 'ocelan-map-0-07',
      type: 'health',
      position: ['71%', '30%'] // left, top
    },
    {
      id: 'ocelan-map-0-08',
      type: 'kids',
      position: ['74%', '32%'] // left, top
    },
    {
      id: 'ocelan-map-0-09',
      type: 'fashion',
      position: ['86%', '20%'] // left, top
    },
    {
      id: 'ocelan-map-0-10',
      type: 'shoes',
      position: ['85%', '39%'] // left, top
    },
    {
      id: 'ocelan-map-0-11',
      type: 'jewel',
      position: ['61%', '32%'] // left, top
    },
    {
      id: 'ocelan-map-0-12',
      type: 'service',
      position: ['57%', '41%'] // left, top
    },
    {
      id: 'ocelan-map-0-13',
      type: 'meal',
      position: ['54%', '46%'] // left, top
    },
    {
      id: 'ocelan-map-0-14',
      type: 'home',
      position: ['52%', '51%'] // left, top
    },
    {
      id: 'ocelan-map-0-15',
      type: 'health',
      position: ['47%', '61%'] // left, top
    },
    {
      id: 'ocelan-map-0-16',
      type: 'kids',
      position: ['43%', '65%'] // left, top
    },
    {
      id: 'ocelan-map-0-17',
      type: 'fashion',
      position: ['84%', '49%'] // left, top
    },
    {
      id: 'ocelan-map-0-18',
      type: 'shoes',
      position: ['63%', '43%'] // left, top
    },
    {
      id: 'ocelan-map-0-19',
      type: 'jewel',
      position: ['72%', '42%'] // left, top
    },
    {
      id: 'ocelan-map-0-20',
      type: 'service',
      position: ['81%', '60%'] // left, top
    },
    {
      id: 'ocelan-map-0-21',
      type: 'meal',
      position: ['81%', '70%'] // left, top
    },
    {
      id: 'ocelan-map-0-22',
      type: 'home',
      position: ['86%', '64%'] // left, top
    },
    {
      id: 'ocelan-map-0-23',
      type: 'health',
      position: ['60%', '67%'] // left, top
    },
    {
      id: 'ocelan-map-0-24',
      type: 'kids',
      position: ['57%', '70%'] // left, top
    },
    {
      id: 'ocelan-map-0-25',
      type: 'fashion',
      position: ['56%', '73%'] // left, top
    },
    {
      id: 'ocelan-map-0-26',
      type: 'shoes',
      position: ['69%', '77%'] // left, top
    },
    {
      id: 'ocelan-map--1-01',
      type: 'fashion',
      position: ['52%', '13%'] // left, top
    },
    {
      id: 'ocelan-map--1-02',
      type: 'shoes',
      position: ['39%', '11%'] // left, top
    },
    {
      id: 'ocelan-map--1-03',
      type: 'jewel',
      position: ['34%', '21%'] // left, top
    },
    {
      id: 'ocelan-map--1-04',
      type: 'service',
      position: ['44%', '27%'] // left, top
    },
    {
      id: 'ocelan-map--1-05',
      type: 'meal',
      position: ['48%', '27%'] // left, top
    },
    {
      id: 'ocelan-map--1-06',
      type: 'home',
      position: ['53%', '30%'] // left, top
    },
    {
      id: 'ocelan-map--1-07',
      type: 'health',
      position: ['26%', '37%'] // left, top
    },
    {
      id: 'ocelan-map--1-08',
      type: 'kids',
      position: ['47%', '49%'] // left, top
    },
    {
      id: 'ocelan-map--1-09',
      type: 'fashion',
      position: ['53%', '54%'] // left, top
    },
    {
      id: 'ocelan-map--1-10',
      type: 'shoes',
      position: ['65%', '20%'] // left, top
    },
    {
      id: 'ocelan-map--1-11',
      type: 'jewel',
      position: ['60%', '31%'] // left, top
    },
    {
      id: 'ocelan-map--1-12',
      type: 'service',
      position: ['75%', '23%'] // left, top
    },
    {
      id: 'ocelan-map--1-13',
      type: 'meal',
      position: ['70%', '31%'] // left, top
    },
    {
      id: 'ocelan-map--1-14',
      type: 'home',
      position: ['67%', '38%'] // left, top
    },
    {
      id: 'ocelan-map--1-15',
      type: 'health',
      position: ['82%', '36%'] // left, top
    },
    {
      id: 'ocelan-map--1-16',
      type: 'kids',
      position: ['71%', '41%'] // left, top
    },
    {
      id: 'ocelan-map--1-17',
      type: 'fashion',
      position: ['75%', '51%'] // left, top
    },
    {
      id: 'ocelan-map--1-18',
      type: 'shoes',
      position: ['62%', '61%'] // left, top
    },
  ]
};

(function ($, mdl) {
  "use strict";

  // Inicializace skriptu
  mdl.init = function () {
    console.log('Init floor map...');
    mdl.elem = $(mdl.css.elem);

    if (mdl.isElement()) {

      setTimeout(function () {
        mdl.initMap();
      }, 37);
    } // end if    
  };

  mdl.isElement = function () {
    if (mdl.elem && mdl.elem.length > 0) {
      return true;
    } else {
      return false;
    }// end if
  };

  mdl.initMap = function () {
    console.log('Init floor map element...');

    mdl.useMapOption();

    $(mdl.css.storeBox).bind('mouseenter', mdl.enterStore);
    $(mdl.css.storeBox).bind('mouseleave', mdl.leaveStore);
    $(mdl.css.storePopup).bind('mouseenter', mdl.enterStorePopup);
    $(mdl.css.storePopup).bind('mouseleave', mdl.leaveStorePopup);
    $(mdl.css.storeBox).bind('click', mdl.clickStore);
  };

  mdl.isMobileWidth = function () {
    var _w_width = Number($(window).outerWidth());
    if (_w_width < mdl.mobileWidth) {
      return true;
    }// end if
    return false;
  };

  mdl.clickStore = function (e) {
    //console.log('Click store ...');
    e.preventDefault();
    if (!mdl.a_clickEvent) {
      mdl.a_clickEvent = true;

      var _$store = $(this);
      var _href = _$store.attr('data-url');

      //console.log(_href);

      if (_href && _href.length > 0) {
        window.location.href = _href;
      }// end if

      setTimeout(function () {
        mdl.a_clickEvent = false;
      }, mdl.rt_clickEvent);
    }// end if
  };

  mdl.enterStore = function (e) {
    //console.log('Enter store ...');    
    if (!mdl.isMobileWidth()) {
      var _$item = $(this);
      var _id = _$item.attr('id');

      if (mdl.isActiveStore(_$item)) {
        mdl.setAllStoreActivity(true);
        _$item.removeClass('passive');
        mdl.setStorePopupPassive();
        mdl.setStorePopupActiveByID(_id);
      }// end if  
    }// end if
  };

  mdl.leaveStore = function (e) {
    //console.log('Leave store ...');
    if (!mdl.isMobileWidth()) {
      var _$item = $(this);
      var _id = _$item.attr('id');

      if (mdl.isActiveStore(_$item)) {
        mdl.setAllStoreActivity(false);
        mdl.setStorePopupPassive();
      }// end if  
    }// end if
  };

  mdl.enterStorePopup = function (e) {
    //console.log('Enter store ...');
    if (!mdl.isMobileWidth()) {
      var _$item = $(this);
      var _id = _$item.attr('data-store-id');
      var _$store = $('#' + _id);

      if (mdl.isActiveStore(_$store)) {
        mdl.setAllStoreActivity(true);
        _$store.removeClass('passive');
        mdl.setStorePopupPassive();
        mdl.setStorePopupActiveByID(_id);
      }// end if   
    }// end if
  };

  mdl.leaveStorePopup = function (e) {
    //console.log('Leave store ...');
    if (!mdl.isMobileWidth()) {
      var _$item = $(this);
      var _id = _$item.attr('data-store-id');
      var _$store = $('#' + _id);

      if (mdl.isActiveStore(_$store)) {
        mdl.setAllStoreActivity(false);
        mdl.setStorePopupPassive();
      }// end if   
    }// end if
  };

  mdl.isActiveStore = function ($item) {
    for (var _i = 0; _i < mdl.classList.length; _i++) {
      if ($item.hasClass(mdl.classList[_i])) {
        return true;
      }// end if
    }// end for

    return false;
  };

  mdl.setAllStoreActivity = function (passive) {
    var _passive = true;
    if (typeof passive !== 'undefined') {
      if (!passive) {
        _passive = false;
      }// end if
    }// end if

    if (_passive) {
      $(mdl.css.storeBox).addClass('passive');
    } else {
      $(mdl.css.storeBox).removeClass('passive');
    }// end if
  };

  mdl.setStorePopupPassive = function () {
    var _$item = $(mdl.css.storePopup + '.active');
    if (_$item && _$item.length) {
      _$item.removeClass('active');
    }// end if
  };

  mdl.setStorePopupActiveByID = function (id) {
    $(mdl.css.storePopup + '[data-store-id="' + id + '"]').addClass('active');
  };

  mdl.useMapOption = function () {
    $.each(mdl.mapOption, function (i, v) {
      var _$el = $('#' + v.id);

      switch (v.type) {
        case 'fashion':
          _$el.addClass('category__fashion');
          break;
        case 'shoes':
          _$el.addClass('category__shoes');
          break;
        case 'jewel':
          _$el.addClass('category__jewel');
          break;
        case 'service':
          _$el.addClass('category__service');
          break;
        case 'meal':
          _$el.addClass('category__meal');
          break;
        case 'home':
          _$el.addClass('category__home');
          break;
        case 'health':
          _$el.addClass('category__health');
          break;
        case 'kids':
          _$el.addClass('category__kids');
          break;

        default:

          break;
      }

      mdl.setupPopup(v);
    });
  };

  mdl.setupPopup = function (option) {
    if (option.type !== '') {
      console.log('Setup popup...');
      var _$popup = $(mdl.css.storePopup + '[data-store-id="' + option.id + '"]');

      _$popup.css({
        'left': option.position[0],
        'top': option.position[1]
      });
    }// end if
  };

})(jQuery, jQuery.app.floorMap);