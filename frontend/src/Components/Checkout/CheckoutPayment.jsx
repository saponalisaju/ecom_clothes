import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutPayment = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {
      console.error(result.error.message);
    } else {
      console.log("Received Stripe token:", result.token);
      //Send token to backend to process payment
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutPayment;
