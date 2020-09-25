/* eslint-disable no-restricted-syntax, no-shadow, no-undef, no-use-before-define */


const apiUrl = 'https://api.twitch.tv/kraken';
const clientId = 'l8v669ong3mcmzuafjnny8y0tcj9vp';
const displayTitle = document.querySelector('.display__title');
const moreResultsBtn = document.querySelector('.display__moreResultsBtn');
const results = document.querySelector('.display__results');
const lis = document.querySelector('.navbar__topGames').children;
const resultWidth = 440;
const headers = new Headers({
  'Client-ID': clientId,
  Accept: 'application/vnd.twitchtv.v5+json',
});

let offset = 0;
let lastSearchedText = '';

function twitchApi(options) {
  const path = `/${options.path}`;
  let queryString = '?';
  for (const [key, value] of Object.entries(options.data)) {
    queryString += `${key}=${value}&`;
  }
  queryString = queryString.slice(0, this.length - 1);
  const apiUrl = options.apiUrl + path + queryString;
  const { headers } = options;
  console.log('apiUrl', apiUrl);
  return fetch(apiUrl, {
    headers,
  }).then(data => data.json());
}

$(document).ready(() => {
  pageInit();
});

async function pageInit() {
  await showTopFiveGames();
  showStreamResult();
}

async function showTopFiveGames() {
  const topFiveGames = await getTopFiveGames();
  const arr = topFiveGames.top;
  for (let i = 0; i < arr.length; i += 1) {
    $(`#Game${i}`).text(arr[i].game.name);
  }
}

async function showStreamResult(str) {
  const streams = await getStreamResult(str);
  if (offset === 0) {
    results.innerHTML = '';
  }
  const w = resultWidth;
  const h = Math.floor(w / 16 * 9);
  for (const stream of Object.values(streams.streams)) {
    let previewImgUrl = stream.preview.template;
    previewImgUrl = `${previewImgUrl.slice(0, previewImgUrl.indexOf('{'))}${w}x${h}.jpg`;
    const templateHTML = `<img class="display__result__previewImg" src="${previewImgUrl}"/>
      <div class="display__result__info">
        <img class="display__result__info__channelImg" src="${stream.channel.logo}"/>
        <div class="display__result__info__dicriptions">
          <div class="display__result__info__dicriptions__title">${stream.channel.status}</div>
          <div class="display__result__info__dicriptions__host">${stream.channel.display_name}</div>
        </div>
      </div>
    `;
    const newResult = document.createElement('div');
    newResult.setAttribute('onclick', `window.open('${stream.channel.url}','_blank');`);
    newResult.classList.add('display__result');
    newResult.innerHTML = templateHTML;
    results.appendChild(newResult);
  }
  if (streams.streams.length < 20) {
    moreResultsBtn.classList.add('hide');
  } else {
    moreResultsBtn.classList.remove('hide');
  }
  let shownsearchText;
  if (lastSearchedText) {
    shownsearchText = lastSearchedText;
  } else {
    shownsearchText = 'Most Popular';
  }
  const templateMessage = `These are live streams of "${shownsearchText}"`;
  displayTitle.innerText = templateMessage;
}

function getTopFiveGames() {
  const option = {
    apiUrl,
    path: 'games/top',
    headers,
    data: {
      limit: 5,
    },
  };
  return twitchApi(option);
}

function getStreamResult(str) {
  lastSearchedText = str;
  const data = {
    offset,
    limit: 20,
  };
  if (str) {
    for (let i = 1; i < lis.length; i += 1) {
      if (str === lis[i].innerText) {
        lis[i].classList.add('active');
        break;
      }
    }
    data.game = str;
  }
  const option = {
    apiUrl,
    headers,
    path: 'streams',
    data,
  };
  return twitchApi(option);
}

document.querySelector('.navbar__topGames').addEventListener('click', (e) => {
  offset = 0;
  for (let i = 0; i < lis.length; i += 1) {
    lis[i].classList.remove('active');
  }
  e.target.classList.add('active');
  let gameName;
  if (e.target.id === 'popularStreams') {
    gameName = '';
  } else {
    gameName = e.target.innerText;
  }
  showStreamResult(gameName);
});

document.querySelector('.display__moreResultsBtn').addEventListener('click', () => {
  offset += 20;
  showStreamResult(lastSearchedText);
});
