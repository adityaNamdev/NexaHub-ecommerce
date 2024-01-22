const User = require("../models/User");
const orderModel= require ("../models/Order");
const { generateHash, compareHash } = require("../utils/generateHash");
const JWT = require("jsonwebtoken");



// create a user 
const signupController = async (req, res) => {
  try {
    const { name, email, password,phoneNumber,role,securityAnswer, address } = req.body;

    //check Validations
    if (!name || !email || !password || !phoneNumber || !securityAnswer || !address) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Check if user already exists
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).send({
        message: "User already exists!!Please login...",
      });
    }

    const hashedPassword = await generateHash(password);
    const user = await new User({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      address,
      securityAnswer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Registration failed",
      error,
    });
  }
};

const loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validation
      if (!email || !password) {
        return res.status(400).send({
          success: false,
          message: "Invalid email or password",
        });
      }
  
      // Check user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found with this email",
        });
      }
  
      // Compare Password
      const isPasswordValid = await compareHash(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).send({
          success: false,
          message: "Invalid password",
        });
      }
  
      // Generate token
      const JWT_SECRET = process.env.JWT_SECRET;
      const token = await JWT.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
  
      res.status(200).send({
        success: true,
        message: "Login successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          securityAnswer: user.securityAnswer,
          address: user.address,
        },
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        message: "Error in login",
        error: error.message
      });
    }
  };
  

const forgotPasswordController = async (req, res) => {
  try {
    const { email, securityAnswer, newPassword } = req.body;
    if (!email || !securityAnswer || !newPassword) {
      res.status(400).send({ message: "All fields are required" });
    }

    const user = await User.findOne({ email, securityAnswer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong email or answer",
      });
    }

    const hashednewPassword = await generateHash(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashednewPassword });
    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};


const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
//orders
 const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }

}

const updateProfileController = async (req, res) => {
  try {
    const { name, password, address, phoneNumber } = req.body;
    const user = await User.findById(req.user._id);

    if (password && password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    const hashedPassword = password ? await generateHash(password) : undefined;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phoneNumber: phoneNumber || user.phoneNumber ,
        address: address || user.address,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      success: false,
      message: "Error while updating profile",
      error,
    });
  }
};



module.exports = {
  signupController,
  loginController,
  forgotPasswordController,
  updateProfileController,
  getAllOrdersController,
  getOrdersController,
  orderStatusController
};
