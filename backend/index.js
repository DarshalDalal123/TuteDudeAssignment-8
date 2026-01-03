const dotenv = require("dotenv");
const dbConnection = require("./db");
const PORT = process.env.PORT;

dotenv.config();

const express = require("express");
const app = express();

dbConnection();

const todoRoute = require("./routes/todos");


app.use(express.json());

app.get("/", (req,res) => {
  res.send("Node is Running")
})

app.use("/api", todoRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
})