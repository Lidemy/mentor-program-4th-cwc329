const express = require('express');

const router = express.Router();
const categoryControllers = require('../controllers/categoryControllers');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('categories', req.app.locals.viewsVariables);
});

router.get('/:categoryName', categoryControllers.getArticlesByCategory, (req, res, next) => {
  res.render('categories', req.app.locals.viewsVariables);
});

module.exports = router;
