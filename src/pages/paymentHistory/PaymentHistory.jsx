import { useDispatch, useSelector } from "react-redux";
import { fetchPaymentDetails } from "./PaymentAction.jsx";
import { useEffect } from "react";
import { fetchUserList } from "../../actions/userActions.jsx";
import {fetchRoomDetails} from "../../actions/roomActions.jsx";

const PaymentHistory = () => {
  const dispatch = useDispatch();
  const paymentState = useSelector((state) => state.paymentHistory);
  const userList = useSelector((state) => state.userList);
  const roomDetails = useSelector((state) => state.roomDetails);
  const { paymentHistory, loading, error } = paymentState;
  const { users } = userList;
  const {rooms} = roomDetails
  console.log((users.find(user => user.id === 1)).username)
  let count = 0;

  useEffect(() => {
    dispatch(fetchPaymentDetails());
    dispatch(fetchUserList());
    dispatch(fetchRoomDetails());
  }, [dispatch]);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Amount</th>
              <th>Date</th>
              <th>Paid By</th>
              <th>Email</th>
              <th>Room Address</th>
              <th>Paid To</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((hist) => {
              // Find the user with the given id
              const userwithid = users.find((useri) => Number(useri.id) === Number(hist.user));
              const roomwithid = rooms.find((useri) => Number(useri.id) === Number(hist.room))
              const roomOwner = users.find((useri) => Number(useri.id) === Number(roomwithid.user))

              return (
                <tr key={hist.transaction_uuid} className="hover cursor-pointer">
                  <th>{(count += 1)}</th>
                  <td>{hist.amount}</td>
                  <td>{new Date(hist.created_at).toString().split(" GMT")[0]}</td>
                  <td>{userwithid ? userwithid.username : "User Not Found"}</td>
                  <td>{userwithid.email}</td>
                  <td>{roomwithid.address}</td>
                  <td>{roomOwner.username}</td>
                  <td>{roomOwner.profile.phone_number}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PaymentHistory;
