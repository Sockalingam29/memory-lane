import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/userModal.js";

dotenv.config();

const secret = process.env.SECRET;

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    
    if (!existingUser)
      return res.status(404).json({
        message: "User doesn't exist!",
      });

    const isCorrectPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isCorrectPassword)
      return res.status(404).json({
        message: "Password is incorrect!",
      });

    const token = await jwt.sign(
      { email: email, id: existingUser._id },
      secret,
      { expiresIn: "1hr" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(404).json({
        message: "User already exists with the same mail id!",
      });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ name, email, password: hashedPassword });
    
    const token =await jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

    res.status(201).json({ result, token });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
