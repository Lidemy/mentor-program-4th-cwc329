const express = require('express');

const router = express.Router();
const userControllers = require('../controllers/usersControllers');

router.post('/login', userControllers.login, (req, res, next) => {
  res.redirect('back');
});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

/*
router.post('/register', userControllers.register, (req, res, next) => {
  res.redirect('/');
})
*/

module.exports = router;
