function loadCSS(filename) {
	var l = document.createElement('link');
	l.rel = 'stylesheet';
	l.href = filename;
	var h = document.getElementsByTagName('head')[0];
	h.parentNode.insertBefore(l, h);
}

function cssList() {
	loadCSS('/css/katalog.css');
	loadCSS('/css/scan.css');
	loadCSS('/css/einstellungen.css');
	loadCSS('/css/panel.css');
	loadCSS('/css/logIn.css');
	loadCSS('/css/icons.css');
	loadCSS('https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i');
	console.log('CSSs lazy loaded.');
}


function loadJS(filename) {
	var s = document.createElement('script');
	s.src = filename;
	var h = document.getElementsByTagName('head')[0];
	h.parentNode.insertBefore(s, h);
}

function jsList() {
	loadJS('/js/scan.js');
	loadJS('/js/einstellungen.js');
	loadJS('/js/katalog.js');
	loadJS('/js/verlauf.js');
	loadJS('https://maps.google.com/maps/api/js?key=AIzaSyBkpYG7CNKFyLhQ2-ABY32Vab_qEX3UZdY');
	console.log('JSs lazy loaded.');
}
window.addEventListener('load', cssList);
window.addEventListener('load', jsList);
