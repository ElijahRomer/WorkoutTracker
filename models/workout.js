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
},
  {
    versionKey: false
  }
)

// one workout consists of multiple exercises that are stored in the array in the exercises property. 

// This exercises array can be queried in the server by dot-chaining the populate method and passing as an argument a string whose value equals the attribute in the parent document that refers to the nested schema.
const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [exerciseSchema],
},
  {
    // removes the __v fields from new entries. Done to keep the data clean during this learning exercise but during production this can actually be useful, especially with arrays of nested docs due to the fact removing or adding a doc to an array will change it's length, thus creating a situation where your code may access the wrong document. I would probably never set up a nested doc access by index anyway though lol. But this does remove all versioning benefits.
    versionKey: false
  }
);

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;