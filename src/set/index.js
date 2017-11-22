const fs = require('fs');
const path = require('path');

async function extractData(arg) {
	if (arg instanceof Function) {
		return await arg();
	} else {
		return arg;
	}
}

/**
	example destination: './data'
	
	example getData:
	
	async function() {
		return [
			{
				path: 'key1',
				getData: async () => {
					return {hello: world}
				}
			}
		]
	}
*/
const defaultOptions = {
	pathPrefix: '',
	pathSuffix: ''
}

async function set(getData, optionsIn) {
	const opts = {...defaultOptions, ...optionsIn};
	try {
		
		const filesToCache = await extractData(getData);
		
		await Promise.all(
			filesToCache.map( async ({path, getData}) => {
				const data = await extractData(getData);
				const stringifiedFileContents = JSON.stringify(data);
				
				const filePath = opts.pathPrefix+path+opts.pathSuffix;
				await writeFile(filePath, stringifiedFileContents);
			})
		);
	} catch (e) {
		console.error('There was an error');
		throw e;
	}
	console.log('Finished');
}

async function writeFile(filePath, stringifiedFile) {
	console.log('Writing file: ', filePath);
	await ensureDirectoryExistence(filePath);
	return new Promise( (resolve, reject) => {
		fs.writeFile(filePath, stringifiedFile, err => {
			if (err) {
				reject(err);
			}
			resolve(true);
		})
	})
}

function ensureDirectoryExistence(filePath) {
	return new Promise( (resolve, reject) => {
		const dirname = path.dirname(filePath);
		
		fs.mkdir(dirname, err => {
			if (!err || (err && err.code === 'EEXIST') ) {
				resolve();
			} else {
				reject(err);
			}
		})
	});
}

module.exports = set;