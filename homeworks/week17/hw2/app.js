const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const port = process.env.portApi || 4001;
const session = require('express-session');
const flash = require('connect-flash');
const cors = require('cors');
const lotteryControllers = require('./controllers/lotteryControllers');

const sess = {
  secret: process.env.secret,
  name: 'cwc329_lottery',
  resave: false,
  saveUninitialized: true,
};

const init = (req, res, next) => {
  res.locals.userId = req.session.userId;
  res.locals.errorMessage = req.flash('errorMessage');
  next();
};

const indexRouter = require('./routes/index');

const app = express();

app.locals.viewsVariables = {
  title: 'Lottery!!!',
};

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));
app.use(flash());
app.use(lotteryControllers.getRateSum);
app.use(init);

app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`listening to port ${port} now...`);
});

module.exports = app;
