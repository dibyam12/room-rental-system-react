import { IoCall } from "react-icons/io5";
import { IoSendOutline } from "react-icons/io5";

const ChatDetail = () => {
  return (
    <div className="detail-wrapper h-[85vh]">
      <div className="nav sticky top-0 bg-white ">
        <nav className=" border-b-2 w-full h-[55px] items-center justify-between p-2 flex flex-row">
          <div className="name text-2xl font-bold">Name</div>
          <div className=" p-3  hover:bg-gray-100  w-[50px] rounded-md hover:cursor-pointer">
            <IoCall className=" w-full" />
            {/* <a href={`tel:+977${}`}></a> */}
          </div>
        </nav>
      </div>
      <div className="messages h-[75%] overflow-y-scroll ">
        <div className="  p-14">
          <div className=" w-[50%] m-4 p-4 bg-gray-300 rounded-b-xl rounded-tr-xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem
            natus impedit, ea nobis repellat aliquam nihil, quidem libero
            accusantium dolores dignissimos doloremque ducimus qui facere unde
            nemo dolorem distinctio. Dolores.
          </div>
          <div className=" w-[50%] p-4 bg-cyan-600 text-white rounded-b-xl rounded-tl-xl ml-auto">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Exercitationem, sunt perferendis. Sint deleniti eos itaque rem culpa
            ex totam, aspernatur, est voluptates quae accusamus aliquid,
            necessitatibus ab odio ducimus temporibus?
          </div>
          <div className=" w-[50%] m-4 p-4 bg-gray-300 rounded-b-xl rounded-tr-xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem
            natus impedit, ea nobis repellat aliquam nihil, quidem libero
            accusantium dolores dignissimos doloremque ducimus qui facere unde
            nemo dolorem distinctio. Dolores.
          </div>
          <div className=" w-[50%] p-4 bg-cyan-600 text-white rounded-b-xl rounded-tl-xl ml-auto">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Exercitationem, sunt perferendis. Sint deleniti eos itaque rem culpa
            ex totam, aspernatur, est voluptates quae accusamus aliquid,
            necessitatibus ab odio ducimus temporibus?
          </div>
        </div>
      </div>
      <div className="footer h-[20%] bg-cyan-600  flex w-full  items-center">
        <input
          className="m-2 w-[90%] p-4 border-0 shadow-md rounded-full bg-light focus:border-0 outline-none "
          type="text"
          placeholder="Type your message....."
        />
        <div className="   hover:bg-gray-200  w-[55px] rounded-full shadow-md bg-white hover:cursor-pointer p-4 items-center ml-2">
          <IoSendOutline className=" w-full h-6" />
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
