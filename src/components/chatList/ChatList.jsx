import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";

const ChatList = ({ messages, setSelectedChat, user_id }) => {
  return (
    <div className=" h-[88.5vh] overflow-y-scroll w-auto">
      <div className="searchBar m-3">
        <input
          type="text"
          placeholder="Search User"
          className="outline outline-1 p-2 w-[95%] rounded-md border-b-neutral-800 "
        />
      </div>
      {/* <div className="chatList hover:cursor-pointer hover:bg-slate-100 w-full">
        <div className="card flex items-center flex-row justify-start rounded-sm outline-1 p-5">
          <div className="img rounded-3xl bg-black mr-2 w-[50px] h-[50px] overflow-hidden ">
            <img className="" alt="image" />
          </div>
          <div className="name">
            <p className="text-xl font-bold">Name</p>
            <div className="status font-thin ">active-now</div>
          </div>
        </div>
      </div> */}

      {messages.map((message) => (
        <Link
          to={`/message/${
            message.sender.id === user_id
              ? message.receiver.id
              : message.sender.id
          }/`}
          key={message.id}
          onClick={() => setSelectedChat(message)}
          className="list-group-item list-group-item-action border-0 hover:bg-slate-100 w-full"
        >
          <small>
            <div className="badge bg-success float-right text-white">
              {moment.utc(message.date).local().startOf("seconds").fromNow()}
            </div>
          </small>
          <div className="d-flex align-items-start">
            <img
              src={
                message.sender.id !== user_id
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
                {message.sender.id === user_id
                  ? message.receiver_profile.full_name ||
                    message.receiver.username
                  : message.sender.username}
              </p>
              <div className="small font-thin">
                <small>
                  {message.message.length > 30
                    ? message.message.slice(0, 30) + "..."
                    : message.message}
                </small>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

// Define PropTypes for ChatList
ChatList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      sender: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
      receiver: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
      sender_profile: PropTypes.shape({
        image: PropTypes.string,
      }),
      receiver_profile: PropTypes.shape({
        image: PropTypes.string,
        full_name: PropTypes.string,
      }),
      message: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  setSelectedChat: PropTypes.func.isRequired,
  user_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default ChatList;
