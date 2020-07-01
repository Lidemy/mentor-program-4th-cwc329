const request = require('request');

request.get(
  {
    url: 'https://api.twitch.tv/kraken/games/top',
    headers: {
      'Client-ID': 'l8v669ong3mcmzuafjnny8y0tcj9vp',
      Accept: 'application/vnd.twitchtv.v5+json',
    },
  },
  (error, response, body) => {
    const jsonTopGames = JSON.parse(body);
    for (let i = 0; i < jsonTopGames.top.length; i += 1) {
      console.log(
        jsonTopGames.top[i].viewers,
        jsonTopGames.top[i].game.name,
      );
    }
  },
);
