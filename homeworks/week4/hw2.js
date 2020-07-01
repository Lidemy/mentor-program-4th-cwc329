const request = require('request');

const process = require('process');

const action = process.argv[2];
switch (action) {
  case 'read':
    request.get(
      `https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
      (error, response, body) => {
        const json = JSON.parse(body);
        console.log(json.name);
      },
    );
    break;
  case 'list':
    request.get(
      'https://lidemy-book-store.herokuapp.com/books?_limit=20',
      (error, response, body) => {
        const json = JSON.parse(body);
        for (let i = 0; i < json.length; i += 1) {
          console.log(json[i].id, json[i].name);
        }
      },
    );
    break;
  case 'delete':
    request.delete(
      `https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
      (error, response) => {
        console.log(response.statusCode);
      },
    );
    break;
  case 'create':
    request.post(
      {
        url: 'https://lidemy-book-store.herokuapp.com/books',
        form: {
          name: process.argv[3],
        },
      },
      (error, response, body) => {
        const json = JSON.parse(body);
        console.log(json);
      },
    );
    break;
  case 'update':
    request.patch(
      {
        url: `https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
        form: {
          name: process.argv[4],
        },
      },
      (error, response, body) => {
        const json = JSON.parse(body);
        console.log(json);
      },
    );
    break;
  default:
    console.log(`no such command as ${action}`);
}
