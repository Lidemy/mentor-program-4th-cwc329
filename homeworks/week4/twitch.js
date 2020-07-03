/* eslint no-underscore-dangle: 0 */
const request = require('request');
const process = require('process');

const gameName = process.argv[2];
const result = [];

function searchStreamByGame(arr, name) {
  for (let i = 0; i <= 100; i += 100) {
    request.get(
      {
        url: `https://api.twitch.tv/kraken/streams?limit=100&offset=${i}&game=${name}`,
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
          console.log(channelName, channelId);
          arr.push([channelName, channelId]);
        }
      },
    );
  }
}
searchStreamByGame(result, gameName);
