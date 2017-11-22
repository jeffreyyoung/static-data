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
	
	example getFiles:
	
	async function() {
		return [
			{
				path: 'key1',
				getJson: async () => {
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

async function set(getFiles, optionsIn) {
	const opts = {...defaultOptions, ...optionsIn};
	try {
		
		const filesToCache = await extractData(getFiles);
		
		await Promise.all(
			filesToCache.map( async ({path, getJson}) => {
				const data = await extractData(getJson);
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