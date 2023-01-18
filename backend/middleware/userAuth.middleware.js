const jwt = require("jsonwebtoken");
require("dotenv").config();

const userAuth = (req, res, next) => {
  try {
    jwt.verify(token, process.env.Key, (err, right) => {
      if (err) {
        console.log(err);
        res.send("Unauthorized User");
      } else {
        let userId = decoded.userID;
        req.body.userID = userId;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.send("Error in token");
  }
};
