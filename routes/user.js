const express = require("express");
const router = express.Router();

// encryptage du mot de passe
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const fileUpload = require("express-fileupload");

const User = require("../model/User");

// route singup//
router.post("/user/singup", fileUpload(), async (req, res) => {
  try {
    //* Recherche dans la Base de Donnée pour l'email reçu
    const user = await User.findOne({email: req.body.email});
    //! oui? pas besoin d'inscription
    if (user) {
      res.status(409).json({message: "This email already has an account"});
    } //? non
    else {
      if (req.body.email && req.body.password && req.body.username) {
        //* creation d'un nouvel utilisateur
        // D'apres le cours
        //* Etape 1 : encrypter le MDP et Generer un token
        const token = uid2(64);
        const salt = uid2(64);
        const hash = SHA256(req.body.password + salt).toString(encBase64);
        //* Etape 2: Créer un nouvel User
        const newUser = new User({
          email: req.body.email,
          token,
          hash,
          salt,
          account: {username: req.body.username},
        });
        //* Etape 3: Sauver le nouveau User en BDD
        await newUser.save();
        res.status(200).json({
          _id: newUser._id,
          email: newUser.email,
          token: newUser.token,
          account: newUser.account,
        });
      } else {
        // le User n'a pas envoyé les bonnes info ?
        res.status(400).json({message: "Missing parametres"});
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({message: error.message});
  }
});

//route login
router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if (user) {
      // d'apres le cours:
      //* bon MDP ? req.body.password / user.hash / user.salt ?
      if (
        SHA256(req.body.password + user.salt).toString(encBase64) === user.hash
      ) {
        res.status(200).json({
          _id: user._id,
          token: user.token,
          account: user.account,
        });
      } else {
        res.status(401).json({error: "Unauthorized"});
      }
    } else {
      res.status(400).json({message: "User not found"});
    }
  } catch (error) {
    console.log(error.message);
    res.json({message: error.message});
  }
});
module.exports = router;
