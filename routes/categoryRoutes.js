const express = require("express");
const authMiddleware = require("../middleware/authentication.js");
const categoryController = require("../controllers/categoryController.js");

const {
  requireAdmin,
  requireLogIn
} = authMiddleware;

const {
  categoryControlller,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
} = categoryController;

const router = express.Router();

// create category  {METHOD || POST}
router.post(
  "/create-category",
  requireLogIn,
  requireAdmin,
  createCategoryController
);

// Category Update { Method || PUT }
router.put(
  "/update-category/:id",
  requireLogIn,
  requireAdmin,
  updateCategoryController
);

//get All category { Method || GET }
router.get("/all-categories", categoryControlller);

//single category { Method || GET } 
router.get("/category/:slug", singleCategoryController);

//delete category { Method || DELETE }
router.delete(
  "/delete-category/:id",
  requireLogIn,
  requireAdmin,
  deleteCategoryCOntroller
);

module.exports= router;
