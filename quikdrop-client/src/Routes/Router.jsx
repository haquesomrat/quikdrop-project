import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import SignIn from "../Pages/SignIn/SignIn";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers";
import AllParcels from "../Pages/Dashboard/Admin/AllParcels";
import AllDeliverymans from "../Pages/Dashboard/Admin/AllDeliverymans";
import Statistics from "../Pages/Dashboard/Admin/Statistics";
import BookAParcel from "../Pages/Dashboard/User/BookAParcel";
import MyParcels from "../Pages/Dashboard/User/MyParcels";
import Profile from "../Pages/Dashboard/User/Profile";
import DeliveryList from "../Pages/Dashboard/Deliveryman/DeliveryList";
import Reviews from "../Pages/Dashboard/Deliveryman/Reviews";
import NotFound from "../Pages/NotFound/NotFound";
import AdminRouter from "./AdminRouter";
import DeliverymanRouter from "./DeliverymanRouter";
import UpdateAparcel from "../Pages/Dashboard/User/UpdateAparcel";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentSuccesful from "../Pages/Dashboard/Payment/PaymentSuccesful";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      // admin routes
      {
        path: "parcels",
        element: (
          <AdminRouter>
            <AllParcels />
          </AdminRouter>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRouter>
            <AllUsers />
          </AdminRouter>
        ),
      },
      {
        path: "deliveymans",
        element: (
          <AdminRouter>
            <AllDeliverymans />
          </AdminRouter>
        ),
      },
      {
        path: "statistics",
        element: (
          <AdminRouter>
            <Statistics />
          </AdminRouter>
        ),
      },
      // user routes
      {
        path: "bookAParcel",
        element: <BookAParcel />,
      },
      {
        path: "updateAparcel/:id",
        element: <UpdateAparcel />,
        loader: ({ params }) =>
          fetch(`https://quikdrop-haquesomrat.vercel.app/parcel/${params.id}`),
      },
      {
        path: "myParcels",
        element: <MyParcels />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "payment/:id",
        element: <Payment />,
        loader: ({ params }) =>
          fetch(`https://quikdrop-haquesomrat.vercel.app/parcel/${params.id}`),
      },
      {
        path: "payment-successful",
        element: <PaymentSuccesful />,
      },
      // deliveryman routes
      {
        path: "deliveryList",
        element: (
          <DeliverymanRouter>
            <DeliveryList />
          </DeliverymanRouter>
        ),
      },
      {
        path: "reviews",
        element: (
          <DeliverymanRouter>
            <Reviews />
          </DeliverymanRouter>
        ),
      },
    ],
  },
]);

export default Router;
