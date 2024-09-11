import { getMonthlyCounts } from "../middlewares/Analytics/analytics.js";
import { generateToken } from "../middlewares/JWT.js";
import { OTP } from "../middlewares/OTP/otpMiddleware.js";
import { sendMail } from "../middlewares/SendMail/sendGrid.js";
import Hotel from "../models/hotelModel.js";
import users from "../models/userModel.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

//Create user account
export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, role } = req.body;
    const existing = await users.findOne({ email });
    if (existing) {
      return res.status(401).json("Email already in use");
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const generateOTP = OTP();
    const userDetails = new users({
      firstName,
      lastName,
      email,
      password: hashPassword,
      phoneNumber,
      role: role || "User",
      otp: generateOTP.value,
      otpExpires: generateOTP.expiresIn,
    });
    const newUser = await userDetails.save();
    let templateData = {
      FullName: `${firstName} ${lastName}`,
      OTPCODE: userDetails.otp,
    };
    await sendMail({
      to: newUser.email,
      subject: "Verification Code",
      templateName: "OTP",
      templateData,
    });
    const { password, resetPasswordToken, resetPasswordExpires, ...userInfo } =
      newUser._doc;
    const token = generateToken({ user: userInfo, role: userInfo.role });
    res.status(201).json({ userInfo, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//Create admin account
export const adminSignUp = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber } = req.body;
    const existing = await users.findOne({ email });
    if (existing) {
      return res.status(401).json({ message: "Email already in use" });
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const generateOTP = OTP();
    const userDetails = new users({
      firstName,
      lastName,
      email,
      role: "Admin",
      password: hashPassword,
      phoneNumber,
      otp: generateOTP.value,
      otpExpires: generateOTP.expiresIn,
    });
    const newUser = await userDetails.save();
    const { password, resetPasswordToken, resetPasswordExpires, ...userInfo } =
      newUser._doc;
    const token = generateToken({ user: userInfo, role: userInfo.role });
    res.status(201).json({ userInfo, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// User login
export const login = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(401).json("User not found");
    }
    const isMatched = await bcrypt.compare(req.body.password, user.password);
    if (!isMatched) {
      return res.status(401).json("Invalid or incorrect credentials");
    }
    const { password, resetPasswordToken, resetPasswordExpires, ...userInfo } =
      user._doc;
    const token = generateToken({ user: userInfo, role: userInfo.role });
    res.status(200).json({ userInfo, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(401).json("User not found");
    }
    if (user.role !== "Admin") {
      return res.status(401).json("You are not allowed to login here");
    }
    const isMatched = await bcrypt.compare(req.body.password, user.password);
    if (!isMatched) {
      return res.status(401).json("Invalid or incorrect password");
    }
    const { password, resetPasswordToken, resetPasswordExpires, ...userInfo } =
      user._doc;
    const token = generateToken({ user: userInfo, role: userInfo.role });
    res.status(200).json({ userInfo, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Resend OTP
export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await users.findOne({ email });
    //checking if user exist
    if (!user) {
      return res.status(400).json("User not found");
    }
    const generatedOTP = OTP();
    user.otp = generatedOTP.value;
    user.otpExpires = generatedOTP.expiresIn;
    await user.save();
    let templateData = {
      FullName: `${user.firstName} ${user.lastName}`,
      OTPCODE: user.otp,
    };
    await sendMail({
      to: email,
      subject: "Verification Code",
      templateName: "OTP",
      templateData,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Verify a user account with OTP
export const verifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = await users.findOne({ otp });
    if (!user) {
      return res.status(401).json("User not found");
    }
    if (otp !== user.otp) {
      return res.status(401).json("Invalid or Incorrect OTP");
    }
    if (new Date() > new Date(user.otpExpires)) {
      return res.status(401).json("Expired OTP");
    }
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    res.status(200).json("Successfully Verified");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// get all users
export const getAllUser = async (req, res) => {
  try {
    const user = await users.find({ role: "User" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// get single user by ID
export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await users.findById(id);
    if (!user) {
      return res.status(400).json("User not found or exist");
    }
    const { password, ...data } = user._doc;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Get favorite hotels for a user
export const getUserFavourites = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await users.findById(id).populate("favourites").exec();
    if (!user) {
      return res.status(400).json("User not found or exist");
    }
    const { password, ...data } = user._doc;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//send forgot password link to email
export const forgotPasswordLink = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = await users.findOne({ otp });
    if (otp !== user.otp) {
      return res.status(401).json({ message: "Invalid or Incorrect OTP" });
    }
    const token = crypto.randomBytes(20).toString("hex");
    const tokenExpiryDate = Date.now() + 3600000; //1 hour
    user.resetPasswordToken = token;
    user.resetPasswordExpires = tokenExpiryDate;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    let templateData = {
      forgotPasswordLink: `${process.env.RESET_PASSWORD_URL}/${user.resetPasswordToken}`,
    };
    await sendMail({
      to: user.email,
      subject: "Reset Password",
      templateName: "forgotPassword",
      templateData,
    });
    res.status(200).json({ message: "Reset Link sent to email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { resetPasswordToken } = req.params;
    const { newPassword } = req.body;
    // Check if user exists
    const user = await users.findOne({
      resetPasswordToken,
    });
    if (!user) {
      return res.status(401).json("User not found");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.status(200).json("Password updated successfully");
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error changing password" });
  }
};
// user count
export const getUserAnalysis = async (req, res) => {
  try {
    const { year } = req.query;
    const getNoUSER = await getMonthlyCounts(users, Number(year));
    res.status(200).json(getNoUSER);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// add hotel to user favourite or Wishlist
export const addToFavourite = async (req, res) => {
  try {
    const { userId, hotelId } = req.params;
    // verify user
    const existingUser = await users.findById(userId);
    if (!existingUser) {
      return res.status(401).json({ message: "User not found" });
    }
    //verify hotel
    const existingHotel = await Hotel.findById(hotelId);
    if (!existingHotel) {
      return res.status(401).json({ message: "Hotel not found" });
    }
    //check if the hotel id already exists
    const favourites = existingUser.favourites.includes(hotelId);
    //check if hotel id exist in remove from favorites
    if (favourites) {
      await users.findByIdAndUpdate(userId, {
        $pull: { favourites: hotelId },
      });
      return res.status(200).json("Hotel removed from favorites");
    } else {
      //check if hotel id does not exist in add to favorites
      await users.findByIdAndUpdate(userId, {
        $push: { favourites: hotelId },
      });
      return res.status(200).json("Hotel added to favorites");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
