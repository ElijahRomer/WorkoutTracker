const router = require(`express`).Router();
const path = require(`path`)

router.get(`/exercise`, (req, res) => {
  console.log(`HTML GET "/exercise" ROUTE SLAPPED`)
  res.status(200).sendFile(path.join(__dirname, `../public/exercise.html`));
});

router.get(`/`, (req, res) => {
  console.log(`HTML GET "/" ROUTE SLAPPED`)
  res.status(200).send(`/index.html`);
});



module.exports = router;