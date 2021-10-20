const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  type: String,
  name: String,
  duration: Number,
  weight: Number,
  reps: Number,
  sets: Number,
  distance: Number
})

// one workout consists of multiple exercises that are stored in the array in the exercises property. 

// This exercises array can be queried in the server by dot-chaining the populate method and passing as an argument a string whose value equals the attribute in the parent document that refers to the nested schema.
const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [exerciseSchema]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;