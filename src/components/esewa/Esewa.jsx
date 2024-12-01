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
      }
    };

    fetchPaymentData();
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