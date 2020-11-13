const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const manufacturerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true,
  },
  country: {
    type: String,
    required: [true, 'country is required'],
  },
  logo: {
    type: String,
  },
  cars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
    },
  ],
});

// Apply the unique validator plugin
manufacturerSchema.plugin(uniqueValidator);

manufacturerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Manufacturer = mongoose.model('Manufacturer', manufacturerSchema);

module.exports = Manufacturer;
