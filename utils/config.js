require('dotenv').config();

const { PORT } = process.env;
const { DATABASE_URI } = process.env;
const { DATABASE_PASSWORD } = process.env;

module.exports = {
  PORT,
  DATABASE_URI,
  DATABASE_PASSWORD,
};
