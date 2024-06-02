const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const bearerToken = req.headers.authorization;
  if (bearerToken.substring(0, 7) == "Bearer") {
    return res.status(403).json({
      message: "Token is not valid",
    });
  }
  const token = bearerToken.substring(7);
  try {
    const decode = jwt.verify(token, JWT_SECRET);
    req.userId = decode.id;
    return next();
  } catch (error) {
    return res.status(403).json({
      message: "Token is not valid",
    });
  }
}

module.exports = { authMiddleware };
