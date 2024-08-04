import PropTypes from "prop-types";
import { loadStripe } from "@stripe/stripe-js";

const Payment = ({ items, totalPrice }) => {
  const makePayment = async () => {
    console.log(`Processing payment for $${totalPrice}`);
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_API_KEY);
    const body = {
      items: items,
      totalPrice: totalPrice,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(
        "http://localhost:5000/create-checkout-session",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from server:", errorText);
        throw new Error("Network response was not ok");
      }

      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-full text-2xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105" onClick={makePayment}>Pay ${totalPrice}</button>;
};

Payment.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
};

export default Payment;
