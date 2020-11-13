const carsRouter = require('express').Router();
const carController = require('../controllers/carController');

carsRouter
  .route('/')
  .get(carController.getAllCar)
  .post(carController.createCar);

carsRouter.route('/:id').delete(carController.deleteCar);

module.exports = carsRouter;
