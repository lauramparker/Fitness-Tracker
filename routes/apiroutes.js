const db = require("../models")
const path = require("path");


module.exports = function(app, path) {
//ROUTES for getting, creating WORKOUTS
//GET ALL workouts
app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .sort({ date: -1 }) //sort by date
      .populate("exercises") //populate method for populating all workouts with exercises
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
      .sort({ date: -1 }) //sort by date
      .populate("exercises") //populate method for populating workouts in range with exercises
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
    });
});

//CREATE a NEW workout (date specific)
app.post("/api/workouts", (req, res) => {
    db.Workout.create({ day: Date.now() }) //adds current date
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
});

//UPDATE a workout with adding exercises
app.put("/api/workouts/:id", (req, res) => {
    db.Exercise.create(req.body)
      .then(({_id}) => db.Workout.findOneAndUpdate({ _id: req.params.id }, {$push: {exercises: _id}}, { new: true }))
    //   .aggregate({$addFields:{totalDuration:{$sum: totalDuration}}})
      .then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
});



}; //end module.export



