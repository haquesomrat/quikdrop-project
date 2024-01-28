import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import Loader from "../Components/Shared/Loader";

const AdminRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();
  // console.log(user, isAdmin);

  if (loading || isAdminLoading) {
    console.log(loading, isAdminLoading);
    return <Loader />;
  }
  if (user || isAdmin) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRouter;
