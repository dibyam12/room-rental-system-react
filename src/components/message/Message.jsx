// src/components/MessageComponent.js
import React, { useEffect, useState } from "react";
import {
  fetchChatUsers,
  getMessages,
  sendMessage,
} from "../../actions/chatActions.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchRegistrationDetail } from "../../actions/userActions.jsx";
import { fetchMessages } from "../../actions/chatActions.jsx";
import { IoSendOutline } from "react-icons/io5";
import {useSearchParams} from "react-router-dom";
const MessageComponent = () => {
  const registrationDetail = useSelector((state) => state.registrationDetail);
  const { user } = registrationDetail;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const msgs = searchParams.get('m')

  useEffect(() => {
    dispatch(fetchChatUsers());
  }, [dispatch]);
  
  useEffect(() => {
    if (msgs) {
      setMessageInput(msgs); // Set the input value to msgs
      handleSendMessage(); // Automatically trigger the send button
    }
  }, [msgs]);
  
  
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  console.log(user, "userrrrrrrrrrrrrrr");
  const senderId = user.user;
  const { id: receiverId } = useParams();
  console.log(receiverId, "receiverrrrr");
  // console.log(receiverId,'receiverrrrr')
  const userChatList = [];
  const {
    messages: message,
    loading,
    error,
  } = useSelector((state) => state.chat);
  //

  //

  useEffect(() => {
    dispatch(fetchRegistrationDetail());
  }, [dispatch]);
  useEffect(() => {
    if (senderId && receiverId) {
      dispatch(fetchMessages(senderId, receiverId));
    }
  }, [dispatch, senderId, receiverId]);

 
  const handleSendMessage = async () => {
    if (messageInput.trim()) {
      const messageData = {
        sender: senderId,
        receiver: Number(receiverId),
        message: messageInput,
        is_read: false,
      };
      console.log(senderId, receiverId);

      try {
        await sendMessage(messageData);
        setMessageInput("");
        const updatedMessages = await getMessages(senderId, Number(receiverId));
        setMessages(updatedMessages);
        
      navigate(`/message/${receiverId}`)
        console.log('nabigation hahahaha')

        
    // Force a reload after navigation
    setTimeout(() => {
      window.location.reload();
    }, 500); // Small delay to ensure navigation happens first

      } catch (error) {
        console.error("Error sending message:", error);
        navigate(`/message/${receiverId}`)
        console.log('nabigation hahahaha')

        
    // Force a reload after navigation
    setTimeout(() => {
      window.location.reload();
    }, 500); // Small delay to ensure navigation happens first

      }
    }
  };
    useEffect(() => {
    if (msgs) {
      setMessageInput(msgs); // Set the input value to `msgs`
      const sendMessageAfterInput = async () => {
        await handleSendMessage(); // Trigger send after input updates
      };
      sendMessageAfterInput();
    }
  }, [msgs, senderId, receiverId]);

  return (
    

    <>
      <div className="flex w-full h-[89vh] flex-row overflow-hidden">
        {/* Left Side: Chat List */}
        <div className="rounded-box grid h-full w-[20%] flex-grow overflow-y-scroll place-items-stretch">
          <div>
            {(() => {
              const userChatSet = new Set(); // To store unique users in the chat
              const uniqueChats = message
                .slice()
                .reverse()
                .filter((chat) => {
                  // Determine if the logged-in user is the sender or receiver
                  const isUserInvolved =
                    user.user === chat.receiver || user.user === chat.sender;

                  // Add the counterpart to the set (other user's ID)
                  const counterpart =
                    user.user === chat.sender ? chat.receiver : chat.sender;

                  // Ensure only unique chats are processed
                  if (isUserInvolved && !userChatSet.has(counterpart)) {
                    userChatSet.add(counterpart);
                    return true; // Include this chat
                  }
                  return false; // Skip duplicates
                });

              return uniqueChats.map((chat, index) => {
                const isUserSender = user.user === chat.sender;

                // Display the counterpart's name and latest message
                return (
                  <div
                    key={index}
                    className="chatList hover:cursor-pointer hover:bg-slate-100 w-full"
                    onClick={() =>
                      navigate(
                        `/message/${isUserSender ? chat.receiver : chat.sender}`
                      )
                    }
                  >
                    <div className="card flex items-center flex-row justify-start rounded-sm outline-1 p-5">
                      <div className="name">
                        <p className="text-xl font-bold">
                          {/* Display the counterpart's name */}
                          {isUserSender
                            ? chat.receiver_name
                            : chat.sender_name}{" "}
                          &nbsp;
                          <time className="text-xs opacity-50">
                            {new Date(chat.date).toLocaleString()}
                          </time>
                        </p>
                        <div className="status font-thin">{chat.message}</div>
                      </div>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>

        {/* Divider */}
        <div className="divider lg:divider-horizontal !m-0"></div>

        {/* Right Side: Chat Messages */}
        <div className=" h-full w-[80%] ml-0 place-items-stretch ">
          <div className="test h-full overflow-y-scroll pb-[72px]">
            {loading ? (
              <div className="flex items-center justify-center">
                <span className="loading loading-spinner text-info"></span>
              </div>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <>
                {message
                  .filter(
                    (msg) =>
                      (msg.sender === senderId &&
                        msg.receiver === Number(receiverId)) ||
                      (msg.receiver === senderId &&
                        msg.sender === Number(receiverId))
                  )
                  .map((msg) => (
                    <div key={msg.id}>
                      {msg.sender === senderId ? (
                        // Sender message (chat-end)
                        <div className="chat chat-end">
                          <div className="chat-header font-semibold">
                            {msg.sender_name}
                            <time className="text-xs opacity-50">
                              &nbsp; {new Date(msg.date).toLocaleString()}
                            </time>
                          </div>
                          <div className="chat-bubble bg-cyan-600 text-white">
                            {msg.message}
                          </div>
                        </div>
                      ) : (
                        // Receiver message (chat-start)
                        <div className="chat chat-start">
                          <div className="chat-header">
                            {msg.sender_name} &nbsp;
                            <time className="text-xs opacity-50">
                              {new Date(msg.date).toLocaleString()}
                            </time>
                          </div>
                          <div className="chat-bubble bg-cyan-600 text-white">
                            {msg.message}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </>
            )}
          </div>

          {/* Footer: Input Box */}
          <div className="footer h-[72px] bg-cyan-600 flex items-center sticky bottom-0  pb-3z-10">
          <input
              type="text"
              value={messageInput}
              className="m-2 w-[90%] p-4 border-0 shadow-md rounded-full bg-light outline-none"
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message"
            />
            <button
              onClick={handleSendMessage}
              className="hover:bg-gray-200 w-[55px] rounded-full shadow-md p-4 ml-2 cursor-pointer outline outline-white"
            >
              <IoSendOutline className="w-full h-6 text-white hover:text-cyan-600" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageComponent;
