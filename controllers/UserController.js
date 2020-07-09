const UserModel = require("../models/Users");
const bcrypt = require("bcryptjs");

class UserController {
  async signup(req, res) {
    try {
      const { user } = req.body;
      if (!user.password) throw new Error("Password field is required.");
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(6));
      const newUser = new UserModel(user);
      const u = await newUser.save();
      return res.json({ user: u.toJsonObj() });
    } catch (error) {
      return res.json({ errorMessage: error.message }).status(400);
    }
  }
}

module.exports = UserController;
