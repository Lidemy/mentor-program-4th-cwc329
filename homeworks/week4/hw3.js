const request = require('request');

const process = require('process');

request(
  {
    url: `https://restcountries.eu/rest/v2/name/${process.argv[2]}`,
  },
  (error, response, body) => {
    const jsonNations = JSON.parse(body);
    if (jsonNations.message === 'Not Found') {
      console.log('找不到國家資訊');
    }
    for (let i = 0; i < jsonNations.length; i += 1) {
      console.log(`
      ============
      國家：${jsonNations[i].name}
      首都：${jsonNations[i].capital}
      貨幣：${jsonNations[i].currencies[0].code}
      國碼：${jsonNations[i].callingCodes}
      `);
    }
  },
);
