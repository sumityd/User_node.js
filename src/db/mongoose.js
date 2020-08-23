const mongoose = require("mongoose");

const db = mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });

if (db) {
  console.log("connected database");
} else {
  console.log("not connected");
}
