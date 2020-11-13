require('dotenv').config();

const { PORT } = process.env;
const { DATABASE_URI } = process.env;
const { DATABASE_PASSWORD } = process.env;
const { CLOUDINARY_CLOUD_NAME } = process.env;
const { CLOUDINARY_API_KEY } = process.env;
const { CLOUDINARY_API_SECRET } = process.env;

module.exports = {
  PORT,
  DATABASE_URI,
  DATABASE_PASSWORD,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
};
