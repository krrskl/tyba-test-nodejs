const jwt = require("jsonwebtoken");
const config = require("./../config");

const verificarToken = (req, res, next) => {
  const token = req.get("token");
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      res.status(401).json({
        ok: false,
        err,
      });
    }
    req.user = decoded;
    next();
  });
};

module.exports = verificarToken;
