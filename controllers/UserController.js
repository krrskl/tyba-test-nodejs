const UserModel = require("../models/Users");
const bcrypt = require("bcryptjs");

class UserController {
  constructor() {
    this.salt = bcrypt.genSaltSync(6);
  }

  async signup(user) {
    try {
      if (!user.password) throw new Error("Password field is required.");

      user.password = bcrypt.hashSync(user.password, this.salt);
      const { password, ...newUser } = await UserModel.create(user);
      return newUser;
    } catch (error) {
      console.log(error);

      throw new Error(error);
    }
  }
}

module.exports = UserController;
