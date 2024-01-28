import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const CheckoutForm = ({ parcelData }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const parcelPrice = parcelData.price;
  console.log(parcelPrice);

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: parcelPrice })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, parcelPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error", confirmError);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction ID", paymentIntent.id);
        window.location.href = "/dashboard/payment-successful";
      }
    }
  };
  return (
    <form className="my-4" onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "red",
            },
          },
        }}
      />
      <p className="text-red-500">{error}</p>
      <div className="flex justify-end">
        <button
          className="border px-4 py-1 my-4 rounded-md bg-gray-400 text-white"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
