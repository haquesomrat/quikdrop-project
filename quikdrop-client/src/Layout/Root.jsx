import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Home/Shared/Navbar/Navbar";
import Footer from "../Pages/Home/Shared/Footer/Footer";
import Loader from "../Components/Shared/Loader";
import useAuth from "../hooks/useAuth";

const Root = () => {
  const { loading } = useAuth();
  return (
    <div className="font-ubuntu">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Root;
