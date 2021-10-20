const router = require(`express`).Router();
const Workout = require(`../models`);

router.get(`/workouts`, async (req, res) => {
  console.log(`API GET "/workouts" ROUTE SLAPPED`);
  console.log(req.body);
  try {
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

    // console.log(aggregatedData);
    res.status(200).json(aggregatedData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



// apparently this just creates an empty entry in the workout model?
router.post(`/workouts`, async (req, res) => {
  console.log(`API POST "/workouts" ROUTE SLAPPED`);
  console.log(req.body)
  try {
    const newWorkout = await Workout.create({});

    console.log(newWorkout);

    // delivers the id of the newly created empty workout doc to the client, which in turns sets it to the value of the querystring id parameter.
    res.status(200).json(newWorkout);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



// This puts data in the workout model, by pushing a new exercise subdoc to the specified Workout instance's exercise array.
router.put(`/workouts/:id`, async (req, res) => {
  console.log(`API PUT "/workouts/${req.params.id}" ROUTE SLAPPED`)
  try {
    let selectedWorkout = await Workout.findByIdAndUpdate(
      { _id: req.params.id },
      { $push: { exercises: req.body } }
    );

    res.status(200).json(selectedWorkout)

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



router.get(`/workouts/range`, async (req, res) => {
  console.log(`API GET "/workouts/range" ROUTE SLAPPED`);
  try {
    // Compute the date/time from 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    console.log(sevenDaysAgo);

    let workoutsInLastSevenDays = await Workout.aggregate([
      { $match: { day: { $gt: sevenDaysAgo } } },
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" }
        }
      }
    ]);

    console.log(workoutsInLastSevenDays);

    res.status(200).json(workoutsInLastSevenDays);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;