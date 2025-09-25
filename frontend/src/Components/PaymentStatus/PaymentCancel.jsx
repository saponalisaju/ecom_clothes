// Example: /src/pages/PaymentFail.jsx
import { useParams } from "react-router-dom";

const PaymentCancel = () => {
  const { tran_id } = useParams();

  return (
    <div className="text-center mt-5">
      <h2>Payment Cancelled</h2>
      <p>Transaction ID: {tran_id}</p>
    </div>
  );
};

export default PaymentCancel;
