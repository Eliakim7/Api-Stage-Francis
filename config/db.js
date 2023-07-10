const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Mongo connecté"))
    .catch((error) => console.log(error));
};

module.exports = connectDB;
