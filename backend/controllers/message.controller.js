import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
export const sendMessages = async (req, res) => {
  //   console.log("message is sent", req.params.id);
  try {
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;
    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, recieverId],
      },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }
    const newMessage = new Message({
      senderId,
      recieverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    // SOCKET IO FUNCTIONALITY ================
    // await conversation.save();
    // await newMessage.save();
    await Promise.all([conversation.save(), newMessage.save()]);
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("error in send message controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getMessages = async (req, res) => {
  //   console.log("message is sent", req.params.id);
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, userToChatId],
      },
    }).populate("messages");
    if (!conversation) {
      return res.status(200).json([]);
    }
    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.log("error in get message controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
