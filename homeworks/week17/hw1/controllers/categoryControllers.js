// const { Article, Category, CategoryTag, User } = require('../models/db');
const db = require('../models');

const { Category } = db;
const { CategoryTag } = db;
const { Article } = db;

const categoryControllers = {
  setArticleCategory: async (req, res, next) => {
    const articleId = res.locals.newArticleId || req.params.id;
    const { categoryId } = req.body;
    if (req.params.id) {
      await CategoryTag.destroy(
        {
          where: {
            ArticleId: req.params.id,
          },
        },
      );
    }
    if (typeof (categoryId) === 'string') {
      CategoryTag.create(
        {
          ArticleId: articleId,
          CategoryId: categoryId,
        },
      );
    } else if (typeof (categoryId) === 'object') {
      categoryId.forEach((e) => {
        CategoryTag.create(
          {
            ArticleId: articleId,
            CategoryId: e,
          },
        );
      });
    }
    next();
  },

  getAll: async (req, res, next) => {
    const categories = await Category.findAll(
      {
        where: {
          isDeleted: 0,
        },
      },
    );
    res.locals.categories = categories;
    next();
  },

  add: async (req, res, next) => {
    const category = await Category.create(
      {
        name: req.body.name,
      },
    );
    next();
  },

  edit: async (req, res, next) => {
    const { name, id } = req.body;
    const category = await Category.update(
      {
        name,
      },
      {
        where: {
          id,
        },
      },
    );
  },

  delete: async (req, res, next) => {
    const { isDeleted, id } = req.body;
    const category = await Category.update(
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

  getArticlesByCategory: async (req, res, next) => {
    const result = await Category.findOne(
      {
        where: {
          name: req.params.categoryName,
        },
        include: {
          model: Article,
          include: Category,
        },
        order: [[{ model: Article, as: 'Articles' }, 'id', 'DESC']],
      },
    );
    const articles = result.Articles;
    res.locals.articles = articles;
    next();
  },
};

module.exports = categoryControllers;
