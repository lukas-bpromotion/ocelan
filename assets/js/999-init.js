/*
 Inicializace všech javascriptů. Některé se inicializují automaticky vždy, jiné pouze pokud existuje jejich "spouštěč", což je vždy element s konkrétním ID.
 TODO: po nasazení na CMS lze jednotlivé init funkce rozmístit na samostatné stránky, kde budou reálně potřeba
 */
jQuery(document).ready(function ($) {
	"use strict";

	$.app.init('svgLoader'); // Inicializuje SVG loader
	$.app.init('centerImage'); // Inicializuje centrovani obrazku
	$.app.init('centerImage_v2'); // Inicializuje centrovani obrazku v.2
	$.app.init('scrollToAnchor'); // Inicializuje scroll ke kotve
	$.app.init('burgerMenu'); // Inicializuje menu v zahlavi
	$.app.init('languageMenu'); // Inicializuje menu jazyku v zahlavi
	$.app.init('popupBlock'); // Inicializuje vnitrni popup okna s texty
  $.app.init('tab'); // Inicializuje tab
	$.app.init('owlCarousel'); // Inicializuje owl carousel
  $.app.init('multiCarousel'); // Inicializuje multi carousel

	$.app.init('map', $.app.ids.map); // Inicializuje mapu
	$.app.init('menuBar', $.app.ids.menuBar); // Inicializuje menu
	$.app.init('submenu', $.app.ids.submenu); // Inicializuje submenu
  $.app.init('video', $.app.ids.video); // Inicializuje video
  $.app.init('actionBar', $.app.ids.actionBar); // Inicializuje actionBar
  $.app.init('mobileMap', $.app.ids.mobileMap); // Inicializuje mobileMap
  $.app.init('floorMap', $.app.ids.floorMap); // Inicializuje floorMap
});