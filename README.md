# static-data

A library for saving data to json, and then fetching that data from your application

#### installation

`npm i --save static-data`

#### usage
```javascript
const sd = require('static-data');
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

after running the above code, the two following files will be created:
[./public/yipee.json](https://github.com/jeffreyyoung/static-data/blob/master/examples/simple/public/yipee.json)
[./public/gitHubUsers.json](https://github.com/jeffreyyoung/static-data/blob/master/examples/simple/public/gitHubUsers.json)

