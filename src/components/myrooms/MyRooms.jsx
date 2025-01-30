import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomDetail, removeRoom } from "../../actions/roomActions.jsx";
import { backendUrl } from "../../constants/userConstants.jsx";

const MyRooms = () => {
  const dispatch = useDispatch();
  const { rooms, loading, error } = useSelector((state) => state.roomDetail);
  const [selectedRoom, setSelectedRoom] = useState(null); // Track selected room for removal

  useEffect(() => {
    dispatch(fetchRoomDetail());
  }, [dispatch]);

  const handleRemoveRoom = (roomId) => {
    dispatch(removeRoom(roomId));
    setSelectedRoom(null);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div className="mt-5 p-2">
      <div role="tablist" className="tabs tabs-lifted">
        {/* All Rooms Tab */}
        <input type="radio" name="my_tabs" role="tab" className="tab !w-max" aria-label="All rooms" defaultChecked />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <table className="table text-white">
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
              {rooms?.map((room, index) => (
                <tr key={room.id} className="hover text-center text-black">
                  <td>{index + 1}</td>
                  <td>{room.number_of_rooms}</td>
                  <td>{room.rent}</td>
                  <td>{room.address}</td>
                  <td className="flex items-center justify-center flex-col">
                    <div className="carousel w-[75%]">
                      {[room.image, room.image1, room.image2, room.image3].map((img, i) => (
                        img ? (
                          <div key={i} className="carousel-item w-full">
                            <img src={`${backendUrl}${img}`} className="w-full" />
                          </div>
                        ) : null
                      ))}
                    </div>
                  </td>
                  <td>
                    {!room?.is_shared && (
                      <button className="btn bg-red-600 text-white" onClick={() => setSelectedRoom(room.id)}>
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Rented Rooms Tab */}
        <input type="radio" name="my_tabs" role="tab" className="tab" aria-label="Rented" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <table className="table text-white">
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
              {rooms?.filter((room) => room.rented).map((room, index) => (
                <tr key={room.id} className="hover text-center text-black">
                  <td>{index + 1}</td>
                  <td>{room.number_of_rooms}</td>
                  <td>{room.rent}</td>
                  <td>{room.address}</td>
                  <td className="flex items-center justify-center flex-col">
                    <div className="carousel w-[75%]">
                      {[room.image, room.image1, room.image2, room.image3].map((img, i) => (
                        img ? (
                          <div key={i} className="carousel-item w-full">
                            <img src={`${backendUrl}${img}`} className="w-full" />
                          </div>
                        ) : null
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Remove Room Confirmation Modal */}
      {selectedRoom && (
        <dialog open className="modal">
          <div className="modal-box">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setSelectedRoom(null)}>✕</button>
            <h3 className="font-bold text-lg">Are you sure you want to remove this room?</h3>
            <p className="m-3"><strong>NOTE:</strong> You will have to add this room again if needed.</p>
            <button className="btn m-2 bg-red-600 text-white" onClick={() => handleRemoveRoom(selectedRoom)}>
              Yes, Remove
            </button>
            <button className="btn m-2 bg-cyan-600 text-white" onClick={() => setSelectedRoom(null)}>
              Cancel
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyRooms;
