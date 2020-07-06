const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.error(err);
    else console.log("Connected to db!");
  }
);

const connection = mongoose.connection;

module.exports = connection;
