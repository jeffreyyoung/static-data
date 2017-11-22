[![Build Status](https://travis-ci.org/jeffreyyoung/write-json-files.svg?branch=master)](https://travis-ci.org/jeffreyyoung/write-json-files)
# write-json-files

A library for saving data to json, and then fetching that data in your application

#### installation

`npm i --save write-json-files`

#### simple usage `set`
```javascript
const sd = require('write-json-files');
const fetch = require('node-fetch');

const filesToSet = [
  {
    path: './public/yipee.json',
    getJson: async () => {
      return {
        food: 'yummy'
      }
    }
  }, {
    path: './public/gitHubUsers.json',
    getJson: async () => {
      const res = await fetch('https://api.github.com/users')
      const json = await res.json();
      return json;
    }
  }
]

sd.set(filesToSet);
```

after running the above code, the two following files will be created:
[./public/yipee.json](https://github.com/jeffreyyoung/write-json-files/blob/master/examples/simple/public/yipee.json)
[./public/gitHubUsers.json](https://github.com/jeffreyyoung/write-json-files/blob/master/examples/simple/public/gitHubUsers.json)

#### less simple usage `set`
```javascript
const sd = require('write-json-files');
const fetch = require('node-fetch');

const getUsers = async () => {
  const res = await fetch('https://api.github.com/users');
  return await res.json();
}

const getUser = async (userId) => {
  const res = await fetch(`https://api.github.com/users/${user.id}`);
  return await res.json();
}

const getFiles = async () => {
  const gitHubUsers = await getUsers();
  return [
    {
      path: '/users',
      getJson: gitHubUsers
    },
    ...gitHubUsers.map(({id}) => ({
      path: `/users/${id}`,
      getJson: () => getUser(id)
    }))
  ]
}

sd.set(getFiles, {
	pathPrefix: './public',
	pathSuffix: '.json'
});
```
After running the above code the following files will be created:
`./public/users.json`, `./public/users/1.json`, `./public/users/2.json`, ...etc

Later on in your application you can request your data `fetch`
```javascript
const res = await fetch('http://localhost:3000/public/users.json')
const users = await res.json();

const user1Res = await fetch('http://localhost:3000/public/users/1.json')
const user1 = await user1Res.json();
```
