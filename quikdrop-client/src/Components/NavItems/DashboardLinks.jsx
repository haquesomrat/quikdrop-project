import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useFindSingleUser from "../../hooks/useFindSingleUser";

const DashboardLinks = () => {
  const { user } = useAuth();
  const [loggedUser] = useFindSingleUser();
  // console.log(loggedUser?.role);
  return (
    <>
      {user && loggedUser?.role === "deliveryman" ? (
        <li className="px-4 py-1">
          <NavLink to={"/dashboard/deliveryList"}>Dashboard</NavLink>
        </li>
      ) : user && loggedUser?.role === "admin" ? (
        <li className="px-4 py-1">
          <NavLink to={"/dashboard/statistics"}>Dashboard</NavLink>
        </li>
      ) : (
        <li className="px-4 py-1">
          <NavLink to={"/dashboard/myParcels"}>Dashboard</NavLink>
        </li>
      )}

      {/* {!isAdmin && !isDeliveryman && (
        <li className="px-6 py-1">
          <NavLink to={"/dashboard/myParcels"}>Dashboard</NavLink>
        </li>
      )}

      {user && isAdmin && !isDeliveryman && (
        <li className="px-6 py-1">
          <NavLink to={"/dashboard/statistics"}>Dashboard</NavLink>
        </li>
      )}
      {user && isDeliveryman && !isAdmin && (
        <li className="px-6 py-1">
          <NavLink to={"/dashboard/deliveryList"}>Dashboard</NavLink>
        </li>
      )} */}
    </>
  );
};

export default DashboardLinks;
