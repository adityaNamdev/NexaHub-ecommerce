const User = require("../models/User");
const JWT = require("jsonwebtoken");

// Secured routes with token-based authentication.
const requireLogIn = async (req, res, next) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;

    const decodedToken = JWT.verify(
        req.headers.authorization,
         JWT_SECRET);

    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error);
  }
};

// Check the admin acceess
const requireAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== "ADMIN") {
      return res.status(401).send({
        success: false,
        message: "Access forbidden",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: 'Unauthorized Access',
    });
  }
};

module.exports = { requireLogIn, requireAdmin };
