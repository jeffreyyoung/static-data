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