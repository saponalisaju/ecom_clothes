import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutPayment";

const stripePromise = loadStripe(
  "pk_test_51S4OXF2z3JhAqdUqbHvunch0mSkeB2pMojb9lkEs0X1EaWBEegAogj3RmWum3FGSdJGgpotgXxALLKLyJu4z68LX00OP8nqkC9"
);

<Elements stripe={stripePromise}>
  <CheckoutForm />
</Elements>;
