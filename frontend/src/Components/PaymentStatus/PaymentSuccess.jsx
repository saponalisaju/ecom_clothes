import { useParams } from "react-router-dom";
import api from "../../api";
import { useEffect } from "react";

const PaymentSuccess = () => {
  const { tran_id } = useParams();

  useEffect(() => {
    try {
      api.get(`/api/order/payment/redirect-success/${tran_id}`);
    } catch (error) {
      console.error("error success");
    }
  }, [tran_id]);

  return (
    <div className="payment-success">
      <h2>🎉 Payment Successful!</h2>
      <p>
        Transaction ID: <strong>{tran_id}</strong>
      </p>
      {/* Optionally fetch order details using tran_id */}
    </div>
  );
};

export default PaymentSuccess;
