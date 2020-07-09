const express = require("express");
const Database = require("./db");

const mongoDatabase = new Database();
const UserController = require("./controllers/UserController");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const { user } = req.body;
  const userController = new UserController();

  try {
    const userSaved = await userController.signup(user);
    console.log(userSaved);
    res.status(201).json({ message: "User created!", userSaved });
  } catch (error) {
    res.status(400).send(error);
  }

  /* userController
    .signup(user)
    .then((data) => {
      console.log("Then signup");

      res.status(201).json({ message: "User created!", data });
    })
    .catch((error) => {
      res.status(400).json({ errorMessage: error.message });
    }); */
});

mongoDatabase
  .initDb()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Running`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
