module.exports = class Loader {
	constructor(prefix = '/') {
		this.cache = {};
	}
	
	async load(key) {
		let cache = this.cache;
		if (!cache[key]) {
			const url = prefix+key+'.json';
			const res = await fetch(url);
			const json = await res.json();
			cache[key] = json;
		}
		return cache[key];
	}
}