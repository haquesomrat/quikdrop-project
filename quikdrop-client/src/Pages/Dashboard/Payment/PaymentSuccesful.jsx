import Confetti from "react-confetti";
import Lottie from "react-lottie";
import successLogo from "../../../assets/logos/payment-successful.json";
import { Helmet } from "react-helmet";

const PaymentSuccesful = () => {
  const successOptions = {
    loop: false,
    autoplay: true,
    animationData: successLogo,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Helmet>
        <title>Dashboard | Payment Successful</title>
      </Helmet>
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      <div>
        <Lottie options={successOptions} />
      </div>
    </div>
  );
};

export default PaymentSuccesful;
