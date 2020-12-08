const apiEndpoint = 'https://student-json-api.lidemy.me';

async function getPosts({ id, querystrings }) {
  let requestUrl = `${apiEndpoint}/posts`;
  if (id) {
    requestUrl += `/${id}`;
  };
  requestUrl += '?';
  for (const querystring in querystrings) {
    requestUrl += `_${querystring}=${querystrings[querystring]}&`
  }
  requestUrl = requestUrl.slice(0, requestUrl.length - 1);
  const response = await fetch(requestUrl)
  return response;
}

async function addPost({token, data}) {
  const requestUrl = `${apiEndpoint}/posts`;
  const options = {
    method: 'POST',
    headers: {
      'authorization': `Bearer ${token}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(data),
  }
  const response = await fetch(requestUrl, options);
  const result = await response.json();
  return result;
}

async function login({ username, password }) {
  const requestUrl = `${apiEndpoint}/login`;
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  }
  const response = await fetch(requestUrl, options);
  const result = await response.json();
  return result;
}

async function getUserData({ token }) {
  if (!token) {
    return {};
  };
  const requestUrl = `${apiEndpoint}/me`;
  const headers = {
    'authorization': `Bearer ${token}`
  };
  const response = await fetch(requestUrl, { headers });
  const data = await response.json();
  return data;
}

async function register({ username, password, nickname }) {
  const requestUrl = `${apiEndpoint}/register`;
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password,
      nickname
    })
  };
  const response = await fetch(requestUrl, options);
  const result = await response.json();
  return result;
}

export {
  getPosts,
  addPost,
  login,
  getUserData,
  register
}