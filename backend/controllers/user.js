const User = require("../models/user");
const createError = require("http-errors");

//route controller: /api/user/signup, POST req invoked via user service class with User payload

module.exports.signup = (req, res, next) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    salt: null,
  });
  user.save((err, document) => {
    if (!err) return res.status(201).send(document);
    if (err.errors.email && err.errors.email.kind === "unique") {
      res.status(422).send("Email already exists in the database");
    } else {
      next(err);
    }
  });
};
