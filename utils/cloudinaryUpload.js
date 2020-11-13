const cloudinary = require('cloudinary').v2;
const config = require('./config');

// cloudinary configuration
cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

function uploadToCloudinary(filePath, options = {}) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, options, (err, result) => {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
}

module.exports = uploadToCloudinary;
