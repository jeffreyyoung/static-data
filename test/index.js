const set = require('./../dist/set')
const fetch = require('node-fetch');

const destination = './public/';

const filesToSet = [
	{
    path: 'yaayyy',
    getJson: async () => {
      const res = await fetch('https://api.github.com/users')
      const json = await res.json();
      return json;
    }
  }
]

set(filesToSet, {
	pathPrefix: './public/',
	pathSuffix: '.json'
});