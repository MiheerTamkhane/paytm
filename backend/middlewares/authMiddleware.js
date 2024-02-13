const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(403).json({});
  }
  console.log(auth);
  const token = auth.split(" ")[1];

  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);
    req.userId = user.userId;
    next();
  } catch (err) {
    res.status(403).json({
      message: err,
    });
  }
}

module.exports = authMiddleware;
