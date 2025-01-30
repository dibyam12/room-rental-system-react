import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomDetail, fetchRoomDetails, removeBookedRoom } from "../../actions/roomActions";
import { backendUrl } from "../../constants/userConstants";
import { fetchRegistrationDetail } from "../../actions/userActions.jsx";
import { fetchPaymentDetails } from "../paymentHistory/PaymentAction.jsx";

const BookedRooms = () => {
  const dispatch = useDispatch();
  const [selectedRoomId, setSelectedRoomId] = useState(null); // Store selected room ID

  const paymentState = useSelector((state) => state.paymentHistory);
  const { paymentHistory } = paymentState;
  const roomDetails = useSelector((state) => state.roomDetails);
  const registrationDetail = useSelector((state) => state.registrationDetail);
  const { user } = registrationDetail;
  const { rooms } = roomDetails;

  const myself = user?.user;
  const bookedRooms = paymentHistory.filter((room) => Number(room.user) === Number(myself));

  const final = rooms.filter((room) =>
    bookedRooms.some((bookedRoom) => bookedRoom.room === room.id && room.rented === true)
  );

  const handleRemoveBookedRoom = () => {
    if (selectedRoomId) {
      dispatch(removeBookedRoom(selectedRoomId));
      dispatch(fetchRoomDetail());
      dispatch(fetchRoomDetails());
      dispatch(fetchPaymentDetails());
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  useEffect(() => {
    dispatch(fetchRoomDetail());
    dispatch(fetchRoomDetails());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRegistrationDetail());
    dispatch(fetchPaymentDetails());
  }, [dispatch]);

  return (
    <>
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
          {final?.map((room, index) => (
            <tr key={room.id} className="hover text-center text-black">
              <td>{index + 1}</td>
              <td>{room.number_of_rooms}</td>
              <td>{room.rent}</td>
              <td>{room.address}</td>
              <td className="flex items-center justify-center flex-col">
                <div className="carousel w-[75%]">
                  {[room.image, room.image1, room.image2, room.image3].map((img, i) =>
                    img ? (
                      <div key={i} id={img} className="carousel-item w-full">
                        <img src={`${backendUrl}/${img}`} className="w-full" />
                      </div>
                    ) : null
                  )}
                </div>
                <div className="flex w-full justify-center gap-2 py-2">
                  {[room.image, room.image1, room.image2, room.image3].map((img, i) =>
                    img ? (
                      <a key={i} href={`#${img}`} className="btn btn-xs">
                        {i + 1}
                      </a>
                    ) : null
                  )}
                </div>
              </td>
              <td>
                <button
                  className="btn bg-red-600 text-white"
                  onClick={() => {
                    setSelectedRoomId(room.id);
                    document.getElementById("my_modal_3").showModal();
                  }}
                >
                  Remove Room
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for confirming removal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Are you sure you want to remove this rented room?</h3>
          <p className="m-3">
            <strong>NOTE:</strong> The money will <strong>NOT</strong> be refunded, and the room will be listed for public booking again.
          </p>
          <button className="btn m-2 bg-red-600 text-white" onClick={handleRemoveBookedRoom}>
            Yes, Remove
          </button>
          <button
            className="btn m-2 bg-cyan-600 text-white"
            onClick={() => document.getElementById("my_modal_3").close()}
          >
            Cancel
          </button>
        </div>
      </dialog>
    </>
  );
};

export default BookedRooms;
