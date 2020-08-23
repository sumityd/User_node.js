const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/router-user");
const taskRouter = require("./routers/router-task");
const bodyParser = require("body-parser");
const cors = require("cors");

var options = {
  inflate: true,
  type: "application/json"
};

const app = express();

app.use(bodyParser.json(options));
app.use(cors());
app.use(userRouter);
app.use(taskRouter);

// 3000
const port = process.env.PORT ;

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
