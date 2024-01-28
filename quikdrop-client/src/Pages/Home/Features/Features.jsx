import { Container } from "@mui/material";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import Lottie from "react-lottie";
import p2p from "../../../assets/logos/P2P.json";
import merchant from "../../../assets/logos/merchant-delivery.json";
import sme from "../../../assets/logos/SME.json";

const Features = () => {
  const p2pOptions = {
    loop: true,
    autoplay: true,
    animationData: p2p,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const mechantOptions = {
    loop: true,
    autoplay: true,
    animationData: merchant,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const smeOptions = {
    loop: true,
    autoplay: true,
    animationData: sme,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="my-10 sm:my-16">
      <Container>
        <div className="text-center text-[#3A454B] mb-4 sm:mb-6 md:mb-8">
          <SectionTitle>We provide services that you can rely on</SectionTitle>
        </div>
        {/* card container */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
          {/* p2p card */}
          <div className="grid max-h-full space-y-3 md:space-y-5 overflow-hidden">
            <div className="aspect-video flex justify-center items-center">
              <Lottie options={p2pOptions} />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold font-ruda text-[#3A3A3A]">
                Person 2 Person Delivery
              </h3>
              <p className="font-medium text-[#3a3a3ae7] line-clamp-4 pt-2">
                Whether you need to send your father&apos;s reading glasses or
                surprise your mom with a handwoven shawl, we&apos;ll make sure
                everything moves with flexibility, speed, and accuracy.
              </p>
            </div>
          </div>
          {/* merchant card */}
          <div className="grid max-h-full space-y-3 md:space-y-5 overflow-hidden">
            <div className="aspect-square xs:aspect-video  flex justify-center items-center">
              <Lottie options={mechantOptions} />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold font-ruda text-[#3A3A3A]">
                Merchant Delivery
              </h3>
              <p className="font-medium text-[#3a3a3ae7] line-clamp-4 pt-2">
                We understand the hustle you go through while building your
                business, we empathise with the nervousness of your very
                first-order. We are here as your partner with the flexibility to
                deliver things wherever and whenever you require.
              </p>
            </div>
          </div>
          {/* sme card */}
          <div className="grid max-h-full space-y-3 md:space-y-5 overflow-hidden">
            <div className="aspect-square xs:aspect-video  flex justify-center items-center">
              <Lottie options={smeOptions} />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold font-ruda text-[#3A3A3A]">
                Corporate & SME Delivery
              </h3>
              <p className="font-medium text-[#3a3a3ae7] line-clamp-4 pt-2">
                From providing a hassle-free end-to-end delivery to making sure
                we accelerate your company’s efficiency, we help your business a
                great deal with each delivery. Our delivery solutions can be
                customised for big and small corporations.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Features;
