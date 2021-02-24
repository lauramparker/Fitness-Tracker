const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now(),
    unique: true //there should only be one workoutplan for each day so date needs to be unique
  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise"
    }
  ],
  totalDuration: {
    type: Number,
    default: 0
  }
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;