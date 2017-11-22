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