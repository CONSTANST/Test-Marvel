const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/comics", async (req, res) => {
  try {
    // res.status(200).json("hello");
    const {limit = 100, skip = 0, title = ""} = req.query;
    const apikey = process.env.MARVEL_API_KEY;

    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/comics",
      {
        params: {
          apiKey: apikey,
          limit,
          skip,
          title,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get("/comics/:characterId", async (req, res) => {
  try {
    // res.status(200).json("hello");
    // console.log(req.params);
    const characterId = req.params.characterId;
    const apikey = process.env.MARVEL_API_KEY;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apikey}&characterId=${characterId}`
    );
    // console.log(response.data);
    const comics = response.data;
    res.json(comics);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving comics");
  }
});

module.exports = router;
