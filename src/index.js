require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const axios = require("axios").default;

const app = express();

/* SETUP MIDDLEWARE */

app.disable("x-powered-by");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

/* SETUP ROUTES */
app.get("/results", (req, res) => {
  console.log({ req: req.query.level });
  const allLevels = req.query.level;
  console.log({ allLevels: allLevels });
  const options = {
    method: "GET",
    url: "https://twinword-word-association-quiz.p.rapidapi.com/type1/",
    params: { level: allLevels, area: "sat" },
    headers: {
      "x-rapidapi-host": "twinword-word-association-quiz.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_RAPID_API_KEY,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.get("*", (req, res) => {
  res.json({ ok: true });
});

/* START SERVER */

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`\n🚀 Server is running on http://localhost:${port}/\n`);
});
