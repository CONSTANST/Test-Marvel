const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/characters", async (req, res) => {
  try {
    // res.status(200).json("hello");
    const apikey = process.env.MARVEL_API_KEY;
    const {name = "", limit = 100, skip = 0} = req.query;
    const MARVEL_API_URL =
      "https://lereacteur-marvel-api.herokuapp.com/characters";
    const response = await axios.get(MARVEL_API_URL, {
      params: {
        apiKey: apikey,
        limit,
        skip,
        name,
      },
    });

    const characters = response.data;
    res.status(200).json(characters);
  } catch (error) {
    res.status(500).json({error: error});
  }
});

router.get("/character/:characterId", async (req, res) => {
  try {
    // res.status(200).json("hello");
    const apikey = process.env.MARVEL_API_KEY;
    console.log(req.params);

    const characterId = req.params.characterId;
    console.log(characterId);

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${apikey}`
    );
    const character = response.data;
    res.json(character);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving character");
  }
});

module.exports = router;
