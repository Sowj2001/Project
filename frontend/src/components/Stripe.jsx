// import React, { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import axios from "axios";
// import CheckoutForm from "./CheckoutForm";

// // const stripePromise = loadStripe('pk_test_51Oml5cGAwoXiNtjJgPPyQngDj9WTjawya4zCsqTn3LPFhl4VvLZZJIh9fW9wqVweFYC5f0YEb9zjUqRpXbkEKT7T00eU1xQvjp')

// const stripePromise = loadStripe('pk_test_51PYQ2pRuQvfO4D895YT2smHMIZkHgRd8AZZ2a597NzauasFYatm9hbb8spbvQnU2xXc8sqffI65T6iWCwXFGmAgW00mT2t0KAV')
// // const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// const Stripe = ({ price, orderId }) => {
//   const [clientSecret, setClientSecret] = useState("");

//   const appearance = {
//     theme: "stripe",
//   };
  
//   const options = {
//     appearance,
//     clientSecret,
//   };

//   const create_payment = async () => {
//     try {
//       const { data } = await axios.post(
//         "http://localhost:5000/api/order/create-payment",
//         { price },
//         { withCredentials: true }
//       );
//       setClientSecret(data.clientSecret);
//     } catch (error) {
//       console.log(error.response.data);
//     }
//   };

//   return (
//     <div className="mt-4">
//       {clientSecret ? (
//         <Elements options={options} stripe={stripePromise}>
//           <CheckoutForm orderId={orderId} />
//         </Elements>
//       ) : (
//         <button
//           onClick={create_payment}
//           className="px-10 py-[6px] rounded-sm hover:shadow-green-700/30 hover:shadow-lg bg-green-700 text-white">
//           Start Payment
//         </button>
//       )}
//     </div>
//   );
// };

// export default Stripe;


import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";

// Use environment variable for Stripe publishable key
 const stripePromise = loadStripe('pk_test_51PYQ2pRuQvfO4D895YT2smHMIZkHgRd8AZZ2a597NzauasFYatm9hbb8spbvQnU2xXc8sqffI65T6iWCwXFGmAgW00mT2t0KAV')


// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Stripe = ({ price, orderId }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const appearance = {
    theme: "stripe",
  };
  
  const options = {
    appearance,
    clientSecret,
  };

  const createPayment = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/order/create-payment",
        { price },
        { withCredentials: true }
      );
      setClientSecret(data.clientSecret);
    } catch (error) {
      setError(error.response ? error.response.data : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm orderId={orderId} />
        </Elements>
      ) : (
        <>
          <button
            onClick={createPayment}
            className="px-10 py-[6px] rounded-sm hover:shadow-green-700/30 hover:shadow-lg bg-green-700 text-white"
            disabled={loading}
          >
            {loading ? "Loading..." : "Start Payment"}
          </button>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </>
      )}
    </div>
  );
};

export default Stripe;

