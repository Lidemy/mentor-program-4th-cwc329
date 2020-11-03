const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const { appendFileSync } = require('fs');
const categoryControllers = require('./controllers/categoryControllers');

const sess = {
  secret: 'cwc329',
  name: 'cwc329',
  resave: false,
  saveUninitialized: true,
};

const indexRouter = require('./routes/index');
const articlesRouter = require('./routes/articles');
const userRouter = require('./routes/user');

const app = express();
const port = 3001;

// view engine setup

app.locals.viewsVariables = {
  title: "cwc329's Blog",
};

const init = (req, res, next) => {
  // res.locals = Object.assign(req.app.locals.viewsVariables);
  res.locals.errorMessage = req.flash('errorMessage');
  res.locals.userId = req.session.userId;
  res.locals.nickname = req.session.nickname;
  res.locals.path = req.path;
  next();
};

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('*', categoryControllers.getAll);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));
app.use(flash());
app.use(init);

// app.all('*', )
app.use('/', indexRouter);
app.use('/articles', articlesRouter);
app.use('/user', userRouter);

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`listening to PORT ${port} now...`);
});
module.exports = app;
