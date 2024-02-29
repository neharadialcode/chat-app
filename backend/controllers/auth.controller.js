import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generatetoken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({
        error: "Invalid password",
      });
    }
    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ error: "username is already exist" });
    }
    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // USER PROFILE
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    await newUser.save();
    if (newUser) {
      // GENERATE JWT HERE
      await generateTokenAndSetCookie(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        password: newUser.password,
        gender: newUser.gender,
      });
    } else {
      res.status(201).json({
        error: "Invalid User data",
      });
    }
  } catch (error) {
    console.log(error.message, "Error in signup controller");
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    const isPasswordCorret = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorret) {
      return res.status(400).json({ error: "invalid username or password" });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      password: user.password,
      gender: user.gender,
    });
  } catch (error) {
    console.log(error.message, "Error in login controller");
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
      message: "logout successfully",
    });
  } catch (error) {
    console.log(error.message, "Error in logout controller");
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
