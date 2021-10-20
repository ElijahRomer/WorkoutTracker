const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  date: Date,
  default: Date.now()
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = workoutSchema;