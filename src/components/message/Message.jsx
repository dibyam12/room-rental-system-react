// src/components/MessageComponent.js
import React, { useEffect, useState } from 'react';
import { getMessages, sendMessage } from '../../actions/chatActions.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRegistrationDetail } from '../../actions/userActions.jsx';
import {fetchMessages} from "../../actions/chatActions.jsx";
const MessageComponent = () => {
  const registrationDetail = useSelector((state) => state.registrationDetail);
  const { user } = registrationDetail;
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const senderId = user.id;
  const { id: receiverId } = useParams();
    const { messages:message, loading, error } = useSelector((state) => state.chat);

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
                 {message.map((msg) => (
    (msg.sender === senderId+1 || msg.receiver === senderId+1) ? (
      <div key={msg.id}>
        <p>
          <strong>Sender {msg.sender}</strong>: {msg.message} <br/>
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
    </div>
  );
};

export default MessageComponent;
