import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useDeliveryman from "../hooks/useDeliveryman";
import Loader from "../Components/Shared/Loader";

const DeliverymanRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const [isDeliveryman, isDeliverymanLoading] = useDeliveryman();
  const location = useLocation();
  // console.log(user, isAdmin);

  if (loading || isDeliverymanLoading) {
    // console.log(loading, isDeliverymanLoading);
    return <Loader />;
  }
  if (user || isDeliveryman) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default DeliverymanRouter;
