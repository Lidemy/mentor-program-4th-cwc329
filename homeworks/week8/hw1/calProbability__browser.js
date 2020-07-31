/* eslint no-undef: 0 */
/* eslint no-restricted-syntax: 0 */

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
    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        const { prize } = JSON.parse(request.response);
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
    };
    request.open('GET', ApiEndpoint, true);
    request.send();
  } else {
    for (const [key, value] of Object.entries(observation)) {
      console.log(key, value / num);
    }
  }
}

calProbability(num);
