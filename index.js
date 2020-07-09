const express = require("express");
const Database = require("./db");
const UserController = require("./controllers/UserController");
const database = new Database();
database.initDb().then(() => console.log("DATABASE CONNECT"));

const app = express();
app.use(express.json());

const userController = new UserController();

app.post("/signup", userController.signup);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Running`);
});
