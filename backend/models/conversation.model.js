import mongoose from "mongoose";
const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Messages",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Message", conversationSchema);
export default Conversation;
