import { useLoaderData } from "react-router-dom";
import PageTitle from "../../../Components/Dashboard/PageTitle";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet";

const Payment = () => {
  const parcelData = useLoaderData();
  const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
  return (
    <div>
      <Helmet>
        <title>Dashboard | Payment</title>
      </Helmet>
      <PageTitle>Payment</PageTitle>
      <div>
        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm parcelData={parcelData} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
