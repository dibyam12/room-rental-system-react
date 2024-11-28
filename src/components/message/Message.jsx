// src/components/MessageComponent.js
import React, { useEffect, useState } from 'react';
import {fetchChatUsers, getMessages, sendMessage} from '../../actions/chatActions.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import { fetchRegistrationDetail } from '../../actions/userActions.jsx';
import {fetchMessages} from "../../actions/chatActions.jsx";
const MessageComponent = () => {
  const registrationDetail = useSelector((state) => state.registrationDetail);
  const { user } = registrationDetail;
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  useEffect(() => {
    dispatch(fetchChatUsers());
  }, [dispatch]);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const senderId = user.id;
  const { id: receiverId } = useParams();
  const userChatList = []
    const { messages:message, loading, error } = useSelector((state) => state.chat);
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

 useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 20000);

    return () => clearInterval(interval);
  }, []);
  const handleSendMessage = async () => {
    if (messageInput.trim()) {
      const messageData = {
        sender: senderId,
        receiver: Number(receiverId),
        message: messageInput,
        is_read: false,
      };

      try {
        await sendMessage(messageData);
        setMessageInput('');
        const updatedMessages = await getMessages(senderId, Number(receiverId));
        setMessages(updatedMessages);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div>
      <div className={"test"}>
        <div>
          <h1>Messages</h1>
          {loading ? (
              <p>Loading messages...</p>
          ) : error ? (
              <p>Error: {error}</p>
          ) : (
              <div>
                {message.map(msg=> console.log(msg.receiver, receiverId))}
                 {message.map((msg) => (
    ((msg.sender === senderId + 1 || msg.receiver === senderId + 1) &&
   (msg.sender === Number(receiverId)  || msg.receiver === Number(receiverId) )) ? (
      <div key={msg.id}>
        <p>
            {/*<p>sender = {msg.sender_name}</p>*/}
            {/*<p>reciever = {msg.receiver_name}</p>*/}
          <strong>{msg.sender_name} {msg.sender}</strong>: {msg.message} <br/>
          <small>{new Date(msg.date).toLocaleString()}</small>
        </p>
      </div>
    ) : null
))}
              

              </div>
          )}
          <div>
          
          </div>
        </div>
      </div>
      <h1>Chat History</h1>
      
      <div>
        <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type your message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
        {/*////////////////------------ users chat list ----------------////////////*/}
        <div>left side ko yo chat list
            {message.slice().reverse().map((userchat,index) => (
    !userChatList.includes(userchat.receiver) && (
        
        <div key={index}>
            {user.id+1 === userchat.receiver || user.id+1 === userchat.sender && (
                <div>
                    <div className={'text-white'}>{userChatList.push(userchat.receiver)}</div>
                    {console.log(userChatList)}
                    <div onClick={() => navigate(`/message/${userchat.receiver}`)}>
                        <p>
                            {userchat.receiver_name}
                        </p>
                        <p>
                            {userchat.message}
                        </p>
                    </div>
                </div>
            )}
        
        </div>
    )
            ))}
        </div>
    </div>
  );
};

export default MessageComponent;
