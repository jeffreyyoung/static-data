const load = require('./../load');

class Loader {
	constructor(prefix = '/') {
		this.cache = {};
		this.prefix = prefix;
	}
	
	async load(key) {
		let cache = this.cache;
		if (!cache[key]) {
			cache[key] = await load(this.prefix, key);
		}
		return cache[key];
	}
}

module.exports = function createLoader(prefix) {
	return new Loader(prefix);
}