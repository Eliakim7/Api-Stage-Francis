const express = require("express");
const connectDB = require("./config/db");
const app = express();
const port = 4000;
const dotenv = require("dotenv").config()
const cors = require("cors")
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");


connectDB();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser)


app.use("/api", require("./routes/post.routes"));
app.use("/api/auth", require("./routes/auth.routes"));

/* app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if(req.method === "OPTIONS"){
    res.header("Access-Control-Allow-Methods", "PUT, POST,PATCH, DELETE,GET");
    return res.status(200).json({})
  }
  next();
}); */

app.listen(port, () => console.log("le serveur a démarré au port " + port));
