import {
  Box,
  Button,
  FormControl,
  Modal,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ReviewModal = ({ open, handleClose, id }) => {
  const { user } = useAuth();
  const [value, setValue] = useState(0);
  const axiosSecure = useAxiosSecure();

  const handleReview = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.reviewer_name.value;
    const image = form.reviewer_image.value;
    const rating = form.rating.value;
    const feedback = form.feedback.value;
    const date = new Date();
    const review = {
      reviewer_name: name,
      reviewer_image: image,
      review_date: date,
      rating: rating,
      feedback: feedback,
      deliveryman_id: id,
    };
    const reviewRes = await axiosSecure.post("/reviews", review);
    // console.log(reviewRes.data);
    if (reviewRes.data.insertedId) {
      handleClose(true);
      Swal.fire({
        title: "FeedBack",
        text: "Review given successfully",
        icon: "success",
      });
    }
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
            bgcolor: "background.paper",
            border: "2px solid #757C81",
            boxShadow: 24,
            p: 4,
          }}
        >
          <form onSubmit={handleReview} className="space-y-6">
            <FormControl fullWidth>
              <TextField
                label="Reviewer's Name"
                value={user?.displayName}
                type="text"
                name="reviewer_name"
              ></TextField>
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Reviewer's Image"
                value={user?.photoURL}
                type="text"
                name="reviewer_image"
              ></TextField>
            </FormControl>
            <Typography>Rate the Deliveryman</Typography>
            <Rating
              name="rating"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <FormControl fullWidth>
              <TextField
                label="Review the service"
                type="text"
                name="feedback"
              ></TextField>
            </FormControl>
            <Typography>Deliveryman&apos;s ID: {id}</Typography>
            <FormControl fullWidth>
              <Button variant="outlined" type="submit" color="success">
                Submit
              </Button>
            </FormControl>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default ReviewModal;
