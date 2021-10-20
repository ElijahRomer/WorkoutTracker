const path = require(`path`);
const express = require(`express`);
const mongoose = require(`mongoose`);
// const logger = require("morgan");
const routes = require(`./controllers`)

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const db = mongoose.connection;

db.on('open', () => {
  console.log(`\nMONGOOSE CONNECTED SUCCESSFULLY\n`)
  // console.log(db)
})

db.on(`error`, () => {
  console.log(`\n\n***MONGOOSE ERROR***\n\n`)
  console.log(error)
})

const PORT = process.env.PORT || 3000;

const app = express();

// app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(routes);


app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
