import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomDetail,removeRoom  } from "../../actions/roomActions.jsx";
import { backendUrl } from "../../constants/userConstants.jsx";
const MyRooms = () => {
  const dispatch = useDispatch();
  let x = 0;
  const { rooms, loading, error } = useSelector((state) => state.roomDetail);
  const handleRemoveRoom = (roomId) => {
    dispatch(removeRoom(roomId));

    setTimeout(() => {
      window.location.reload();
    }, 500); // Small delay to ensure navigation happens first
  
  
};
  console.log(rooms, "room");
  // console.log(roomDetails)
  useEffect(() => {
    dispatch(fetchRoomDetail());

  }, [dispatch]);


  return (
    <>
      {/* {rooms && rooms.length > 0? (
                <div>
                {rooms.map(room => {
                    x =x+1
                        return (
                            <div key={room.id}>
                                <div>Room number: {x}</div>
                                <div>Number of rooms:{room.number_of_rooms}</div>
                                <div>Rent: {room.rent}</div>
                                <div>Bathroom: {room.bathroom}</div>
                                <div>Address: {room.address}</div>
                                {room.image && <img src={`${backendUrl}${room.image}`}/>}
                                {room.image1 && <img src={`${backendUrl}${room.image1}`}/>}
                                {room.image2 && <img src={`${backendUrl}${room.image2}`}/>}
                                {room.image3 && <img src={`${backendUrl}${room.image3}`}/>}
                                
                                
                            
                            </div>
                    )})}
                    
                </div>
            ): <div>no rooms</div>} */}

      <div role="tablist" className="tabs mt-5 p-2 tabs-lifted">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab !w-max"
          aria-label="All rooms"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <table className="table text-white">
            {/* head */}
            <thead>
              <tr className="text-center">
                <th>Room no</th>
                <th>Number of rooms</th>
                <th>Rent</th>
                <th>Address</th>
                <th>Room Images</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rooms?.map((room) => (
                <tr key={room.id} className="hover text-center text-black">
                  <td>{ x=x+1 }</td>
                  <td>{room.number_of_rooms}</td>
                  <td>{room.rent}</td>
                  <td>{room.address}</td>
                  <td className="flex items-center justify-center flex-col">
                    <div className="carousel w-[75%]">
                      <div id={room.image} className="carousel-item w-full">
                        {room.image && (
                          <img
                            src={`${backendUrl}/${room.image}`}
                            className="w-full"
                          />
                        )}
                      </div>
                      <div id={room.image1} className="carousel-item w-full">
                        {room.image1 && (
                          <img
                            src={`${backendUrl}${room.image1}`}
                            className="w-full"
                          />
                        )}
                      </div>
                      <div id={room.image2} className="carousel-item w-full">
                        {room.image2 && (
                          <img
                            src={`${backendUrl}${room.image2}`}
                            className="w-full"
                          />
                        )}
                      </div>
                      <div id={room.image3} className="carousel-item w-full">
                        {room.image3 && (
                          <img
                            src={`${backendUrl}${room.image3}`}
                            className="w-full"
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex w-full justify-center gap-2 py-2">
                      <a href={`#${room.image}`} className="btn btn-xs">
                        1
                      </a>
                      <a href={`#${room.image1}`} className="btn btn-xs">
                        2
                      </a>
                      <a href={`#${room.image2}`} className="btn btn-xs">
                        3
                      </a>
                      <a href={`#${room.image3}`} className="btn btn-xs">
                        4
                      </a>
                    </div>
                  </td>
                  <td>
                    {room?.is_shared ? <> </>: <> <button className="btn bg-red-600 text-white" onClick={() => document.getElementById("my_modal_3").showModal()}>
                      Remove
                    </button></>}
                    
                    <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="font-bold text-lg">Are you sure you want to remove this listed room </h3>
                <p className='m-3'><strong>NOTE:</strong> You will have to add room again and this will be removed from the listings.</p>
                <button className="btn m-2 bg-red-600 text-white" onClick={() => handleRemoveRoom(room.id)}>
                          Yes, Remove
                        </button>
                        <button className="btn m-2 bg-cyan-600 text-white" onClick={() => document.getElementById("my_modal_3").close()}>
              Cancel
            </button>
              </div>
            </dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <table className="table text-white">
            {/* head */}
            <thead>
              <tr className="text-center">
                <th>Room no</th>
                <th>Number of rooms</th>
                <th>Rent</th>
                <th>Address</th>
                <th>Room Images</th>
              </tr>
            </thead>
            <tbody>
              {rooms && rooms.length > 0 ? (
                <>
                  {rooms
                    .filter((room) => room?.is_shared)
                    .map((room) => (
                      <tr key={room.id} className="hover text-center text-black">
                        <td>ds{ x }</td>
                        <td>{room.number_of_rooms}</td>
                        <td>{room.rent}</td>
                        <td>{room.address}</td>
                        <td className="flex items-center justify-center flex-col">
                          <div className="carousel w-[75%]">
                            <div
                              id={room.image}
                              className="carousel-item w-full"
                            >
                              {room.image && (
                                <img
                                  src={`${backendUrl}${room.image}`}
                                  className="w-full"
                                />
                              )}
                            </div>
                            <div
                              id={room.image1}
                              className="carousel-item w-full"
                            >
                              {room.image1 && (
                                <img
                                  src={`${backendUrl}${room.image1}`}
                                  className="w-full"
                                />
                              )}
                            </div>
                            <div
                              id={room.image2}
                              className="carousel-item w-full"
                            >
                              {room.image2 && (
                                <img
                                  src={`${backendUrl}${room.image2}`}
                                  className="w-full"
                                />
                              )}
                            </div>
                            <div
                              id={room.image3}
                              className="carousel-item w-full"
                            >
                              {room.image3 && (
                                <img
                                  src={`${backendUrl}${room.image3}`}
                                  className="w-full"
                                />
                              )}
                            </div>
                          </div>
                          <div className="flex w-full justify-center gap-2 py-2 text-black">
                            <a href={`#${room.image}`} className="btn btn-xs text-black">
                              1
                            </a>
                            <a href={`#${room.image1}`} className="btn btn-xs">
                              2
                            </a>
                            <a href={`#${room.image2}`} className="btn btn-xs">
                              3
                            </a>
                            <a href={`#${room.image3}`} className="btn btn-xs">
                              4
                            </a>
                          </div>
                        </td>
                        <td>
                          {/* <button className="btn bg-red-600 text-white">
                            Remove
                          </button> */}
                        </td>
                      </tr>
                    ))}
                </>
              ) : (
                <div className="text-center"> No Rented rooms </div>
              )}
            </tbody>
          </table>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Rented"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <table className="table text-white">
            {/* head */}
            <thead>
              <tr className="text-center">
                <th>Room no</th>
                <th>Number of rooms</th>
                <th>Rent</th>
                <th>Address</th>
                <th>Room Images</th>
              </tr>
            </thead>
            <tbody>
            {/*{rooms.length>0 && (*/}
            {/*   rooms.map(room => {*/}
            {/*     !room.rented && (*/}
            {/*         <div>{room.address}</div>*/}
            {/*     )*/}
            {/*   })*/}
            {/*    )*/}
            {/*}*/}
              {rooms && rooms.length > 0 ? (
                <>
                  {rooms
                    .filter((room) => room?.rented)
                    .map((room) => (
                      <tr key={room.id} className="hover text-center text-black">
                        <td>{ x=x+1 }</td>
                        <td>{room.number_of_rooms}</td>
                        <td>{room.rent}</td>
                        <td>{room.address}</td>
                        <td className="flex items-center justify-center flex-col">
                          <div className="carousel w-[75%]">
                            <div
                              id={room.image}
                              className="carousel-item w-full"
                            >
                              {room.image && (
                                <img
                                  src={`${backendUrl}${room.image}`}
                                  className="w-full"
                                />
                              )}
                            </div>
                            <div
                              id={room.image1}
                              className="carousel-item w-full"
                            >
                              {room.image1 && (
                                <img
                                  src={`${backendUrl}${room.image1}`}
                                  className="w-full"
                                />
                              )}
                            </div>
                            <div
                              id={room.image2}
                              className="carousel-item w-full"
                            >
                              {room.image2 && (
                                <img
                                  src={`${backendUrl}${room.image2}`}
                                  className="w-full"
                                />
                              )}
                            </div>
                            <div
                              id={room.image3}
                              className="carousel-item w-full"
                            >
                              {room.image3 && (
                                <img
                                  src={`${backendUrl}${room.image3}`}
                                  className="w-full"
                                />
                              )}
                            </div>
                          </div>
                          <div className="flex w-full justify-center gap-2 py-2">
                            <a href={`#${room.image}`} className="btn btn-xs">
                              1
                            </a>
                            <a href={`#${room.image1}`} className="btn btn-xs">
                              2
                            </a>
                            <a href={`#${room.image2}`} className="btn btn-xs">
                              3
                            </a>
                            <a href={`#${room.image3}`} className="btn btn-xs">
                              4
                            </a>
                          </div>
                        </td>
                        <td>
                        </td>
                      </tr>
                    ))}
                </>
              ) : (
                <div className="text-center"> No Rented rooms </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyRooms;
