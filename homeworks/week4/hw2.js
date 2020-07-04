/* eslint consistent-return: 0 */
// 看完範例後將 switch 中的 code 處理換成 function，覺得這樣在閱讀上比較方便。
// 同時也加上錯誤資訊處理
// 變數命名改得更語意化
const request = require('request');
const process = require('process');

const apiUrl = 'https://lidemy-book-store.herokuapp.com/books';

function readBooks(id) {
  request.get(
    {
      url: `${apiUrl}/${id}`,
    },
    (error, response, body) => {
      if (response.statusCode >= 300 || response.statusCode < 200) {
        return console.log(`failed to read the book, status code ${response.statusCode}`);
      }
      const bookData = JSON.parse(body);
      return console.log(bookData.name);
    },
  );
}

function listBooks(extraInput = '20') {
  request.get(
    {
      url: `${apiUrl}?_limit=${extraInput}`,
    },
    (error, response, body) => {
      if (extraInput > '9' || extraInput < '0') {
        return console.log('please type the number of books you want to list.');
      }
      if (response.statusCode >= 300 || response.statusCode < 200) {
        return console.log(`failed to list books, status code ${response.statusCode}`);
      }
      const bookList = JSON.parse(body);
      for (let i = 0; i < bookList.length; i += 1) {
        console.log(bookList[i].id, bookList[i].name);
      }
    },
  );
}

function deleteBooks(id) {
  request.delete(
    {
      url: `${apiUrl}/${id}`,
    },
    (error, response) => {
      if (error) {
        return console.log(`failed to delete book, status code ${response.statusCode}`);
      }
      return console.log('book deleted.');
    },
  );
}

function createBooks(bookName) {
  request.post(
    {
      url: apiUrl,
      form: {
        name: bookName,
      },
    },
    (error, response, body) => {
      if (response.statusCode >= 300 || response.statusCode < 200) {
        return console.log(`failed to create the book, status code ${response.statusCode}`);
      }
      const newBooks = JSON.parse(body);
      console.log(`book successfully created.\nid: ${newBooks.id}, name: ${newBooks.name}`);
    },
  );
}

function updateBooks(bookId, updatedName) {
  request.patch(
    {
      url: `${apiUrl}/${bookId}`,
      form: {
        name: updatedName,
      },
    },
    (error, response, body) => {
      if (response.statusCode >= 300 || response.statusCode < 200) {
        return console.log(`failed to update the book, status code ${response.statusCode}`);
      }
      const updatedBooks = JSON.parse(body);
      return console.log(`book successfully updated.\nid: ${updatedBooks.id}, name: ${updatedBooks.name}`);
    },
  );
}

const action = process.argv[2];
switch (action) {
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
      `no such command as ${action},\nplease try read, list, delete, create or update instead.`,
    );
}
