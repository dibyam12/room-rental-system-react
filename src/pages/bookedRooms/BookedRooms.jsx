import { useEffect,} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomDetail } from '../../actions/roomActions';
import { backendUrl } from '../../constants/userConstants';

const BookedRooms = () => {

  const dispatch = useDispatch();
  const { rooms, loading, error } = useSelector((state) => state.roomDetail);

//   const myRooms = rooms.filter((room)=>{
//     const user = ""
//     room.rented && user 
//   })

 useEffect(() => {
    dispatch(fetchRoomDetail());
  }, [dispatch]);

  return (<></>
    // <>
    //  <table className="table text-white">
    //             {/* head */}
    //             <thead>
    //               <tr className="text-center">
    //                 <th>Room no</th>
    //                 <th>Number of rooms</th>
    //                 <th>Rent</th>
    //                 <th>Address</th>
    //                 <th>Room Images</th>
    //                 <th></th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {rooms?.map((room) => (
    //                 <tr key={room.id} className="hover text-center text-black">
    //                   <td>{ x=x+1 }</td>
    //                   <td>{room.number_of_rooms}</td>
    //                   <td>{room.rent}</td>
    //                   <td>{room.address}</td>
    //                   <td className="flex items-center justify-center flex-col">
    //                     <div className="carousel w-[75%]">
    //                       <div id={room.image} className="carousel-item w-full">
    //                         {room.image && (
    //                           <img
    //                             src={`${backendUrl}/${room.image}`}
    //                             className="w-full"
    //                           />
    //                         )}
    //                       </div>
    //                       <div id={room.image1} className="carousel-item w-full">
    //                         {room.image1 && (
    //                           <img
    //                             src={`${backendUrl}${room.image1}`}
    //                             className="w-full"
    //                           />
    //                         )}
    //                       </div>
    //                       <div id={room.image2} className="carousel-item w-full">
    //                         {room.image2 && (
    //                           <img
    //                             src={`${backendUrl}${room.image2}`}
    //                             className="w-full"
    //                           />
    //                         )}
    //                       </div>
    //                       <div id={room.image3} className="carousel-item w-full">
    //                         {room.image3 && (
    //                           <img
    //                             src={`${backendUrl}${room.image3}`}
    //                             className="w-full"
    //                           />
    //                         )}
    //                       </div>
    //                     </div>
    //                     <div className="flex w-full justify-center gap-2 py-2">
    //                       <a href={`#${room.image}`} className="btn btn-xs">
    //                         1
    //                       </a>
    //                       <a href={`#${room.image1}`} className="btn btn-xs">
    //                         2
    //                       </a>
    //                       <a href={`#${room.image2}`} className="btn btn-xs">
    //                         3
    //                       </a>
    //                       <a href={`#${room.image3}`} className="btn btn-xs">
    //                         4
    //                       </a>
    //                     </div>
    //                   </td>
    //                   <td>
    //                     <button className="btn bg-cyan-600 text-white">
    //                       Share
    //                     </button>
    //                   </td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </table>
    // </>
   
  )
}

export default BookedRooms