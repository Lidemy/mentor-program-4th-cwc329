/* eslint no-underscore-dangle: 0 */
const request = require('request');
const process = require('process');

const gameName = process.argv[2];
const result = [];
const startPoint = 0;

function printStreams(arr) {
  console.log('result: ', arr.length);
  if (arr.length === 0) {
    console.log('not found.');
  } else {
    arr.forEach((ele) => {
      console.log(ele[1], ele[0]);
    });
  }
}

function searchStreamByGame(arr, name, offset, callback) {
  request.get(
    {
      url: `https://api.twitch.tv/kraken/streams?limit=100&offset=${offset * 100}&game=${name}`,
      headers: {
        'Client-ID': 'l8v669ong3mcmzuafjnny8y0tcj9vp',
        Accept: 'application/vnd.twitchtv.v5+json',
      },
    },
    (error, response, body) => {
      if (error) {
        console.log(error);
        return;
      }
      const jsonChannelData = JSON.parse(body).streams;
      for (let j = 0; j < jsonChannelData.length; j += 1) {
        const channelName = jsonChannelData[j].channel.display_name;
        const channelId = jsonChannelData[j].channel._id;
        arr.push([channelName, channelId]);
      }
      if (offset < 1) {
        searchStreamByGame(arr, name, offset + 1, callback);
      } else {
        callback(arr);
      }
    },
  );
}
searchStreamByGame(result, gameName, startPoint, printStreams);
