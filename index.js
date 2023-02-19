require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(cors());

const comicsRoute = require("./routes/comics");
const charactersRoute = require("./routes/characters");
const userRoute = require("./routes/user");
// const {default: mongoose} = require("mongoose");
app.use(comicsRoute);
app.use(charactersRoute);
app.use(userRoute);

// connection a la BDD
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);
// mongoose.connect("mongodb://127.0.0.1/Marvel-test");
// mongoose.connect("mongodb://localhost:27017/Marvel-test");
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// const uid2 = require("uid2");
// const SHA256 = require("crypto-js/sha256");
// const encBase64 = require("crypto-js/enc-base64");

// const fileUpload = require("express-fileupload");

// const User = require("./model/User");

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// app.post("/user/singup", fileUpload(), async (req, res) => {
//   try {
//     //* Recherche dans la Base de Donnée pour l'email reçu
//     const user = await User.findOne({email: req.body.email});
//     //! oui? pas besoin d'inscription
//     if (user) {
//       res.status(409).json({message: "This email already has an account"});
//     } //? non
//     else {
//       if (req.body.email && req.body.password && req.body.username) {
//         //* creation d'un nouvel utilisateur
//         // D'apres le cours
//         //* Etape 1 : encrypter le MDP et Generer un token
//         const token = uid2(64);
//         const salt = uid2(64);
//         const hash = SHA256(req.body.password + salt).toString(encBase64);
//         //* Etape 2: Créer un nouvel User
//         const newUser = new User({
//           email: req.body.email,
//           token,
//           hash,
//           salt,
//           account: {username: req.body.username},
//         });
//         //* Etape 3: Sauver le nouveau User en BDD
//         await newUser.save();
//         res.status(200).json({
//           _id: newUser._id,
//           email: newUser.email,
//           token: newUser.token,
//           account: newUser.account,
//         });
//       } else {
//         // le User n'a pas envoyé les bonnes info ?
//         res.status(400).json({message: "Missing parametres"});
//       }
//     }
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).json({message: error.message});
//   }
// });

// app.post("/user/login", async (req, res) => {
//   try {
//     const user = await User.findOne({email: req.body.email});
//     if (user) {
//       // d'apres le cours:
//       //* bon MDP ? req.body.password / user.hash / user.salt ?
//       if (
//         SHA256(req.body.password + user.salt).toString(encBase64) === user.hash
//       ) {
//         res.status(200).json({
//           _id: user._id,
//           token: user.token,
//           account: user.account,
//         });
//       } else {
//         res.status(401).json({error: "Unauthorized"});
//       }
//     } else {
//       res.status(400).json({message: "User not found"});
//     }
//   } catch (error) {
//     console.log(error.message);
//     res.json({message: error.message});
//   }
// });
//     const {limit = 100, skip = 0, title = ""} = req.query; //     // res.status(200).json("hello"); //   try { // app.get("/comics", async (req, res) => {
//     const apikey = process.env.MARVEL_API_KEY;

//     const response = await axios.get(
//       "https://lereacteur-marvel-api.herokuapp.com/comics",
//       {
//         params: {
//           apiKey: apikey,
//           limit,
//           skip,
//           title,
//         },
//       }
//     );

//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error);
//   }
// });
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// app.get("/characters", async (req, res) => {
//   try {
//     // res.status(200).json("hello");
//     const apikey = process.env.MARVEL_API_KEY;
//     const {name = "", limit = 100, skip = 0} = req.query;
//     const MARVEL_API_URL =
//       "https://lereacteur-marvel-api.herokuapp.com/characters";
//     const response = await axios.get(MARVEL_API_URL, {
//       params: {
//         apiKey: apikey,
//         limit,
//         skip,
//         name,
//       },
//     });

//     const characters = response.data;
//     res.status(200).json(characters);
//   } catch (error) {
//     res.status(500).json({error: error});
//   }
// });
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// app.get("/character/:characterId", async (req, res) => {
//   try {
//     // res.status(200).json("hello");
//     const apikey = process.env.process.env.MARVEL_API_KEY;
//     console.log(req.params);

//     const characterId = req.params.characterId;
//     console.log(characterId);

//     const response = await axios.get(
//       `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${apikey}`
//     );
//     const character = response.data;
//     res.json(character);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error retrieving character");
//   }
// });

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// app.get("/comics/:characterId", async (req, res) => {
//   try {
//     // res.status(200).json("hello");
//     // console.log(req.params);
//     const characterId = req.params.characterId;
//     const apikey = process.env.MARVEL_API_KEY;
//     const response = await axios.get(
//       `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apikey}&characterId=${characterId}`
//     );
//     // console.log(response.data);
//     const comics = response.data;
//     res.json(comics);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error retrieving comics");
//   }
// });

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

app.get("/hello", (req, res) => {
  res.json({message: "Hello"});
});
app.get("*", (req, res) => {
  res.json({message: "This page doesn't exist"});
});
app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
