import axios from "axios";
import { backendUrl } from "../../constants/userConstants.jsx";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const amount = searchParams.get("amount");
  const transactionUuid = searchParams.get("transaction_uuid");
  const roomId = searchParams.get("roomid");
  const dialogRef = useRef(null);
  const rentFrom = searchParams.get("rent_from");
  const rentToo = searchParams.get("rent_to");
  const rentTo = rentToo.split("?")[0];
  const token = JSON.parse(localStorage.getItem("userInfo"))?.access;
  //
  const navigate = useNavigate();

  const handleRent = async () => {
    console.log(amount, transactionUuid, roomId, rentFrom, rentTo, token);

    try {
      const formData = new FormData();
      formData.append("rent_id", roomId);
      formData.append("rent_from", rentFrom);
      formData.append("rent_to", rentTo);
      formData.append("rent", true);

      const paymentData = new FormData();
      paymentData.append("rent_id", roomId);
      paymentData.append("total_amount", amount);
      paymentData.append("transaction_uuid", transactionUuid);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const configp = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(`${backendUrl}/handle-rent/`, formData, config);
      await axios.post(`${backendUrl}/paymentverify/`, paymentData, configp);

      alert("Room rented successfully!");
      navigate("/");
    } catch (error) {
      // navigate("/");
      console.log("error");
      console.error("Error during rent or payment verification:", error);
      alert("An error occurred while processing the rent. Please try again.");
    }
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) dialog.showModal();
    handleRent(); // Call the function when the component is mounted
  }, []);

  return (
    <div>
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Payment successful</h3>
          <p className="py-4">Please wait while being redirected.</p>
          <div className="modal-action flex items-center justify-center">
            <span className="loading loading-spinner text-info"></span>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PaymentSuccess;
