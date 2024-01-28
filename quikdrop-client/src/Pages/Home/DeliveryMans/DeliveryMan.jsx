import { Rating } from "@mui/material";

const DeliveryMan = ({ man }) => {
  return (
    <div className="bg-[#253138] p-4 rounded-lg relative min-h-60 w-full flex items-center duration-300 hover:-translate-y-1">
      <div className="absolute -top-6 left-4">
        <img className="h-16 w-16 rounded-lg" src={man.image} alt="" />
      </div>
      <div className="text-white space-y-3">
        <h4 className="text-2xl font-ruda font-semibold">{man.name}</h4>
        <h6>Parcel delivered: {man.parcel_delivered}</h6>
        <Rating name="read-only" value={man.rating} readOnly />
      </div>
    </div>
  );
};

export default DeliveryMan;
