const express = require('express');

const router = express.Router();
const cors = require('cors');
const lotteryControllers = require('../controllers/lotteryControllers');
const userControllers = require('../controllers/usersControllers');

/* GET home page. */

router.get('/', (req, res, next) => {
  res.render('index', res.app.locals.viewsVariables);
});

router.get('/lottery', lotteryControllers.getAllPrizes, lotteryControllers.lottery, cors(), (req, res, next) => {
  res.send(res.locals.prize);
});

router.get('/prizes', lotteryControllers.getAllPrizes, (req, res, next) => {
  res.send(res.locals.prizes);
});

router.get('/prizes/delete/:id', userControllers.checkPermission, lotteryControllers.delete, (req, res, next) => {
  res.redirect('/admin');
});

router.post('/prizes', userControllers.checkPermission, lotteryControllers.checkSum, lotteryControllers.add, (req, res, next) => {
  res.send();
});

router.post('/prizes/add', userControllers.checkPermission, lotteryControllers.checkSum, lotteryControllers.add, (req, res, next) => {
  res.redirect('/admin');
});

router.post('/prizes/edit/:id', userControllers.checkPermission, lotteryControllers.checkSum, lotteryControllers.edit, (req, res, next) => {
  res.redirect('/admin');
});


router.patch('/prizes', userControllers.checkPermission, lotteryControllers.checkSum, lotteryControllers.edit, (req, res, next) => {
  res.send();
});

router.delete('/prizes', userControllers.checkPermission, lotteryControllers.delete, (req, res, next) => {
  res.send();
});

router.post('/login', userControllers.login, (req, res, next) => {
  res.redirect('/admin');
});

router.get('/admin', userControllers.checkPermission, lotteryControllers.getAllPrizes, (req, res, next) => {
  res.render('admin', res.app.locals.viewsVariables);
});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});


module.exports = router;
