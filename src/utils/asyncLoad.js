export default function (url, callback) {
	const d = document, t = 'script', o = d.createElement(t), s = d.getElementsByTagName(t)[0];
	o.src = url;
	if (callback)
		o.addEventListener('load', function(e) { callback(null, e); }, false);
	s.parentNode.insertBefore(o, s);
}
