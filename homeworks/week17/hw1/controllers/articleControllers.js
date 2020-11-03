// const { Article, Category, CategoryTag, User } = require('../models/db');
const db = require('../models');

const { Article } = db;
const { Category } = db;
const { CategoryTag } = db;

const articleControllers = {
  getOne: async (req, res, next) => {
    const article = await Article.findAll(
      {
        where: {
          id: req.params.id || 1,
          isDeleted: 0,
        },
        include: Category,
      },
    );
    res.locals.articles = article;
    next();
  },

  getArticles: async (req, res, next) => {
    const articles = await Article.findAll(
      {
        where: {
          isDeleted: 0,
        },
        order: [['id', 'DESC']],
        limit: 5,
        offset: (Number(req.params.page) - 1) * 5 || 0,
        include: Category,
      },
    );
    res.locals.articles = articles;
    next();
  },

  add: async (req, res, next) => {
    const { title, content, userId } = req.body;
    if (!title || !content || !userId) {
      req.flash('errorMessage', 'invalid inputs');
      return res.redirect('back');
    }
    const article = await Article.create(
      {
        title,
        content,
        UserId: userId,
      },
    );
    res.locals.newArticleId = article.id;
    next();
  },

  edit: async (req, res, next) => {
    const { title, content, id } = req.body;
    if (!title || !content) {
      req.flash('errorMessage', 'invalid inputs');
      return res.redirect('back');
    }
    const article = await Article.update(
      {
        content,
        title,
      },
      {
        where: {
          id,
        },
      },
    );
    next();
  },

  delete: async (req, res, next) => {
    const { id, isDeleted } = req.body;
    await Article.update(
      {
        isDeleted,
      },
      {
        where: {
          id,
        },
      },
    );
    next();
  },

  getArticlesCounts: async (req, res, next) => {
    const ArticlesCounts = await Article.count(
      {
        where: {
          isDeleted: 1,
        },
      },
    );
  },
};

module.exports = articleControllers;
