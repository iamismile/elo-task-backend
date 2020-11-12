const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  year: {
    type: String,
  },
  manufacturer: {
    type: String,
  },
});

carSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
