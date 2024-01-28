import { Helmet } from "react-helmet";
import DeliveryMans from "../DeliveryMans/DeliveryMans";
import Features from "../Features/Features";
import Hero from "../Hero/Hero";
import HomeStats from "../HomeStats/HomeStats";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>QuikDrop | Home</title>
      </Helmet>
      <Hero />
      <Features />
      <HomeStats />
      <DeliveryMans />
    </div>
  );
};

export default Home;
