const express = require("express");
const connectDB = require("./config/db");
const app = express();
const port = 4000;
const dotenv = require("dotenv").config()
const cors = require("cors")

connectDB();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));

app.use("/api", require("./routes/post.routes"));

app.listen(port, () => console.log("le serveur a démarré au port " + port));
