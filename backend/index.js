const dotenv = require("dotenv");
const dbConnection = require("./db");
const cors = require("cors");

dotenv.config();

const PORT = process.env.PORT;

const express = require("express");
const app = express();

dbConnection();

const todoRoute = require("./routes/todos");

app.use(cors({
  origin: ["http://localhost:5173", process.env.CLIENT_URL],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}))

app.use(express.json());

app.get("/", (req,res) => {
  res.send("Node is Running")
})

app.use("/api", todoRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
})