const express = require("express");
const router = express.Router();
const axios = require("axios");

const apikey = process.env.MARVEL_API_KEY;

router.get("/comics", async (req, res) => {
  try {
    // res.status(200).json("hello");
    const limit = req.query.limit || "100";
    const skip = req.query.skip || "";
    const title = req.query.title || "";

    const MARVEL_API_URL = `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apikey}&title=${title}&skip=${skip}&limit=${limit}`;
    const response = await axios.get(MARVEL_API_URL);

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
