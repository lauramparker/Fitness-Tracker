const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", { useNewUrlParser: true });


//create a Workout Plan Database when the application starts
db.WorkoutPlan.create({ name: "My Workout Plan" })
  .then(dbWorkoutPlan => {
    console.log(dbWorkoutPlan);
  })
  .catch(({ message }) => {
    console.log(message);
  });




//ROUTES for getting, creating WORKOUTS

//GET ALL workouts
app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
});

//GET ALL workouts in RANGE
app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
});

//CREATE a NEW workout (date specific)
app.post('/api/workouts', (req, res) => {
    db.Workout.create(req.body).then((dbWorkout) => {
        res.json(dbWorkout);
      }).catch(err => {
          res.status(400).json(err);
        });
    });


    
    
//ROUTES for updating SPECIFIC Workouts

//fill in the exercises into the workout (replacing the id only records)
app.get("/populated", (req, res) => {
    db.Workout.find({})
      .populate("exercises")
      .then(dbWorkout => {   //dbWorkout.exercises  to get array of exercises
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
});


//Submit an Exercise to the workout... this is not right... /api/workouts/:workout or /api/workouts/:exercise?
app.post("/api/workouts/submit", ({body}, res) => {
    db.Exercise.create(body)
      .then(({_id}) => db.Workout.findOneAndUpdate({}, { $push: { exercise: _id } }, { new: true }))
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });




  
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
  