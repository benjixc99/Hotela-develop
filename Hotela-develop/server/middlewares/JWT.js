import * as dotenv from "dotenv";

import jwt from "jsonwebtoken";

dotenv.config();
const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  throw new Error("JWT_SECRET not defined in environment variables");
}

// Generate JWT Tokens
export const generateToken = ({ user, role }) => {
  const token = jwt.sign({ user, role }, secretKey, { expiresIn: "30d" });
  return token;
};

// Verify JWT Tokens
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json("Unauthorized");
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json("Unauthorized");
    }
    req.user = decoded.user;
    req.role = decoded.role;

    next();
  });
};

// Checking if its an admin making the request
export const isAdmin = (req, res, next) => {
  if (req.role != "Admin") {
    return res
      .status(401)
      .json({ message: "You are not authorized to view the data" });
  }
  next();
};

// Checks if its a User making the request
export const isUser = (req, res, next) => {
  if (req.role !== "User") {
    return res.status(401).json({ message: "Not authorized" });
  }
  next();
};
