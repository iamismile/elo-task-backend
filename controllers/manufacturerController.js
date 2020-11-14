const Manufacturer = require('../models/manufacturerModel');
const catchAsync = require('../utils/catchAsync');
const uploadToCloudinary = require('../utils/cloudinaryUpload');
const AppError = require('../utils/appError');

const getAllManufacturers = catchAsync(async (req, res, next) => {
  // set queryObj for country wise query
  const queryObj = {};
  if (req.query.country) {
    queryObj.country = req.query.country.toLowerCase();
  }

  const manufacturers = await Manufacturer.find(queryObj).populate('cars');

  // response
  res.status(200).json({
    status: 'success',
    results: manufacturers.length,
    data: {
      manufacturers,
    },
  });
});

const createManufacturer = catchAsync(async (req, res, next) => {
  const { name, country } = req.body;

  // validate data and create new manufacturer
  let newManufacturer = await Manufacturer.create({ name, country });

  // For image in body
  if (req.files) {
    // upload image in cloudinary
    const file = req.files.logo;
    const result = await uploadToCloudinary(file.tempFilePath, {
      folder: 'elo-task/manufacturers',
    });

    // add manufacturer image url to new manufacturer object and saved to db
    newManufacturer.logo = result.secure_url;
    newManufacturer = await newManufacturer.save();
  }

  // response
  res.status(201).json({
    status: 'success',
    data: {
      manufacturer: newManufacturer,
    },
  });
});

const deleteManfacturer = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // check provided id is exist or not
  const deletedManufacturer = await Manufacturer.findByIdAndRemove(id);

  // if manufacturer is not exist, return error
  if (!deletedManufacturer) {
    return next(new AppError('No manufacturer found with that Id', 404));
  }

  // response
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

module.exports = {
  getAllManufacturers,
  createManufacturer,
  deleteManfacturer,
};
