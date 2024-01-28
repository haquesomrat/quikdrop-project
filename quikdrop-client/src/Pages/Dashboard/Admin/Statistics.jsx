import { Helmet } from "react-helmet";
import PageTitle from "../../../Components/Dashboard/PageTitle";
import BookingsByDate from "../../../Components/Dashboard/Statistics/BookingsByDate";
import ParcelsComparison from "../../../Components/Dashboard/Statistics/ParcelsComparison";

const Statistics = () => {
  return (
    <div>
      <Helmet>
        <title>Dashboard | Statistics</title>
      </Helmet>
      <PageTitle>Statistics</PageTitle>
      <div className="flex flex-col w-full">
        <div className="w-full">
          {/* Booking by date */}
          <BookingsByDate />
        </div>
        <div className="w-full">
          {/* Comparison between booked and delivered */}
          <ParcelsComparison />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
