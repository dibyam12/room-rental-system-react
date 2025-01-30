import { Link } from "react-router-dom";
import moment from "moment";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { backendUrl } from "../../constants/userConstants";

const ChatList = () => {
  const [messages, setMessages] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  // console.log(userInfo);
  const decode = jwtDecode(userInfo.token);
  // console.log(decode);
  const user_id = decode.user_id;
  console.log(" user_id =" + user_id);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${backendUrl}/myMessages/${user_id}/`);
        console.log(res.data);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [user_id]);
  return (
    <div className="h-[88.5vh] overflow-y-scroll  w-auto">
      <div className="searchBar m-3">
        <input
          type="text"
          placeholder="Search User"
          className="outline outline-1 p-2 w-[95%] rounded-md border-b-neutral-800"
        />
      </div>
      <div className="list-group-item p-1 list-group-item-action hover:bg-gray-300 border-0 w-full">
        {messages.map((message) => (
          <Link
            to={`/message/${
              message.sender === user_id ? message.reciever : message.sender
            }`}
            key={message.id}
          >
            {console.log(message.receiver)}
            <small>
              <div className="badge bg-success float-right text-black">
                {moment.utc(message.date).local().startOf("seconds").fromNow()}
              </div>
            </small>
            <div className="d-flex align-items-start">
              <img
                src={
                  message.sender !== user_id
                    ? message.sender_profile.image
                    : message.receiver_profile.image
                }
                className="rounded-circle mr-1"
                alt="profile"
                width={40}
                height={40}
              />
              <div className="flex-grow-1 ml-3">
                <p className="text-xl font-bold">
                  {message.sender === user_id
                    ? message.receiver_profile.full_name ||
                      message.receiver.username
                    : message.sender.username}
                </p>
                <div className="small font-thin">
                  <small>
                    {message.message.length > 30
                      ? `${message.message.slice(0, 30)}...`
                      : message.message}
                  </small>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
{
  /* <div className="chatList hover:cursor-pointer hover:bg-slate-100 w-full">
        <div className="card flex items-center flex-row justify-start rounded-sm outline-1 p-5">
          <div className="img rounded-3xl bg-black mr-2 w-[50px] h-[50px] overflow-hidden ">
            <img className="" alt="image" />
          </div>
          <div className="name">
            <p className="text-xl font-bold">Name</p>
            <div className="status font-thin ">active-now</div>
          </div>
        </div>
      </div> */
}
