const Car = require('../models/carModel');
const Manufacturer = require('../models/manufacturerModel');
const catchAsync = require('../utils/catchAsync');
const uploadToCloudinary = require('../utils/cloudinaryUpload');

const getAllCar = catchAsync(async (req, res, next) => {
  const cars = await Car.find({}).populate('manufacturer', {
    name: 1,
    country: 1,
    logo: 1,
  });

  // response
  res.status(200).json({
    status: 'success',
    results: cars.length,
    data: {
      cars,
    },
  });
});

const createCar = catchAsync(async (req, res, next) => {
  const { name, year, manufacturer } = req.body;

  // check provided manufacturer is exist or not
  const returnedManufacturer = await Manufacturer.findOne({
    name: manufacturer,
  });

  // if manufacturer is not exist, return error
  if (!returnedManufacturer) {
    return res.status(404).json({
      status: 'fail',
    });
  }

  // car image file is required otherwise return error
  if (!req.files) {
    return res.status(404).json({
      status: 'fail',
    });
  }

  // validate data and create new car
  const carObject = {
    name,
    year,
    manufacturer: returnedManufacturer._id,
  };
  const newCar = await Car.create(carObject);

  // new car is added to provided manufacturer
  returnedManufacturer.cars = returnedManufacturer.cars.concat(newCar._id);
  await returnedManufacturer.save();

  // upload car image to cloudinary
  const file = req.files.image;
  const result = await uploadToCloudinary(file.tempFilePath, {
    folder: 'elo-task/cars',
  });

  // add car image url to new car object and saved to db
  newCar.image = result.secure_url;
  const savedCar = await newCar.save();

  // response
  res.status(201).json({
    status: 'success',
    data: {
      car: savedCar,
    },
  });
});

const deleteCar = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // check provided id is exist or not
  const deletedCar = await Car.findByIdAndRemove(id);

  // if car is not exist, return error
  if (!deletedCar) {
    return res.status(404).json({
      status: 'fail',
    });
  }

  // response
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

module.exports = {
  getAllCar,
  createCar,
  deleteCar,
};
