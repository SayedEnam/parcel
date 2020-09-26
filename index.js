import express from "express";
import models from "./models/index.js";
import mongoose from "mongoose";

const app = express();
const PORT = 3000;
app.use(express.json());

const log = (msg) => console.log(msg);
const uri = "mongodb://localhost:27017/parcelkoi_db";
const options = {};

const connectWithdb = () => {
  mongoose.connect(uri, options, (err, db) => {
    if (err) {
      console.error(err);
    } else log("Database connection established");
  });
};
connectWithdb();

app.get("/", (req, res) => {
  res.send("Home");
});

app.post("/", (req, res) => {
  const body = req.body;
  const user = new models.User({
    username: body.username,
    createdAt: new Date(),
  });
  user
    .save()
    .then((savedUser) => {
      res.status(201).send("user saved. id: " + savedUser._id);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(PORT, () => {
  console.log("Port is working" + PORT);
});
