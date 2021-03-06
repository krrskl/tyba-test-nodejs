const config = require("../config");
const mongoose = require("mongoose");

module.exports = class Database {
  constructor() {
    this.options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
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
