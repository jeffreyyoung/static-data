# static-data

A library for saving data to json, and then fetching that data from your application

#### installation

`npm i --save static-data`

#### usage
create a node file like so:
```javascript
const sd = require('static-data-loader');
const fetch = require('node-fetch');

const destination = './public/';

const filesToSet = [
  {
    key: 'yipee',
    getData: async () => {
      return {
        food: 'yummy'
      }
    }
  }, {
		key: 'gitHubUsers',
		getData: async () => {
			const res = await fetch('https://api.github.com/users')
			const json = await res.json();
			return json;
		}
	}
]

sd.set(filesToSet, destination);
```

after running the above file, the two following files will be created:
`./public/yipee.json`
`./public/gitHubUsers.json`
