/* eslint consistent-return: 0 */
const request = require('request');

request(
  'https://lidemy-book-store.herokuapp.com/books?_limit=10',
  (error, response, body) => {
    if (error) {
      return (console.log('status code:', response.statusCode));
    }
    // 看完範例後加上錯誤訊息
    const bookData = JSON.parse(body);
    for (let i = 0; i < bookData.length; i += 1) {
      console.log(bookData[i].id, bookData[i].name);
    }
  },
);
