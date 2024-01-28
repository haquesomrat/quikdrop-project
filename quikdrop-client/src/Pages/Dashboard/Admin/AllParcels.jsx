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
import moment from "moment";
import { useState } from "react";
import AssignModal from "../../../Components/AssignModal/AssignModal";
import { Helmet } from "react-helmet";

const AllParcels = () => {
  const [allParcels] = useParcels();
  const [open, setOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleOpen = (itemId) => {
    setSelectedItemId(itemId);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Helmet>
        <title>Dashboard | All Parcels</title>
      </Helmet>
      <div className="flex items-center justify-between">
        <PageTitle>All Parcels</PageTitle>
        <div>
          <form className="flex items-center gap-4">
            <label>From :</label>
            <input
              className="border px-4 py-1 rounded-full"
              type="date"
              placeholder="From"
            />
            <label>To :</label>
            <input
              className="border px-4 py-1 rounded-full"
              type="date"
              placeholder="To"
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
              Filter
            </Button>
          </form>
        </div>
      </div>
      {/* table leyout */}
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Booking Date</TableCell>
              <TableCell>Delivery Date</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allParcels.map((item) => (
              <TableRow
                key={item._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="item">
                  {item.name}
                </TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{moment(item.booking_date).format("ll")}</TableCell>
                <TableCell>
                  {moment(item.requested_date).format("ll")}
                </TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.booking_status || "pending"}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleOpen(item?._id)}
                    sx={{
                      borderRadius: "5rem",
                    }}
                    color="success"
                    size="medium"
                    variant="outlined"
                  >
                    Manage
                  </Button>
                  <AssignModal
                    open={open && selectedItemId === item?._id}
                    handleClose={handleClose}
                    id={selectedItemId}
                    dName={item?.name}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllParcels;
