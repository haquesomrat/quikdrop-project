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
import moment from "moment";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import ReviewModal from "../../../Components/ReviewModal/ReviewModal";
import { Helmet } from "react-helmet";

const MyParcels = () => {
  const [allParcels, refetch] = useParcels();
  const [loggedUser] = useFindSingleUser();
  const axiosSecure = useAxiosSecure();
  const [open, setOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleOpen = (itemId) => {
    setSelectedItemId(itemId);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const myParcels = allParcels.filter((parcel) => {
    return parcel?.email === loggedUser?.email;
  });
  // console.log(myParcels);

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
        // console.log(cancelRes.data);
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

  const [searchedParcels, setSearchedParcels] = useState(myParcels);

  // serach parcel by status
  const handleSearch = async (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    const parcels = await myParcels.filter((parcel) => {
      // console.log(parcel.booking_status.toLowerCase());
      // console.log(searchText.toLowerCase());
      return parcel.booking_status
        .toLowerCase()
        .includes(searchText.toLowerCase());
    });
    setSearchedParcels(parcels);
  };

  return (
    <div>
      <Helmet>
        <title>Dashboard | My Parcels</title>
      </Helmet>
      <div className="flex items-center justify-between">
        <PageTitle>My Parcels</PageTitle>
        <div>
          <form onSubmit={handleSearch} className="flex items-center gap-4">
            <input
              className="border px-3 py-1 rounded-full w-60"
              type="text"
              name="search"
              placeholder="Search by status"
            />
            <Button
              type="submit"
              sx={{
                borderRadius: "5rem",
              }}
              color="success"
              size="medium"
              variant="contained"
            >
              Search
            </Button>
          </form>
        </div>
      </div>
      {/* table leyout */}
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Requested Date</TableCell>
              <TableCell>Booking Date</TableCell>
              <TableCell>Approx Date</TableCell>
              <TableCell>Deliveryman ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Action</TableCell>
              <TableCell align="center">Reviews</TableCell>
              <TableCell align="center">Payment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchedParcels.map((item) => (
              <TableRow
                key={item._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="item">
                  {item?.type}
                </TableCell>
                <TableCell>
                  {moment(item?.requested_date).format("ll")}
                </TableCell>
                <TableCell>{moment(item?.booking_date).format("ll")}</TableCell>
                <TableCell>
                  {moment(item?.approximate_date).format("ll")}
                </TableCell>
                <TableCell>{item?.deliveryman_id}</TableCell>
                <TableCell>{item?.booking_status}</TableCell>
                <TableCell align="center">
                  <Link to={`/dashboard/updateAparcel/${item._id}`}>
                    <Button
                      sx={{
                        borderRadius: "5rem",
                        mr: "6px",
                      }}
                      color="secondary"
                      size="small"
                      variant="outlined"
                      disabled={
                        item.booking_status !== "pending" ||
                        (item.booking_status === "cancelled" && true)
                      }
                    >
                      Update
                    </Button>
                  </Link>
                  <Button
                    sx={{
                      borderRadius: "5rem",
                    }}
                    color="error"
                    size="small"
                    variant="outlined"
                    disabled={
                      item.booking_status !== "pending" ||
                      (item.booking_status === "cancelled" && true)
                    }
                    onClick={() => handleCancel(item._id)}
                  >
                    Cancel
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    sx={{
                      borderRadius: "5rem",
                    }}
                    size="medium"
                    variant="outlined"
                    onClick={() => handleOpen(item?.deliveryman_id)}
                    disabled={
                      item.booking_status === "delivered" ? false : true
                    }
                  >
                    Review
                  </Button>
                  <ReviewModal
                    open={open && selectedItemId === item?.deliveryman_id}
                    handleClose={handleClose}
                    id={selectedItemId}
                  />
                </TableCell>
                <TableCell align="center">
                  <Link to={`/dashboard/payment/${item._id}`}>
                    <Button
                      sx={{
                        borderRadius: "5rem",
                      }}
                      color="success"
                      size="medium"
                      variant="outlined"
                      disabled={
                        item.booking_status !== "cancelled" ? false : true
                      }
                    >
                      Pay
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MyParcels;
