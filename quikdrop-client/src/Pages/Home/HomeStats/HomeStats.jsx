import { Container } from "@mui/material";
import { useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import useStats from "../../../hooks/useStats";

const HomeStats = () => {
  const [countOn, setCountOn] = useState(false);
  const [stats] = useStats();

  return (
    <Container>
      <ScrollTrigger
        onEnter={() => setCountOn(true)}
        onExit={() => setCountOn(false)}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 my-16 bg-[#3A454B] py-10 rounded-lg p-4 text-center">
          <div className="flex flex-col justify-center items-center">
            <h4 className="text-6xl sm:text-4xl md:text-6xl font-extrabold font-ruda text-[#5de74b]">
              {countOn && (
                <CountUp
                  start={0}
                  end={stats?.parcels}
                  duration={2.75}
                ></CountUp>
              )}
              +
            </h4>
            <p className="text-white">Total Booked Parcels</p>
          </div>
          <div className="flex flex-col justify-center items-center ">
            <h4 className="text-6xl sm:text-4xl md:text-6xl font-extrabold font-ruda text-[#5de74b] px-2">
              {countOn && (
                <CountUp
                  start={0}
                  end={stats?.delivered}
                  duration={2.75}
                ></CountUp>
              )}
              +
            </h4>
            <p className="text-white">Total Delivered Parcels</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h4 className="text-6xl sm:text-4xl md:text-6xl font-extrabold font-ruda text-[#5de74b]">
              {countOn && (
                <CountUp start={0} end={stats?.users} duration={2.75}></CountUp>
              )}
              +
            </h4>
            <p className="text-white">Total Registered Users</p>
          </div>
        </div>
      </ScrollTrigger>
    </Container>
  );
};

export default HomeStats;
