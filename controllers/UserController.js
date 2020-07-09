const UserModel = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("./../config");
class UserController {
  async signup(req, res) {
    try {
      const { user } = req.body;
      if (!user.password) throw new Error("Password field is required.");
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(6));
      const newUser = new UserModel(user);
      const u = await newUser.save();
      return res.status(201).json({ user: u.toJsonObj() });
    } catch (error) {
      return res.status(400).json({ errorMessage: error.message }).status(400);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await UserModel.findOne({ email });
      if (!result) {
        return res.json({ errorMessage: "Incorrect credentials." }).status(403);
      }

      const match = await bcrypt.compare(password, result.password);
      if (!match) {
        return res.json({ errorMessage: "Incorrect credentials." }).status(403);
      }

      const token = jwt.sign(result.toJsonObj(), config.secret, {
        expiresIn: "3h",
      });

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(400).json({ errorMessage: error.message });
    }
  }
}

module.exports = UserController;
