const router = require(`express`).Router();
const Workout = require(`../models`);

router.get(`/workouts`, async (req, res) => {
  console.log(`API GET "/workouts" ROUTE SLAPPED`);
  console.log(req.body);
  try {

    // need to:
    // find the most recent workout, 
    // aggregate the duration of each exercise object in the workout.exercises array
    // append the total of all exercise durations as a field to the selected workout, then deliver to client.
    // do all of this with queries and not JS
    const aggregatedData = await Workout.aggregate(
      [
        {
          // add a field to the Workout parent document called "totalDuration" that is the sum of the duration field in each exercise object in the parent doc's exercises array.
          $addFields: {
            totalDuration: { $sum: "$exercises.duration" }
          }
        }
      ]
    ) //sort top down oldest to newest entries based on "day" field
      .sort({ day: 1 })

    console.log(aggregatedData);
    res.status(200).json(aggregatedData);

    // const workoutData = await Workout.find({}).populate('exercises');
    // console.log("workoutData is as follows:");
    // console.log(workoutData[0].exercises);
    // res.status(200).json(workoutData);
    // query db for all workouts
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get(`/workouts/range`, async (req, res) => {
  console.log(`API GET "/workouts/range" ROUTE SLAPPED`);
  console.log(req.body);
  try {
    // const workoutData = await Workout.find({}).populate('exercises');
    // console.log("workoutData is as follows:");
    // console.log(workoutData);
    // res.status(200).json({ workoutData });
    // query db for all workouts
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// apparently this just creates an empty entry in the workout model?
router.post(`/workouts`, (req, res) => {
  console.log(`API POST "/workouts" ROUTE SLAPPED`);
  console.log(req.body)
  try {
    res.status(200).json({ "msg": "You have yet to write this route" })

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// This actually puts data in the workout model.
router.put(`/workouts/:id`, (req, res) => {
  console.log(`API PUT "/workouts/${req.params.id}" ROUTE SLAPPED`)
  console.log(req.body)
  try {
    res.status(200).json({ "msg": "You have yet to write this route" })
    // query db for specific workout
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;