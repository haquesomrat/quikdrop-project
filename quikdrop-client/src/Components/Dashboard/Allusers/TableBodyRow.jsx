import { Button, TableCell, TableRow } from "@mui/material";
import { FaUser } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { MdOutlineDeliveryDining } from "react-icons/md";
import Swal from "sweetalert2";
import useUser from "../../../hooks/useUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const TableBodyRow = ({ user }) => {
  const [, refetch] = useUser();
  const axiosSecure = useAxiosSecure();
  const [userParcels, setUserParcels] = useState(null);

  useEffect(() => {
    axiosSecure(
      `https://quikdrop-haquesomrat.vercel.app/parcels/${user?.email}`
    ).then((res) => setUserParcels(res?.data));
  }, [user.email, axiosSecure]);

  //   calculate total spent amount
  const spentAmounts = userParcels?.map((parcel) => {
    return parcel?.price;
  });
  const totalSpent = spentAmounts?.reduce((item, total) => {
    return item + total;
  }, 0);

  // handle make admin
  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Successful",
              text: `${user.name} is a admin now`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  // handle make dliveryman
  const handleMakeDeliveryman = (user) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make deliveryman",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/deliveryman/${user._id}`).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Successful",
              text: `${user.name} is a deliveryman now`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <TableRow
      key={user?._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="user">
        {user?.name || ""}
      </TableCell>
      <TableCell>{user?.phone || "01743020044"}</TableCell>
      <TableCell>{userParcels?.length || 0}</TableCell>
      <TableCell>$ {totalSpent || 0}</TableCell>
      <TableCell align="center">
        {user?.role === "deliveryman" ? (
          <Button
            sx={{
              borderRadius: "5rem",
            }}
            color="success"
            variant="outlined"
          >
            <MdOutlineDeliveryDining size={20} />
          </Button>
        ) : (
          <Button
            onClick={() => handleMakeDeliveryman(user)}
            sx={{
              borderRadius: "5rem",
            }}
            variant="outlined"
          >
            <FaUser size={20} />
          </Button>
        )}
      </TableCell>
      <TableCell align="center">
        {user?.role === "admin" ? (
          <Button
            color="error"
            variant="outlined"
            sx={{
              borderRadius: "5rem",
            }}
          >
            <GrUserAdmin size={20} />
          </Button>
        ) : (
          <Button
            onClick={() => handleMakeAdmin(user)}
            sx={{
              borderRadius: "5rem",
            }}
            variant="outlined"
          >
            <FaUser size={20} />
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default TableBodyRow;
