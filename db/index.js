const config = require("../config");
const mongoose = require("mongoose");

module.exports = class Database {
  constructor() {
    this.options = {
      bufferCommands: false,
      bufferMaxEntries: 0,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: config.user_mongodb,
      pass: config.password_mongodb,
    };
  }

  async initDb() {
    try {
      await mongoose.connect(config.url_mongodb, this.options).catch((err) => {
        throw err;
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
