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
	
	example loadDataToCache:
	
	async function() {
		return [
			{
				key: 'key1',
				getData: async () => {
					return {hello: world}
				}
			}
		]
	}
*/
async function set(loadDataToCache, destination) {
	try {
		const dataToCache = await extractData(loadDataToCache);
		
		await Promise.all(
			dataToCache.map( async ({key, getData}) => {
				const data = await getData();
				const stringifiedFileContents = JSON.stringify(data);
				
				const filePath = `${destination}/${key}.json`;
				console.log('Writing data to ', filePath);
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