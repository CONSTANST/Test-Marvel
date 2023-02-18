const User = require("../model/User");
const isAuthenticated = async (req, res, next) => {
  //console.log(req.headers.authorization)
  if (req.headers.authorization) {
    const token = req.headers.authorization.replace("Bearer ", "");
    // On recherche dans la Base de Donnée un user qui possède ce token
    const user = await User.findOne({token: token}).select("account _id");
    // l'a t'on trouver?
    //console.log(user);
    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  } else {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};
module.exports = isAuthenticated;
