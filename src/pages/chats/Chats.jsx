// import Header from "../components/header/Header";

import { Outlet } from "react-router-dom";
import ChatList from "../../components/chatList/ChatList";

const Chats = () => {
  return (
    <>
      <div className=" flex flex-col   ">
        <div className="flex flex-row">
          <div className="list w-[30%]  ">
            <ChatList />
          </div>
          <div className=" border-l-2 w-full ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chats;
