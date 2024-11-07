import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchRoomDetail} from "../../actions/roomActions.jsx";
import {backendUrl} from "../../constants/userConstants.jsx";
const MyRooms = () => {
    const dispatch = useDispatch()
    let x = 0
    const {rooms,loading,error} = useSelector(state => state.roomDetail)
    
        console.log(rooms,'room')
    // console.log(roomDetails)
    useEffect( () => {
        dispatch(fetchRoomDetail())
        
        
    }, [dispatch])
    return (
        <div>
            {rooms && rooms.length > 0? (
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
            ): <div>no rooms</div>}
            
        </div>
    );
};

export default MyRooms;