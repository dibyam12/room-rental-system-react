// import Header from "../components/header/Header";

import ChatDetail from "../../components/chatDetail/ChatDetail";
import ChatList from "../../components/chatList/ChatList";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { backendUrl } from "../../constants/userConstants";
import { useEffect, useState } from "react";

const Chats = () => {
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null); // Track selected chat

  const token = localStorage.getItem("userInfo");
  const decoded = jwtDecode(token);
  const user_id = decoded.id;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${backendUrl}/myMessages/${user_id}/`);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [user_id]);
  return (
    <>
      <div className=" flex flex-col   ">
        <div className="flex flex-row">
          <div className="list w-[30%]  ">
            <ChatList
              messages={messages}
              setSelectedChat={setSelectedChat}
              user_id={user_id}
            />
          </div>
          <div className=" border-l-2 ">
            <ChatDetail />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chats;
