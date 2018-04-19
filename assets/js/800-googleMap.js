/**
 * Google mapa
 */
jQuery.app.map = {
	// Selektory
	css: {
		elem: jQuery.app.ids.map, // hlavní selektor	
		mapID: 'jq-map' // ID map conteineru
	},
	elem: null, // element s mapu
	map: null, // objekt mapy
	marker: null, // objekt markeru na mape
	iconFolder: 'images', // slozka s markery
	markerIcon: {
    main: 'pin_point.png'
	},
	resizeTimer: null,
	mapOption: {
		center: {lat: 49.7806598, lng: 18.4296177},
		zoom: 17,
		zoomControl: true,
		disableDefaultUI: true,
		scrollwheel: false,
		disableDoubleClickZoom: true,
		navigationControl: false,
		mapTypeControl: false,
		scaleControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
};

(function ($, mdl) {
	"use strict";

	// Inicializace skriptu
	mdl.init = function () {
		console.log('Map init... ' + mdl.css.elem);

		setTimeout(mdl.loadMap, 997);

		$(window).resize(function () {
			clearTimeout(mdl.resizeTimer);
			mdl.resizeTimer = setTimeout(mdl.setToCenter, 251);
		});
	};

	mdl.loadMap = function () {
		mdl.elem = document.getElementById(mdl.css.mapID);
		mdl.map = new google.maps.Map(mdl.elem, mdl.mapOption);
		//mdl.setPolygon();
		mdl.setMarker();
	};

	mdl.setMarker = function () {
		// Tram marker
		mdl.marker = new google.maps.Marker({
			position: {lat: 49.780704, lng: 18.431812},
			icon: mdl.iconFolder + '/' + mdl.markerIcon.main
		});

		mdl.marker.setMap(mdl.map);
	};

	mdl.setPolygon = function () {
		// Define the LatLng coordinates for the polygon's path.
		var coords = [
			{lat: 50.091164, lng: 14.453703},
			{lat: 50.091653, lng: 14.453435},
			{lat: 50.091900, lng: 14.454563},
			{lat: 50.092147, lng: 14.454450},
			{lat: 50.092181, lng: 14.454629},			
			{lat: 50.092499, lng: 14.454463},
			{lat: 50.092550, lng: 14.454684},
			{lat: 50.092231, lng: 14.454848},
			{lat: 50.092275, lng: 14.455068},
			{lat: 50.091814, lng: 14.455305},
			{lat: 50.091788, lng: 14.455104},
			{lat: 50.091509, lng: 14.455241}			
		];

		// Construct the polygon.
		var polygon = new google.maps.Polygon({
			paths: coords,
			strokeColor: '#FDDB00',
			strokeOpacity: 1,
			strokeWeight: 0,
			fillColor: '#FDDB00',
			fillOpacity: 1
		});
		polygon.setMap(mdl.map);
	};

	mdl.setToCenter = function () {
		mdl.map.panTo(mdl.marker.getPosition());
	};

})(jQuery, jQuery.app.map);