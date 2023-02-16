const express = require("express");
const router = express.Router();
const axios = require("axios");

const apikey = process.env.MARVEL_API_KEY;

router.get("/characters", async (req, res) => {
  try {
    // res.status(200).json("hello");
    const name = req.query.name || "";
    const limit = req.query.limit || "100";
    const skip = req.query.skip || "";

    const MARVEL_API_URL = `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apikey}&name=${name}&skip=${skip}&limit=${limit}`;
    const response = await axios.get(MARVEL_API_URL);

    const characters = response.data;
    res.status(200).json(characters);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

router.get("/character/:characterId", async (req, res) => {
  try {
    // res.status(200).json("hello");

    // console.log(req.params);

    const characterId = req.params.characterId;
    // console.log(characterId);

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
