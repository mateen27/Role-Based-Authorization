const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1]; // ["Bearer", "eyzbhgjsdgjadghjgjhadfjdkfhds"]

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied!" });
    }

    try {
      const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decodeToken;

      console.log("user token", req.user);

      next(); // continue to the next middleware or route handler
    } catch (error) {
      res.status(400).json({
        message: "Token is not valid!",
      });
    }
  } else {
    return res.status(401).json({
        message: "No Token, authorization denied!"
    })
  }
};

module.exports = verifyToken;
