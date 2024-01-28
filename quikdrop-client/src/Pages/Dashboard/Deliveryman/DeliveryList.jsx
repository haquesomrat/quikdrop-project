import PageTitle from "../../../Components/Dashboard/PageTitle";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import useParcels from "../../../hooks/useParcels";
import useFindSingleUser from "../../../hooks/useFindSingleUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const DeliveryList = () => {
  const [allParcels, refetch] = useParcels();
  const [loggedUser] = useFindSingleUser();
  const axiosSecure = useAxiosSecure();

  const deliveryList = allParcels.filter((parcel) => {
    return parcel.deliveryman_id === loggedUser._id;
  });

  // cancel parcel
  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I do",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const cancelRes = await axiosSecure.patch(`/cancel/${id}`);
        console.log(cancelRes.data);
        if (cancelRes.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Cancelled!",
            text: "This Order has been cancelled",
            icon: "success",
          });
        }
      }
    });
  };

  // deliver parcel
  const handleDeliver = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Is this parcel is delivered?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, It is",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deliverRes = await axiosSecure.patch(`/deliver/${id}`);
        console.log(deliverRes.data);
        if (deliverRes.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Delivered!",
            text: "This Order has been delivered",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Dashboard | Delivery List</title>
      </Helmet>
      <PageTitle>Delivery List</PageTitle>
      {/* table leyout */}
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Booked User Name</TableCell>
              <TableCell>Receiver&apos;s Name</TableCell>
              <TableCell>Booked User&apos;s Phone</TableCell>
              <TableCell>Requested Date</TableCell>
              <TableCell>Approximate Date</TableCell>
              <TableCell>Reciever&apos;s Phone Number</TableCell>
              <TableCell>Receiver&apos;s Address</TableCell>
              <TableCell align="center">Location</TableCell>
              <TableCell align="center">Action</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deliveryList.map((item) => (
              <TableRow
                key={item._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="item">
                  {item.name}
                </TableCell>
                <TableCell>{item.receiver_name}</TableCell>
                <TableCell>{item.requested_date}</TableCell>
                <TableCell>{item.approximate_date}</TableCell>
                <TableCell>{item.deliveryman_id}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.delivery_address}</TableCell>
                <TableCell align="center">
                  <Button
                    sx={{
                      borderRadius: "5rem",
                    }}
                    size="medium"
                    variant="outlined"
                  >
                    Location
                  </Button>
                </TableCell>
                <TableCell align="center">
                  {item.booking_status === "cancelled" ? (
                    <p className="text-red-600 text-base">Cancelled</p>
                  ) : (
                    <Button
                      sx={{
                        borderRadius: "5rem",
                      }}
                      disabled={
                        item.booking_status === "cancelled" ||
                        item.booking_status === "delivered"
                          ? true
                          : false
                      }
                      size="medium"
                      color="error"
                      variant="outlined"
                      onClick={() => handleCancel(item._id)}
                    >
                      Cancel
                    </Button>
                  )}
                </TableCell>
                <TableCell align="center">
                  {item.booking_status === "delivered" ? (
                    <p className="text-green-600 text-base">Delivered</p>
                  ) : (
                    <Button
                      sx={{
                        borderRadius: "5rem",
                      }}
                      color="success"
                      size="medium"
                      variant="outlined"
                      disabled={
                        item.booking_status === "cancelled" ||
                        item.booking_status === "delivered"
                          ? true
                          : false
                      }
                      onClick={() => handleDeliver(item._id)}
                    >
                      Deliver
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DeliveryList;
