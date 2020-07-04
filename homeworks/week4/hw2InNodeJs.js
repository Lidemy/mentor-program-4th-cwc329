/* eslint no-restricted-syntax: 0 */
const https = require('https');
const process = require('process');
const querystring = require('querystring');

const usersCommand = process.argv[2];
function options(action, apiPath, headers = { connection: 'keep-alive' }) {
  const option = {
    hostname: 'lidemy-book-store.herokuapp.com',
    port: 443,
    path: apiPath,
    method: action,
    headers,
  };
  return option;
}

function readBooks(method, path) {
  const option = options(method, path);
  const req = https.request(option, (res) => {
    res.on('data', (chunky) => {
      const booksData = JSON.parse(chunky);
      if (booksData.id === undefined) {
        return console.log('book not found.');
      }
      if (booksData.name === undefined) {
        return console.log('id without a book name.');
      }
      return console.log(booksData.name);
    });
  });
  // Write data to request body
  req.write('');
  req.end();

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
}

function listBooks(method, path) {
  const option = options(method, path);
  const req = https.request(option, (res) => {
    res.on('data', (chunky) => {
      const booksData = JSON.parse(chunky);
      for (const ele of booksData) {
        console.log(ele.id, ele.name);
      }
    });
  });
  // Write data to request body
  req.write('');
  req.end();

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
}

function deleteBooks(method, path) {
  const option = options(method, path);
  const req = https.request(option, (res) => {
    res.on('data', (chunky) => {
      const booksData = JSON.parse(chunky);
      if (booksData.name === undefined) {
        console.log('book deleted.');
      }
    });
  });
  // Write data to request body
  req.write('');
  req.end();

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
}

function createBooks(method, path) {
  const newBook = querystring.stringify({
    name: `${process.argv[3]}`,
  });
  const reqHeaders = {
    connection: 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(newBook),
  };
  const option = options(method, path, reqHeaders);
  const req = https.request(option, (res) => {
    res.on('data', (chunky) => {
      const booksData = JSON.parse(chunky);
      console.log(`book created.\nid: ${booksData.id}, name: ${booksData.name}`);
    });
  });
  // Write data to request body
  req.write(newBook);
  req.end();

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
}

function updateBooks(method, path) {
  const updateBook = querystring.stringify({
    name: `${process.argv[4]}`,
  });
  const reqHeaders = {
    type: 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(updateBook),
  };
  const option = options(method, path, reqHeaders);
  const req = https.request(option, (res) => {
    res.on('data', (chunky) => {
      const booksData = JSON.parse(chunky);
      console.log(`book info updated.\nid: ${booksData.id}, name: ${booksData.name}`);
    });
  });
  // Write data to request body
  req.write(updateBook);
  req.end();

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
}

switch (usersCommand) {
  case 'read':
    readBooks('GET', `/books/${process.argv[3]}`);
    break;
  case 'list':
    listBooks('GET', '/books?_limit=20');
    break;
  case 'delete':
    deleteBooks('DELETE', `/books/${process.argv[3]}`);
    break;
  case 'create':
    createBooks('POST', '/books');
    break;
  case 'update':
    updateBooks('PATCH', `/books/${process.argv[3]}`);
    break;
  default:
    console.log(
      `no such command as ${usersCommand},\nplease try read, list, delete, create or update instead.`,
    );
}
