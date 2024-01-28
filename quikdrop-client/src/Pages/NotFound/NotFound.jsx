import Lottie from "react-lottie";
import notFound from "../../assets/logos/not-found.json";
import { Helmet } from "react-helmet";

const NotFound = () => {
  const notFoundOptions = {
    loop: true,
    autoplay: true,
    animationData: notFound,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Helmet>
        <title>404 | Not Found</title>
      </Helmet>
      <div>
        <Lottie options={notFoundOptions} />
      </div>
    </div>
  );
};

export default NotFound;
