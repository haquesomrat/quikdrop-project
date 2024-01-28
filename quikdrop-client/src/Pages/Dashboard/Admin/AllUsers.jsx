import PageTitle from "../../../Components/Dashboard/PageTitle";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import useUser from "../../../hooks/useUser";
import { Helmet } from "react-helmet";
import TableBodyRow from "../../../Components/Dashboard/Allusers/TableBodyRow";

const AllUsers = () => {
  const [users] = useUser();

  return (
    <div>
      <Helmet>
        <title>Dashboard | All Users</title>
      </Helmet>
      <PageTitle>All Users</PageTitle>
      {/* users table */}
      {/* TODO: paginate when server is ready */}
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Booked Parcels</TableCell>
              <TableCell>Total Spent Amount</TableCell>
              <TableCell align="center">Make Deliveryman</TableCell>
              <TableCell align="center">Make Admin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableBodyRow key={user._id} user={user} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllUsers;
