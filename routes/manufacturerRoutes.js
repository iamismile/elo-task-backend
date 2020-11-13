const manufacturersRouter = require('express').Router();
const manufacturerController = require('../controllers/manufacturerController');

manufacturersRouter
  .route('/')
  .get(manufacturerController.getAllManufacturers)
  .post(manufacturerController.createManufacturer);

manufacturersRouter
  .route('/:id')
  .delete(manufacturerController.deleteManfacturer);

module.exports = manufacturersRouter;
