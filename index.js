const express = require("express");
const Database = require("./db");
const UserController = require("./controllers/UserController");
const TransactionController = require("./controllers/TransactionController");
const AuthMiddleware = require("./middleware/Auth");

const database = new Database();
database.initDb().then(() => console.log("DATABASE CONNECT"));

const app = express();
app.use(express.json());

const userController = new UserController();
const transactionController = new TransactionController();

app.post("/signup", userController.signup);
app.post("/login", userController.login);

app.post("/transaction", AuthMiddleware, transactionController.store);
app.get("/transaction", AuthMiddleware, transactionController.history);

app.listen(process.env.PORT || 80, () => {
  console.log(`Running`);
});
