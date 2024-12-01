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
const MessageComponent = () => {
  const registrationDetail = useSelector((state) => state.registrationDetail);
  const { user } = registrationDetail;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchChatUsers());
  }, [dispatch]);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  console.log(user,'userrrrrrrrrrrrrrr')
  const senderId = user.id;
  const { id: receiverId } = useParams();
  console.log(receiverId,'receiverrrrr')
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

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     window.location.reload();
  //   }, 20000);

  //   return () => clearInterval(interval);
  // }, []);
  const handleSendMessage = async () => {
    if (messageInput.trim()) {
      const messageData = {
        sender: senderId,
        receiver: Number(receiverId),
        message: messageInput,
        is_read: false,
      };
      console.log(senderId,receiverId)

      try {
        await sendMessage(messageData);
        setMessageInput("");
        const updatedMessages = await getMessages(senderId, Number(receiverId));
        setMessages(updatedMessages);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    // <div>
    //   <div className="flex w-full h-[88.5vh] flex-col lg:flex-row">
    //     <div className=" rounded-box grid h-full w-[20%] flex-grow overflow-y-scroll place-items-stretch">
    //       <div>
    //         left side ko yo chat list
    //         {message
    //           .slice()
    //           .reverse()
    //           .map(
    //             (userchat, index) =>
    //               !userChatList.includes(userchat.receiver) && (
    //                 <div key={index}>
    //                   {user.id + 1 === userchat.receiver ||
    //                     (user.id + 1 === userchat.sender && (
    //                       <div>
    //                         {/* <div className={"text-white"}>
    //                       {userChatList.push(userchat.receiver)}
    //                     </div>
    //                     {console.log(userChatList)} */}
    //                         {/* <div
    //                       onClick={() =>
    //                         navigate(`/message/${userchat.receiver}`)
    //                       }
    //                     >
    //                       <p>{userchat.receiver_name}</p>
    //                       <p>{userchat.message}</p>
    //                     </div> */}

    //                         <div className="chatList hover:cursor-pointer hover:bg-slate-100 w-full">
    //                           <div className="card flex items-center flex-row justify-start rounded-sm outline-1 p-5">
    //                             <div
    //                               className="name"
    //                               onClick={() =>
    //                                 navigate(`/message/${userchat.receiver}`)
    //                               }
    //                             >
    //                               <p className="text-xl font-bold">
    //                                 {userchat.receiver_name} &nbsp;{" "}
    //                                 <time className="text-xs opacity-50">
    //                                   {new Date(userchat.date).toLocaleString()}
    //                                 </time>
    //                               </p>
    //                               <div className="status font-thin ">
    //                                 {userchat.message}
    //                               </div>
    //                             </div>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     ))}
    //                 </div>
    //               )
    //           )}
    //       </div>
    //     </div>
    //     <div className="divider lg:divider-horizontal"></div>
    //     <div className="  grid h-[100%] w-[80%]  place-items-stretch relative">
    //       <div className="h-full overflow-y-scroll pb-[72px]">
    //         <div>
    //           {loading ? (
    //             <p>Loading messages...</p>
    //           ) : error ? (
    //             <p>Error: {error}</p>
    //           ) : (
    //             // <div>
    //             //   {message.map((msg) => console.log(msg.receiver, receiverId))}
    //             //   {message.map((msg) =>
    //             //     (msg.sender === senderId + 1 ||
    //             //       msg.receiver === senderId + 1) &&
    //             //     (msg.sender === Number(receiverId) ||
    //             //       msg.receiver === Number(receiverId)) ? (
    //             //       <div key={msg.id}>
    //             //         <p>
    //             //           {/*<p>sender = {msg.sender_name}</p>*/}
    //             //           {/*<p>reciever = {msg.receiver_name}</p>*/}
    //             //           {/* <strong> */}
    //             //           {/* {msg.sender_name} {msg.sender} */}
    //             //           {/* </strong> */}
    //             //           {/* : {msg.message} <br /> */}
    //             //           {/* <small>{new Date(msg.date).toLocaleString()}</small> */}
    //             //         </p>

    //             //         <div className="chat chat-start">
    //             //           <div className="chat-header">
    //             //             {msg.receiver_name} {msg.receiver}
    //             //             <time className="text-xs opacity-50">
    //             //               {new Date(msg.date).toLocaleString()}
    //             //             </time>
    //             //           </div>
    //             //           <div className="chat-bubble">{msg.message} </div>
    //             //         </div>
    //             //         <div className="chat chat-end">
    //             //           <div className="chat-header">
    //             //             {msg.sender_name} {msg.sender}
    //             //             <time className="text-xs opacity-50">
    //             //               {new Date(msg.date).toLocaleString()}
    //             //             </time>
    //             //           </div>
    //             //           <div className="chat-bubble">{msg.message} </div>
    //             //         </div>
    //             //       </div>
    //             //     ) : null
    //             //   )}
    //             // </div>

    //             <>
    //               <div>
    //                 {message.map((msg) =>
    //                   (msg.sender === senderId + 1 ||
    //                     msg.receiver === senderId + 1) &&
    //                   (msg.sender === Number(receiverId) ||
    //                     msg.receiver === Number(receiverId)) ? (
    //                     <div key={msg.id}>
    //                       {msg.sender === senderId + 1 ? (
    //                         // Sender message (chat-end)
    //                         <div className="chat chat-end">
    //                           <div className="chat-header font-semibold">
    //                             {msg.sender_name}
    //                             {/* {msg.sender} */}
    //                             <time className="text-xs opacity-50">
    //                               &nbsp; {new Date(msg.date).toLocaleString()}
    //                             </time>
    //                           </div>
    //                           <div className="chat-bubble bg-cyan-600 text-white">
    //                             {msg.message}
    //                           </div>
    //                         </div>
    //                       ) : (
    //                         // Receiver message (chat-start)
    //                         <div className="chat chat-start">
    //                           <div className="chat-header">
    //                             {msg.sender_name} &nbsp;
    //                             {/* {msg.sender} */}
    //                             <time className="text-xs opacity-50">
    //                               {new Date(msg.date).toLocaleString()}
    //                             </time>
    //                           </div>
    //                           <div className="chat-bubble bg-cyan-600 text-white">
    //                             {msg.message}
    //                           </div>
    //                         </div>
    //                       )}
    //                     </div>
    //                   ) : null
    //                 )}
    //               </div>
    //               <div className="footer h-[72px] bg-cyan-600 flex items-center sticky bottom-0 z-10">
    //                 <input
    //                   type="text"
    //                   value={messageInput}
    //                   className="m-2 w-[90%] p-4 border-0 shadow-md rounded-full bg-light outline-none"
    //                   onChange={(e) => setMessageInput(e.target.value)}
    //                   placeholder="Type your message"
    //                 />
    //                 <button
    //                   onClick={handleSendMessage}
    //                   className="hover:bg-gray-200 w-[55px] rounded-full shadow-md p-4 ml-2 cursor-pointer outline outline-white"
    //                 >
    //                   <IoSendOutline className="w-full h-6 text-white hover:text-cyan-600" />
    //                 </button>
    //               </div>
    //             </>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <>
      <div className="flex w-full h-[89vh] flex-row overflow-hidden">
        {/* Left Side: Chat List */}
        <div className="rounded-box grid h-full w-[20%] flex-grow overflow-y-scroll place-items-stretch">
          <div>
            {message
              .slice()
              .reverse()
              .map(
                (userchat, index) =>
                  !userChatList.includes(userchat.receiver) && (
                    <div key={index}>
                        <p className='text-white'>{userChatList.push(userchat.receiver)}</p>
                      {user.id + 4 === userchat.receiver ||
                        (user.id + 4 === userchat.sender && (
                          <div
                            className="chatList hover:cursor-pointer hover:bg-slate-100 w-full"
                            onClick={() =>
                              navigate(`/message/${userchat.receiver}`)
                            }
                          >
                            <div className="card flex items-center flex-row justify-start rounded-sm outline-1 p-5">
                              <div className="name">
                                <p className="text-xl font-bold">
                                  {userchat.receiver_name} &nbsp;{" "}
                                  <time className="text-xs opacity-50">
                                    {new Date(userchat.date).toLocaleString()}
                                  </time>
                                </p>
                                <div className="status font-thin ">
                                  {userchat.message}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )
              )}
          </div>
        </div>

        {/* Divider */}
        <div className="divider lg:divider-horizontal !m-0"></div>

        {/* Right Side: Chat Messages */}
        <div className=" h-full w-[80%] ml-0 place-items-stretch ">
          <div className="test h-full overflow-y-scroll pb-[72px]">
            {loading ? (
              <p>Loading messages...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <>hii
                {message.map((msg) =>
                  (msg.sender === senderId + 4 ||
                    msg.receiver === senderId + 4) &&
                  (msg.sender === Number(receiverId) ||
                    msg.receiver === Number(receiverId)) ? (
                    <div key={msg.id}>
                      {msg.sender === senderId + 4 ? (
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
                  ) : null
                )}
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