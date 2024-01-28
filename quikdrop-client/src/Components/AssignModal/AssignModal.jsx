import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import useUser from "../../hooks/useUser";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useParcels from "../../hooks/useParcels";

const AssignModal = ({ open, handleClose, id, dName }) => {
  const [allUsers] = useUser();
  const [, refetch] = useParcels();
  const axiosSecure = useAxiosSecure();
  const currentDate = new Date().toISOString().split("T")[0];

  const deliverymans = allUsers.filter((user) => {
    return user?.role === "deliveryman";
  });

  const handleAssignDeliveryman = async (e) => {
    e.preventDefault();
    const form = e.target;
    const deliverymanId = form.deliverymanId.value;
    const date = form.date.value;
    const assignedData = {
      deliveryman_id: deliverymanId,
      approximate_date: date,
    };
    const assignRes = await axiosSecure.patch(`/parcels/${id}`, assignedData);
    if (assignRes.data.modifiedCount > 0) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Order assigned to ${dName}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    handleClose();
    refetch();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "50%", md: "40%" },
            // height: "50%",
            bgcolor: "background.paper",
            border: "2px solid #757C81",
            boxShadow: 24,
            p: 4,
          }}
        >
          <form onSubmit={handleAssignDeliveryman}>
            <FormControl fullWidth>
              <InputLabel>Assign Deliveryman</InputLabel>
              <Select
                label="Assign Deliveryman"
                name="deliverymanId"
                required
                sx={{
                  mb: "16px",
                }}
              >
                {deliverymans.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Approximate Delivery Date"
                type="date"
                name="date"
                required
                defaultValue={currentDate}
                sx={{
                  mb: "16px",
                }}
              ></TextField>
            </FormControl>
            <FormControl fullWidth>
              <Button variant="outlined" type="submit" color="success">
                Assign
              </Button>
            </FormControl>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AssignModal;
