import User from "../models/user.model.js";

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
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = new User({
      fullName,
      userName,
      password,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      userName: newUser.userName,
      password: newUser.password,
      gender: newUser.gender,
    });
  } catch (error) {
    console.log(error.message, "Error in signup controller");
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
export const login = (req, res) => {
  console.log("login");
};

export const logout = (req, res) => {
  console.log("logout");
};
