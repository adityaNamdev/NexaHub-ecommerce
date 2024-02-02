const express = require("express");
const {
  brainTreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productPhotoController,
  realtedProductController,
  searchProductController,
  updateProductController,
} = require("../controllers/productController.js");
const formidable = require("express-formidable");
const {
  requireLogIn,
  requireAdmin,
} = require("../middleware/authentication.js");

const router = express.Router();

router.post(
  "/create-product",
  requireLogIn,
  requireAdmin,
  formidable(),
  createProductController
);

router.put(
  "/update-product/:pid",
  requireLogIn,
  requireAdmin,
  formidable(),
  updateProductController
);

router.get("/all-products", getProductController);

router.get("/get-product/:slug", getSingleProductController);

router.get("/product-photo/:pid", productPhotoController);

router.delete("/delete-product/:pid", deleteProductController);

router.get("/product-count", productCountController);

router.get("/search/:keyword", searchProductController);

router.get("/related-product/:pid/:cid", realtedProductController);

router.get("/product-category/:slug", productCategoryController);

router.get("/braintree/token", braintreeTokenController);

router.post("/braintree/payment", requireLogIn, brainTreePaymentController);

module.exports = router;
