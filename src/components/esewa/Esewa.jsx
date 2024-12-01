import React, { useState, useEffect } from "react";
import axios from "axios";

const Esewa = ({ orderId }) => {
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    // Fetch payment data from the API
    const fetchPaymentData = async () => {
      try {
        const response = await axios.get(`/api/payment/esewa/?o_id=${orderId}`);
        setPaymentData(response.data.payment_data);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };

    fetchPaymentData();
  }, [orderId]);

  if (!paymentData) {
    return <p>Loading payment details...</p>;
  }

  return (
    <form
      action="http://rc-epay.esewa.com.np/api/epay/main/v2/form"
      method="POST"
    >
      {Object.entries(paymentData).map(([key, value]) => (
        <input type="hidden" key={key} name={key} value={value} />
      ))}
      <button
        type="submit"
        className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
      >
        Proceed to Pay
      </button>
    </form>
  );
};

export default Esewa;
