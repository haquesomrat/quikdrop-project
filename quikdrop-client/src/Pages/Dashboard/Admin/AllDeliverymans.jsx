import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PageTitle from "../../../Components/Dashboard/PageTitle";
import useUser from "../../../hooks/useUser";
import { Helmet } from "react-helmet";
import DMTableRow from "../../../Components/Dashboard/AllDeliverymans/DMTableRow";

const AllDeliverymans = () => {
  const [allUsers] = useUser();
  const allDeliverymans = allUsers.filter((user) => {
    return user?.role === "deliveryman";
  });

  console.log(allDeliverymans);

  return (
    <div>
      <Helmet>
        <title>Dashboard | All Deliverymans</title>
      </Helmet>
      <PageTitle>All Delivery Mans</PageTitle>
      {/* table layout */}
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Delivered</TableCell>
              <TableCell>Average Review</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allDeliverymans.map((item) => (
              <DMTableRow key={item._id} item={item}></DMTableRow>
              // <TableRow
              //   key={item._id}
              //   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              // >
              //   <TableCell component="th" scope="item">
              //     {item.name}
              //   </TableCell>
              //   <TableCell>{item.phone || "01976758778"}</TableCell>
              //   <TableCell>{item.parcel_delivered}</TableCell>
              //   <TableCell>
              //     <Rating
              //       name="read-only"
              //       value={item.average_review}
              //       readOnly
              //     />
              //   </TableCell>
              // </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllDeliverymans;
