const flash = require('connect-flash');
const session = require('express-session');

const test = {
  session: (req, res, next) => {
    req.session.testToken = 'waitingkid';
    next();
  },

  flash: (req, res, next) => {
    req.flash('token', req.session.testToken);
    next();
  },
};

module.exports = test;
