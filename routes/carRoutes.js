const carsRouter = require('express').Router();
const Car = require('../models/carModel');
const logger = require('../utils/logger');

carsRouter.get('/', async (req, res) => {
  try {
    const cars = await Car.find({});

    res.status(200).json(cars);
  } catch (error) {
    logger.error(error.message);
  }
});

carsRouter.post('/', async (req, res) => {
  try {
    const newCar = await Car.create(req.body);

    res.status(200).json(newCar);
  } catch (error) {
    logger.error(error.message);
  }
});

module.exports = carsRouter;
