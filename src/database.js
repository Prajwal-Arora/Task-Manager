const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../config/index');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(MONGO_CONNECTION_STRING)
      .then(() => {
        console.log('database connection successful');
      })
      .catch((err) => {
        console.log('Error ' + err);
      });
  }
}

module.exports = new Database();
