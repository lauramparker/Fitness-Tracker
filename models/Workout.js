const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
//   name: {   //don't think the workout plan needs a title, just a day and exsercises
//     type: String,
//     unique: true
//   },
  day: {
    type: Date,
    unique: true //there should only be one workoutplan for each day so date needs to be unique
  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise"
    }
  ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;