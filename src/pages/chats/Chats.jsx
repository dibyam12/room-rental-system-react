// import Header from "../components/header/Header";

import ChatDetail from "../../components/chatDetail/ChatDetail";
import ChatList from "../../components/chatList/ChatList";
const Chats = () => {
  return (
    <>
      <div className=" flex flex-col   ">
        <div className="flex flex-row">
          <div className="list w-[30%]  ">
            <ChatList />
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
