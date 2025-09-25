// Example: /src/pages/PaymentFail.jsx
import { useParams } from "react-router-dom";

const PaymentFail = () => {
  const { tran_id } = useParams();

  return (
    <div className="text-center mt-5">
      <h2>Payment Failed</h2>
      <p>Transaction ID: {tran_id}</p>
      <p>
        Unfortunately, your payment did not go through. Please try again or
        contact support.
      </p>
    </div>
  );
};

export default PaymentFail;
