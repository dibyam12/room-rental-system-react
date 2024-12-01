<<<<<<< HEAD
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
=======
import { useState, useEffect } from "react";
import axios from "axios";

const EsewaPayment = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/payment/esewa/1"
        );
        setPaymentData(response.data.payment_data);
      } catch (err) {
        setError("Failed to load payment data.");
>>>>>>> ad52a179ae7e7ac97f9938c07d3facb4420a5d28
      }
    };

    fetchPaymentData();
<<<<<<< HEAD
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
=======
  }, []);

  console.log(paymentData);

  const handlePaymentSubmission = () => {
    if (!paymentData) return;

    const esewaPath = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", esewaPath);

    Object.entries(paymentData).forEach(([key, value]) => {
      const hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", value);
      form.appendChild(hiddenField);
    });

    document.body.appendChild(form);
    form.submit();
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="text-center">
      <button
        onClick={handlePaymentSubmission}
        disabled={!paymentData || isSubmitting}
        className={`bg-blue-500 text-white py-2 px-4 rounded ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
        }`}
      >
        {isSubmitting ? "Processing..." : "Pay with eSewa"}
      </button>
    </div>
  );
};

export default EsewaPayment;
>>>>>>> ad52a179ae7e7ac97f9938c07d3facb4420a5d28
