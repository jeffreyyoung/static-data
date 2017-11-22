const sd = require('static-data');
const fetch = require('node-fetch');

const getFiles = async () => {
	const res = await fetch('https://api.github.com/users')
	const gitHubUsersJson = await res.json();
	
	const individualUsersJson = await Promise.all(
		gitHubUsersJson.map(user => ({
			path: `/users/${user.id}`,
			getJson: async() => {
				const request = await fetch(`https://api.github.com/users/${user.id}`);
				return await request.json();
			}
		}))
	)
	
	return [
		{
			path: '/users',
			getJson: gitHubUsersJson
		},
		...individualUsersJson
	]
	
	
}

sd.set(getFiles, {
	pathPrefix: './public',
	pathSuffix: '.json'
});