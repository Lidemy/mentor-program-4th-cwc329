/* eslint no-restricted-syntax: 0 */
const request = require('request');

const ApiEndpoint = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery';

const observation = {
  FIRST: 0,
  SECOND: 0,
  THIRD: 0,
  NONE: 0,
  ERROR: 0,
};
const num = 10;

function calProbability(counts, callback = calProbability) {
  console.log(counts);
  if (counts > 0) {
    request.get({
      url: ApiEndpoint,
    }, (err, res, body) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const { prize } = JSON.parse(body);
        console.log(prize);
        switch (prize) {
          case 'FIRST':
            observation.FIRST += 1;
            console.log(observation);
            break;
          case 'SECOND':
            observation.SECOND += 1;
            console.log(observation);
            break;
          case 'THIRD':
            observation.THIRD += 1;
            console.log(observation);
            break;
          case 'NONE':
            observation.NONE += 1;
            console.log(observation);
            break;
          default:
            observation.ERROR += 1;
            console.log(observation);
            break;
        }
        if (counts > 0) {
          callback(counts - 1, callback);
        }
      } else {
        callback(counts, callback);
      }
    });
  } else {
    for (const [key, value] of Object.entries(observation)) {
      console.log(key, value / num);
    }
  }
}

calProbability(num);
