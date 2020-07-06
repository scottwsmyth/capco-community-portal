const express = require("express");
const app = express();
const connection = require("./models/db");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

app.use(express.json());
app.use(cors());

app.use("/api/users", require("./routes/user"));

app.use((error, req, res, next) => {
  if (error.name === "ValidationError") {
    let validationErrors = [];
    console.log(Object.keys(error.errors));
    Object.keys(error.errors).forEach((key) => {
      validationErrors.push({
        field: key,
        message: error.errors[key].message,
      });
    });
    res.status(422).send(validationErrors);
  }
});

const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: "sessions",
});

app.use(
  session({
    secret: "someSecretHere",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// app.use(passport.initialize());
// app.use(passport.session());

module.exports = app;
