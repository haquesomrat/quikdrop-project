import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import DeliveryMan from "./DeliveryMan";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";

const DeliveryMans = () => {
  const [deliverymans, setDeliverymans] = useState([]);
  useEffect(() => {
    fetch("./top-deliverymans.json")
      .then((res) => res.json())
      .then((data) => setDeliverymans(data));
  }, []);
  return (
    <div className="my-16">
      <Container>
        <div className="text-center text-[#3A454B] mb-12 sm:mb-14 md:mb-16">
          <SectionTitle>Top Delivery Man</SectionTitle>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-10 sm:gap-x-5 sm:gap-y-10 md:gap-10 lg:gap-5">
          {deliverymans.map((man) => (
            <DeliveryMan man={man} key={man._id}></DeliveryMan>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default DeliveryMans;
