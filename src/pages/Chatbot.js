import { IoIosArrowBack, IoIosGlobe } from "react-icons/io";
import { AiOutlineSend } from "react-icons/ai"; 
import { useState } from "react";
import skku_logo2 from "../assets/images/skku_logo2.png";
import chatbotIcon from "../assets/images/chatbot_icon.png";
import Header from "../components/Header";

function Chatbot({ onBack }) {
  const [messages, setMessages] = useState([
    { text: "안녕하세요? 저는 킹고봇입니다. 무엇을 도와드릴까요?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      setTimeout(() => {
        setMessages((prev) => [...prev, { text: "bot response", sender: "bot" }]);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header Section */}
      <Header page="chatbot"/>

      {/* Bot Info Section */}
      <div className="flex items-center justify-center w-full bg-white text-black p-3 border  border-gray-400 rounded-lg">
        <div className="flex items-center bg-white">
          <img src={chatbotIcon} alt="Chatbot Icon" className="h-6 mr-2" />
          <p className="font-bold text-sm bg-white">KINGOBOT(킹고봇)</p>
        </div>
      </div>

      {/* Messages Section */}
      <div className="flex-grow p-3 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 p-3 shadow-md rounded-lg text-sm ${
              message.sender === "user"
                ? "ml-auto mr-2 bg-white text-right max-w-[60%]" // Reduced max width and added `mr-2`
                : "mr-auto bg-white text-left max-w-[70%] ml-2" // Added margin for bot messages
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="flex p-3 border-t bg-white fixed bottom-1 w-full" style={{maxWidth:"400px"}}>
        <input
          className="flex-grow p-2 border border-gray-400 rounded-lg text-sm"
          type="text"
          placeholder="메시지를 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <AiOutlineSend
          size={38}
          className="ml-1 text-gray-500 cursor-pointer bg-white"
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
}

export default Chatbot;
