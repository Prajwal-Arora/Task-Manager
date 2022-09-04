const dotenv = require('dotenv');
const path = require('path');
const NODE_ENV = process.env.NODE_ENV;

let result;

if (NODE_ENV === 'DEV') {
  result = dotenv.config({
    path: path.resolve(process.cwd(), 'config/dev.env'),
  });
}

if (result.error) {
  throw result.error;
}

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};
