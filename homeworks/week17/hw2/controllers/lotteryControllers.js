/* eslint no-restricted-syntax: 0 */
/* eslint prefer-destructuring: 0 */
const db = require('../models');

const { Lottery } = db;

const lotteryControllers = {
  getAllPrizes: async (req, res, next) => {
    const prizes = await Lottery.findAll();
    res.locals.prizes = prizes;
    next();
  },

  add: async (req, res, next) => {
    const {
      prize, description, rate, image,
    } = req.body;
    const prizes = await Lottery.create(
      {
        prize,
        description,
        image,
        rate,
      },
    );
    next();
  },

  edit: async (req, res, next) => {
    const id = req.query.id || req.params.id;
    const {
      prize, description, rate, image,
    } = req.body;
    const values = {};
    const valuesArray = [{ prize }, { description }, { rate }, { image }];
    valuesArray.forEach((value) => {
      const entry = Object.entries(value)[0];
      if (entry[1]) {
        values[entry[0]] = entry[1];
      }
    });
    try {
      const prizes = await Lottery.update(values,
        {
          where: {
            id,
          },
        });
    } catch (error) {
      console.log(error);
    }
    next();
  },

  delete: async (req, res, next) => {
    const id = req.query.id || req.params.id;
    const prize = await Lottery.destroy(
      {
        where: {
          id,
        },
      },
    );
    next();
  },

  getRateSum: async (req, res, next) => {
    const rateSum = await Lottery.sum('rate');
    res.locals.rateSum = rateSum;
    next();
  },

  checkSum: async (req, res, next) => {
    let oldRate = 0;
    const id = req.query.id || req.params.id;
    if (id !== undefined) {
      const prize = await Lottery.findOne({
        where: {
          id,
        },
      });
      oldRate = prize.rate;
    }
    const { rateSum } = res.locals;
    const { rate } = req.body;
    if (Math.floor(rate * 10000) === Math.floor(oldRate * 10000)) return next();
    if (Math.floor(rateSum * 10000)
        + Math.floor(rate * 10000)
        - Math.floor(oldRate * 10000) > 10000) {
      res.locals.error = true;
      req.flash('errorMessage', 'sum of rate exceed 1');
      return res.redirect('back');
    }
    next();
  },

  lottery: async (req, res, next) => {
    const { prizes } = res.locals;
    const luckNumber = Math.random();
    let probability = 1;
    for (const prize of prizes) {
      probability -= prize.rate;
      if (luckNumber > probability) {
        res.locals = {};
        res.locals.prize = prize;
        return next();
      }
    }
    res.locals = {};
    res.locals.prize = {};
    return next();
  },
};

module.exports = lotteryControllers;
