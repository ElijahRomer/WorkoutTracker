const router = require(`express`).Router();

router.get(`/workouts`, (req, res) => {
  console.log(`API GET "/workouts" ROUTE SLAPPED`);
  console.log(req.body);
  try {
    res.status(200).json({ "msg": "You have yet to write this route" })
    // query db for all workouts
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post(`/workouts`, (req, res) => {
  console.log(`API POST "/workouts" ROUTE SLAPPED`);
  console.log(req.body)
  try {
    res.status(200).json({ "msg": "You have yet to write this route" })
    // query db for specific workout
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

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