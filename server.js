const express = require("express");
const app = express();
require("./config/config");

//server set up
app.listen(process.env.PORT, () => {
  console.log("App listening on port 3000!");
});

app.use(require("./backend/app.js"));
