const express = require("express");
const {
  signupController,
  loginController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} = require("../controllers/userController");
const { requireLogIn, requireAdmin } = require("../middleware/authentication");
const router = express.Router();

// create a user{ Method || POST }
router.post("/signup", signupController);

//  LOGIN user { Method || POST }
router.post("/login", loginController);

// Forgot password { Method || POST }
router.post("/forgot-password", forgotPasswordController);

//protected routes for users and admin { Method || GET }
router.get("/user-dashboard", requireLogIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/admin-panel", requireLogIn, requireAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update a profile { Method || PUT }
router.put("/update-profile", requireLogIn, updateProfileController);

// Users orders get { Method || Get }
router.get("/orders", requireLogIn, getOrdersController);

//Admin All orders { Method || GET }
router.get("/all-orders", requireLogIn, requireAdmin, getAllOrdersController);

//Admin edit Orders { Method || PUT }
router.put(
  "/order-status/:orderId",
  requireLogIn,
  requireAdmin,
  orderStatusController
);

module.exports = router;
