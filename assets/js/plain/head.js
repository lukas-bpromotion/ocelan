/* Global URL */
var baseUrl = "<?php echo $_SETTING['baseURL']; ?>";
//var G_loadCSS = [];
var G_loadCSS = [/*'https://cdn.rawgit.com/michalsnik/aos/2.1.1/dist/aos.css',*/ /*baseUrl + 'css/style.css'*/];
var G_loadJSIndependent = [
	baseUrl + 'js/jquery-3.2.1.min.js',
	baseUrl + 'js/googlemap.js'
];
var G_loadJSDependentFirst = [baseUrl + 'js/modernizr.min.js', baseUrl + 'js/webfont.js', /*'https://cdn.rawgit.com/michalsnik/aos/2.1.1/dist/aos.js'*/];
var G_loadJSDependentSecond = [baseUrl + 'js/libs.js', baseUrl + 'js/main.js'];
var G_loadFonts = ['Noto+Serif:700,700i', 'Ubuntu:300,400,400i,700&amp;subset=latin-ext'];

/* Load CSS and JS file asynchronously */
loadjs=function(){function n(n,e){n=n.push?n:[n];var t,r,i,o,c=[],s=n.length,h=s;for(t=function(n,t){t.length&&c.push(n),h--,h||e(c)};s--;)r=n[s],i=u[r],i?t(r,i):(o=f[r]=f[r]||[],o.push(t))}function e(n,e){if(n){var t=f[n];if(u[n]=e,t)for(;t.length;)t[0](n,e),t.splice(0,1)}}function t(n,e,r,i){var c,u,f=document,s=r.async,h=(r.numRetries||0)+1,a=r.before||o;i=i||0,/\.css$/.test(n)?(c=!0,u=f.createElement("link"),u.rel="stylesheet",u.href=n):(u=f.createElement("script"),u.src=n,u.async=void 0===s||s),u.onload=u.onerror=u.onbeforeload=function(o){var f=o.type[0];if(c&&"hideFocus"in u)try{u.sheet.cssText.length||(f="e")}catch(n){f="e"}return"e"==f&&(i+=1,i<h)?t(n,e,r,i):void e(n,f,o.defaultPrevented)},a(n,u),f.head.appendChild(u)}function r(n,e,r){n=n.push?n:[n];var i,o,c=n.length,u=c,f=[];for(i=function(n,t,r){if("e"==t&&f.push(n),"b"==t){if(!r)return;f.push(n)}c--,c||e(f)},o=0;o<u;o++)t(n[o],i,r)}function i(n,t,i){var u,f;if(t&&t.trim&&(u=t),f=(u?i:t)||{},u){if(u in c)throw"LoadJS";c[u]=!0}r(n,function(n){n.length?(f.error||o)(n):(f.success||o)(),e(u,n)},f)}var o=function(){},c={},u={},f={};return i.ready=function(e,t){return n(e,function(n){n.length?(t.error||o)(n):(t.success||o)()}),i},i.done=function(n){e(n,[])},i.reset=function(){c={},u={},f={}},i.isDefined=function(n){return n in c},i}();

/* Loading functions */
function _loadFiles() {
	_loadCSSFiles();
	_loadFonts();
	_loadJSIndependent();
}
function _loadCSSFiles() {
	if (G_loadCSS.length > 0) {
		loadjs(G_loadCSS, {
			numRetries: 3
		});
	}
}
function _loadJSIndependent() {
	if (G_loadJSIndependent.length > 0) {
		loadjs(G_loadJSIndependent, {
			numRetries: 3,
			success: function() {
				_loadJSDependentFirst();
			}
		});
	} else {
		_loadJSDependentFirst();
	}
}
function _loadJSDependentFirst() {	
	_loadCSSFiles();
	if (G_loadJSDependentFirst.length > 0) {
		loadjs(G_loadJSDependentFirst, {
			numRetries: 3,
			success: function() {
				_loadJSDependentSecond();
			}
		});
	} else {
		_loadJSDependentSecond();
	}
}
function _loadJSDependentSecond() {
	if (G_loadJSDependentSecond.length > 0) {
		loadjs(G_loadJSDependentSecond, {
			numRetries: 3,
			async: false
		});
	}
}
function _loadFonts() {
	if (G_loadFonts.length > 0) {
		WebFontConfig = {
			google: {
				families: G_loadFonts
			},
			timeout: 2000
		};
	}
}
_loadFiles();