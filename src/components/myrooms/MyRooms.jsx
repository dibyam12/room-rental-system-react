import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomDetail } from "../../actions/roomActions.jsx";
import { backendUrl } from "../../constants/userConstants.jsx";
const MyRooms = () => {
  const dispatch = useDispatch();
  let x = 0;
  const { rooms, loading, error } = useSelector((state) => state.roomDetail);

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
              {rooms.map((room) => (
                <tr key={room.id} className="hover text-center">
                  <td>{{ x }}</td>
                  <td>{room.number_of_rooms}</td>
                  <td>{room.rent}</td>
                  <td>{room.address}</td>
                  <td className="flex items-center justify-center flex-col">
                    <div className="carousel w-[75%]">
                      <div id={room.image} className="carousel-item w-full">
                        {room.image && (
                          <img
                            src={`${backendUrl}${room.image}`}
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
                    <button className="btn bg-cyan-600 text-white">
                      Share
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Shared"
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
              </tr>
            </thead>
            <tbody>
              {rooms && rooms.length > 0 ? (
                <>
                  {rooms
                    .filter((room) => room?.is_shared)
                    .map((room) => (
                      <tr key={room.id} className="hover text-center">
                        <td>{{ x }}</td>
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
                          <button className="btn bg-cyan-600 text-white">
                            Share
                          </button>
                        </td>
                      </tr>
                    ))}
                </>
              ) : (
                <div className="text-center"> No Shared rooms </div>
              )}
            </tbody>
          </table>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Unshared"
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
              {rooms && rooms.length > 0 ? (
                <>
                  {rooms
                    .filter((room) => !room?.is_shared)
                    .map((room) => (
                      <tr key={room.id} className="hover text-center">
                        <td>{{ x }}</td>
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
                          <button className="btn bg-cyan-600 text-white">
                            Share
                          </button>
                        </td>
                      </tr>
                    ))}
                </>
              ) : (
                <div className="text-center"> No Unshared rooms </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyRooms;
