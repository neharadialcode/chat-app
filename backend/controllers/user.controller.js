import User from "../models/user.model.js";

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredusers = await User.find({
      _id: {
        $ne: loggedInUserId, //this code is for hide the user self id
      },
    }).select("-password");
    res.status(200).json(filteredusers);
  } catch (error) {
    console.log("error in user controller", error.message),
      res.status(500).json({
        error: "Internal server error",
      });
  }
};
