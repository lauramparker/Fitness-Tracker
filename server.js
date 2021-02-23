const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//require routes
require("./routes/HTMLroutes.js")(app, path);
require("./routes/APIroutes.js")(app, path);


mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/Fitness_Tracker_App',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );
  
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", { useNewUrlParser: true });


//create a Workout Plan Database when the application starts
// db.Workout.create({ name: "My Workout Plan" })
//   .then(dbWorkout => {
//     console.log(dbWorkout);
//   })
//   .catch(({ message }) => {
//     console.log(message);
//   });


//listening on PORT
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
