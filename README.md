[![Build Status](https://travis-ci.org/jeffreyyoung/static-data.svg?branch=master)](https://travis-ci.org/jeffreyyoung/static-data)
# static-data

A library for saving data to json, and then fetching that data in your application

#### installation

`npm i --save static-data`

#### simple usage `set`
```javascript
const sd = require('static-data');
const fetch = require('node-fetch');

const filesToSet = [
  {
    path: './public/yipee.json',
    getData: async () => {
      return {
        food: 'yummy'
      }
    }
  }, {
    path: './public/gitHubUsers.json',
    getData: async () => {
      const res = await fetch('https://api.github.com/users')
      const json = await res.json();
      return json;
    }
  }
]

sd.set(filesToSet);
```

after running the above code, the two following files will be created:
[./public/yipee.json](https://github.com/jeffreyyoung/static-data/blob/master/examples/simple/public/yipee.json)
[./public/gitHubUsers.json](https://github.com/jeffreyyoung/static-data/blob/master/examples/simple/public/gitHubUsers.json)

#### less simple usage `set`
```javascript
const sd = require('static-data');
const fetch = require('node-fetch');

const getFiles = async () => {
  const res = await fetch('https://api.github.com/users')
  const gitHubUsersJson = await res.json();

  const individualUsersJson = await Promise.all(
    gitHubUsersJson.map(user => ({
      path: `/users/${user.id}`,
      getData: async() => {
        const request = await        fetch(`https://api.github.com/users/${user.id}`);
        return await request.json();
      }
    }))
  )

  return [
    {
      path: '/users',
      getData: gitHubUsersJson
    },
    ...individualUsersJson
  ]
}

sd.set(getFiles, {
	pathPrefix: './public',
	pathSuffix: '.json'
});
```
After running the above code the following files will be created:
`./public/users.json`, `./public/users/1.json`, `./public/users/2.json`, ...etc

#### usage `fetch`
```javascript
const res = await fetch('http://localhost:3000/public/gitHubUsers.json')
const json = await res.json();
```

#### usage `loader`

```javascript
const loader = require('static-data').loader('http://localhost:3000/public/');
 
const githubUsers = await loader.load('gitHubUsers')
const yipee = await loader.load('yipee');
```
