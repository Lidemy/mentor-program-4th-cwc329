const express = require('express');

const router = express.Router();
const articleControllers = require('../controllers/articleControllers');
const categoriesControllers = require('../controllers/categoryControllers');

/* GET home page. */
router.get('/', articleControllers.getArticles, (req, res, next) => {
  // console.log(res.locals);
  res.render('index', req.app.locals.viewsVariables);
});

module.exports = router;
