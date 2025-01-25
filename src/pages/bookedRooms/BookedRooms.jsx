import { useEffect,} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {fetchRoomDetail, fetchRoomDetails} from '../../actions/roomActions';
import { backendUrl } from '../../constants/userConstants';
import {fetchRegistrationDetail} from "../../actions/userActions.jsx";
import {fetchPaymentDetails} from "../paymentHistory/PaymentAction.jsx";

const BookedRooms = () => {

  const dispatch = useDispatch();
  const paymentState = useSelector((state) => state.paymentHistory);
  const { paymentHistory, loading, error } = paymentState;
  const userList = useSelector((state) => state.userList);
  const roomDetails = useSelector((state) => state.roomDetails);
  const registrationDetail = useSelector((state) => state.registrationDetail);
  const { user } = registrationDetail;
const {rooms} = roomDetails
    
    const { users } = userList;
  const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    
    
    const myself = user.user
    console.log(rooms,'room')
const bookedRooms = paymentHistory.filter((room) => Number(room.user) === Number(myself));
 const final = rooms.filter((room) =>
  bookedRooms.some((bookedRoom) => bookedRoom.room === room.id)
);

console.log(final,'final');
//   console.log(bookedRooms,'tete')

//   const myRooms = rooms.filter((room)=>{
//     const user = ""
//     room.rented && user
//   })
    let x = 0

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
                  {final?.map((room) => (
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
                        <button className="btn bg-cyan-600 text-white">
                          Share
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
    </>
   
  )
}

export default BookedRooms