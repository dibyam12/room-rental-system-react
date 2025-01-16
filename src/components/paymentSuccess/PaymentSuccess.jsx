import axios from "axios";
import {backendUrl} from "../../constants/userConstants.jsx";
import {useSelector} from "react-redux";
import { useState, useEffect, useRef } from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams()
     const amount = searchParams.get("amount");
  const transactionUuid = searchParams.get("transaction_uuid");
  const roomId = searchParams.get("roomid");
 
  const rentFrom = searchParams.get("rent_from");
  const rentToo = searchParams.get("rent_to");
  const rentTo = rentToo.split('?')[0];
  const token = JSON.parse(localStorage.getItem("userInfo"))?.access;
    //
    const navigate = useNavigate();

  const handleRent = async () => {
    console.log(amount,transactionUuid,roomId,rentFrom,rentTo,token)

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
      console.log('error')
    }
  };

  useEffect(() => {
    handleRent();
  }, []);
  
    return (
        <div>
            Payment successful
            Please wait while being redirected.
        
        </div>
    );
};

export default PaymentSuccess;


