module.exports = async function load(prefix, key) {
	const res = await fetch(prefix + key +'.json');
	const json = await res.json();
	return json;
}