// src/components/chatbotConfig.js
import  useMessages  from "react-chatbotify";

const Config = {
  botName: "SupportBot",
  initialMessages: [useMessages("Hi! How can I help you today?")],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
};

export default Config;
