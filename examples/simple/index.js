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