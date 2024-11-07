import { IoCall } from "react-icons/io5";
import PropTypes from "prop-types";
import { IoSendOutline } from "react-icons/io5";
import { useState } from "react";
import { backendUrl } from "../../constants/userConstants";
import axios from "axios";

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

const ChatDetail = ({ selectedChat, user_id }) => {
  const [newMessage, setNewMessage] = useState("");
  const SendMessage = () => {
    const formdata = new FormData();
    formdata.append("user", user_id);
    formdata.append("sender", user_id);
    formdata.append("reciever", selectedChat.sender.id); // or reciever id based on chat data structure
    formdata.append("message", newMessage);
    formdata.append("is_read", false);

    axios
      .post(`${backendUrl}/send-messages/`, formdata)
      .then(() => {
        document.getElementById("text-input").value = "";
        setNewMessage(""); // Clear message after sending
      })
      .catch((error) => {
        console.log("error ===", error);
      });
  };

  if (!selectedChat) {
    return (
      <div className="flex items-center justify-center h-full">
        Select a chat to view messages
      </div>
    );
  }

  return (
    <div className="detail-wrapper h-full">
      <div className="nav sticky top-0 bg-white border-b-2">
        <nav className="flex items-center justify-between p-2">
          <div className="name text-2xl font-bold">
            {selectedChat.sender.id === user_id
              ? selectedChat.reciever_profile.full_name
              : selectedChat.sender.username}
          </div>
          <div className="p-3 hover:bg-gray-100 w-[50px] rounded-md cursor-pointer">
            <IoCall className="w-full" />
          </div>
        </nav>
      </div>

      <div className="messages h-[75%] overflow-y-scroll p-4">
        {selectedChat.conversation.map((msg, index) => (
          <div
            key={index}
            className={`w-[50%] p-4 rounded-b-xl ${
              msg.sender_id === user_id
                ? "bg-cyan-600 text-white ml-auto rounded-tl-xl"
                : "bg-gray-300 rounded-tr-xl"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>

      <div className="footer h-[20%] bg-cyan-600 flex items-center">
        <input
          className="m-2 w-[90%] p-4 border-0 shadow-md rounded-full bg-light outline-none"
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
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

// Define PropTypes for ChatDetail
ChatDetail.propTypes = {
  selectedChat: PropTypes.shape({
    conversation: PropTypes.arrayOf(
      PropTypes.shape({
        message: PropTypes.string,
        sender_id: PropTypes.number,
      })
    ),
    sender: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string,
    }),
    reciever_profile: PropTypes.shape({
      full_name: PropTypes.string,
    }),
  }),
  user_id: PropTypes.number.isRequired,
};

export default ChatDetail;
