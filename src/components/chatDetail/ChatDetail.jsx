import { IoCall } from "react-icons/io5";
import PropTypes from "prop-types";
import { IoSendOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { backendUrl } from "../../constants/userConstants";
import axios from "axios";
import { useParams } from "react-router-dom";

// const ChatDetail = ({ selectedChat }) => {
//   return (
//     <div className="detail-wrapper h-[85vh]">
//       <div className="nav sticky top-0 bg-white ">
//         <nav className=" border-b-2 w-full h-[55px] items-center justify-between p-2 flex flex-row">
//           <div className="name text-2xl font-bold">Name</div>
//           <div className=" p-3  hover:bg-gray-100  w-[50px] rounded-md hover:cursor-pointer">
//             <IoCall className=" w-full" />
//             {/* <a href={`tel:+977${}`}></a> */}
//           </div>
//         </nav>
//       </div>
//       <div className="messages h-[75%] overflow-y-scroll ">
//         <div className="  p-14">
//           <div className=" w-[50%] m-4 p-4 bg-gray-300 rounded-b-xl rounded-tr-xl">
//             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem
//             natus impedit, ea nobis repellat aliquam nihil, quidem libero
//             accusantium dolores dignissimos doloremque ducimus qui facere unde
//             nemo dolorem distinctio. Dolores.
//           </div>
//           <div className=" w-[50%] p-4 bg-cyan-600 text-white rounded-b-xl rounded-tl-xl ml-auto">
//             Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//             Exercitationem, sunt perferendis. Sint deleniti eos itaque rem culpa
//             ex totam, aspernatur, est voluptates quae accusamus aliquid,
//             necessitatibus ab odio ducimus temporibus?
//           </div>
//         </div>
//       </div>
//       <div className="footer h-[20%] bg-cyan-600  flex w-full  items-center">
//         <input
//           className="m-2 w-[90%] p-4 border-0 shadow-md rounded-full bg-light focus:border-0 outline-none "
//           type="text"
//           placeholder="Type your message....."
//         />
//         <div className="   hover:bg-gray-200  w-[55px] rounded-full shadow-md bg-white hover:cursor-pointer p-4 items-center ml-2">
//           <IoSendOutline className=" w-full h-6" />
//         </div>
//       </div>
//     </div>
//   );
// };

const ChatDetail = () => {
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  let [newMessage, setnewMessage] = useState({ message: "" });

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const decode = jwtDecode(userInfo.token);
  const id = useParams();
  const user_id = decode.user_id;
  const username = userInfo.usesrname;
  console.log(user_id);
  console.log(id.id);
  console.log(userInfo.username);

  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     try {
  //       const res = await axios.get(`${backendUrl}/myMessages/${user_id}/`);
  //       setMessages(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchMessages();
  // }, [user_id]);

  // Fetches real-time messages for specific chat at regular intervals
  useEffect(() => {
    let interval = setInterval(() => {
      try {
        axios
          .get(`${backendUrl}/getMessages/${user_id}/${id.id}/`)

          .then((res) => {
            setMessage(res.data);
            console.log(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [user_id, id.id]);

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       await axios.get(`${backendUrl}/profile/${id.id}/`).then((res) => {
  //         setProfile(res.data);
  //         setUser(res.data.user);
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchProfile();
  // }, [id]);

  const SendMessage = () => {
    const formdata = new FormData();
    formdata.append("user", user_id);
    formdata.append("sender", user_id);
    formdata.append("receiver", id.id);
    formdata.append("message", newMessage.message);
    formdata.append("is_read", false);
    console.log(formdata);

    try {
      axios.post(`${backendUrl}/sendMessages/`, formdata).then(() => {
        document.getElementById("text-input").value = "";
        setnewMessage({ message: "" });
      });
    } catch (error) {
      console.log("error ===", error);
    }
  };
  const handleChange = (event) => {
    setnewMessage({
      message: event.target.value,
    });
  };

  return (
    <div className="detail-wrapper h-full">
      <div className="nav sticky top-0 bg-white border-b-2">
        <nav className="flex items-center justify-between p-2">
          <div className="name text-2xl font-bold">
            {/* {message.sender.id === user_id
              ? message.receiver_profile.full_name || message.receiver.username
              : message.sender.username} */}
            Namejgjhghggggggggggggggggg
          </div>
          <div className="p-3 hover:bg-gray-100 w-[50px] rounded-md cursor-pointer">
            <IoCall className="w-full" />
          </div>
        </nav>
      </div>

      {/* Messages */}
      <div className="messages h-[75%] overflow-y-scroll p-4 space-y-4">
        {message.length > 0 ? (
          message.map((msg, index) => (
            <div
              key={index}
              className={`p-4 w-[50%] ${
                msg.sender === user_id
                  ? "bg-cyan-600 text-white rounded-b-xl rounded-tl-xl ml-auto"
                  : "bg-gray-300 rounded-b-xl rounded-tr-xl"
              }`}
            >
              {msg.message}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">Loading...</div>
        )}
      </div>

      <div className="footer h-[20%] bg-cyan-600 flex items-center">
        <input
          id="text-input"
          className="m-2 w-[90%] p-4 border-0 shadow-md rounded-full bg-light outline-none"
          type="text"
          placeholder="Type your message..."
          value={newMessage.message}
          onChange={handleChange}
        />
        <div
          className="hover:bg-gray-200 w-[55px] rounded-full shadow-md bg-white p-4 ml-2 cursor-pointer "
          onClick={SendMessage}
        >
          <IoSendOutline className="w-full h-6" />
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
