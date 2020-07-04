/* eslint no-restricted-syntax: 0 */
const https = require('https');
const process = require('process');
const querystring = require('querystring');

const usersCommand = process.argv[2];
function options(action, apiPath, headers = { connection: 'keep-alive' }) {
  const option = {
    hostname: 'lidemy-book-store.herokuapp.com',
    port: 443,
    path: `/books${apiPath}`,
    method: action,
    headers,
  };
  return option;
}

function readBooks(id) {
  const method = 'GET';
  const path = `/${id}`;
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
  req.end();

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
}

function listBooks(extraInput = '20') {
  const method = 'GET';
  const path = `?_limit=${extraInput}`;
  const option = options(method, path);
  const req = https.request(option, (res) => {
    res.on('data', (chunky) => {
      const booksData = JSON.parse(chunky);
      for (const ele of booksData) {
        console.log(ele.id, ele.name);
      }
    });
  });
  req.end();

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
}

function deleteBooks(id) {
  const method = 'DELETE';
  const path = `/${id}`;
  const option = options(method, path);
  const req = https.request(option, (res) => {
    res.on('data', (chunky) => {
      const booksData = JSON.parse(chunky);
      if (booksData.name === undefined) {
        console.log('book deleted.');
      }
    });
  });
  req.end();

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
}

function createBooks(bookName) {
  const method = 'POST';
  const path = '';
  const newBook = querystring.stringify({
    name: bookName,
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

function updateBooks(bookId, updateName) {
  const method = 'PATCH';
  const path = `/${bookId}`;
  const updateBook = querystring.stringify({
    name: updateName,
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
    readBooks(process.argv[3]);
    break;
  case 'list':
    listBooks(process.argv[3]);
    break;
  case 'delete':
    deleteBooks(process.argv[3]);
    break;
  case 'create':
    createBooks(process.argv[3]);
    break;
  case 'update':
    updateBooks(process.argv[3], process.argv[4]);
    break;
  default:
    console.log(
      `no such command as ${usersCommand},\nplease try read, list, delete, create or update instead.`,
    );
}
