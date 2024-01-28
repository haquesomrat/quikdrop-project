import { Controller, useForm } from "react-hook-form";
import { Box, Button, Grid, TextField } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import PageTitle from "../../../Components/Dashboard/PageTitle";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const UpdateAparcel = () => {
  const { user } = useAuth();
  const parcel = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const [weight, setWeight] = useState(parcel?.weight);
  const [price, setPrice] = useState(parcel?.price);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // update a parcel
  const onSubmit = (data) => {
    const updatedParcel = {
      name: user?.displayName,
      phone: data?.phone,
      email: user?.email,
      type: data?.type,
      weight: parseFloat(weight),
      receiver_name: data?.receiver_name,
      receiver_phone: data?.receiver_phone,
      delivery_address: data?.delivery_address,
      booking_date: parcel?.booking_date,
      requested_date: data?.requested_date,
      latitude: data?.latitude,
      longtitude: data?.longtitude,
      price: price,
    };

    console.log(parcel);

    Swal.fire({
      title: "Are you sure?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updateRes = await axiosSecure.patch(
          `/parcel/${parcel._id}`,
          updatedParcel
        );
        if (updateRes.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your parcel is successfully updated",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        reset();
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Dashboard | Update a Parcel</title>
      </Helmet>
      <PageTitle>Update a Parcel</PageTitle>
      {/* parcel booking form  */}
      <div>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              gap="8px"
            >
              {/* Name Field */}
              <Controller
                name="name"
                control={control}
                defaultValue={user?.displayName || "User"}
                render={({ field }) => (
                  <TextField
                    {...field}
                    sx={{ width: { xs: "100%", sm: "60%" } }}
                    label="Name"
                    variant="outlined"
                    value={user?.displayName || "User"}
                    disabled
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name && errors.name.message}
                  />
                )}
              />
              {/* Phone Field */}
              <Controller
                name="phone"
                control={control}
                defaultValue={parcel?.phone}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone"
                    defaultValue={parcel.phone}
                    sx={{ width: { xs: "100%", sm: "40%" } }}
                    variant="outlined"
                    type="number"
                    error={!!errors.phone}
                    helperText={errors.phone && errors.phone.message}
                  />
                )}
                rules={{
                  required: "Phone number is required",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              {/* Email Field */}
              <Controller
                name="email"
                control={control}
                defaultValue={user?.email || "example@email.com"}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    variant="outlined"
                    value={user?.email || "example@email.com"}
                    disabled
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email && errors.email.message}
                  />
                )}
              />
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              gap="8px"
            >
              {/* Parcel Type Field */}
              <Controller
                name="type"
                control={control}
                defaultValue={parcel.type}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Parcel Type"
                    variant="outlined"
                    fullWidth
                    type="text"
                    error={!!errors.type}
                    helperText={errors.type && errors.type.message}
                  />
                )}
                rules={{
                  required: "Parcel type is required",
                }}
              />
              {/* Parcel Weight Field */}
              <Controller
                name="weight"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Parcel Weight(kg)"
                    variant="outlined"
                    value={weight}
                    onChange={(e) => {
                      setWeight(e.target.value);
                      if (e.target.value <= 1) {
                        setPrice(50);
                      } else if (e.target.value <= 2) {
                        setPrice(100);
                      } else {
                        setPrice(150);
                      }
                      console.log(price, parseFloat(e.target.value));
                    }}
                    fullWidth
                    required
                    type="number"
                    error={!!errors.weight}
                    helperText={errors.weight && errors.weight.message}
                  />
                )}
              />
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              gap="8px"
            >
              {/* Receiver's Name Field */}
              <Controller
                name="receiver_name"
                control={control}
                defaultValue={parcel?.receiver_name}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Receiver's Name"
                    variant="outlined"
                    fullWidth
                    type="text"
                    error={!!errors.receiver_name}
                    helperText={
                      errors.receiver_name && errors.receiver_name.message
                    }
                  />
                )}
                rules={{
                  required: "Receiver's Name is required",
                }}
              />
              {/* Receiver's Phone Number Field */}
              <Controller
                name="receiver_phone"
                control={control}
                defaultValue={parcel?.receiver_phone}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Receiver's Phone Number"
                    variant="outlined"
                    fullWidth
                    type="number"
                    error={!!errors.receiver_phone}
                    helperText={
                      errors.receiver_phone && errors.receiver_phone.message
                    }
                  />
                )}
                rules={{
                  required: "Receiver's Phone Number is required",
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              gap="8px"
            >
              {/* Delivery Address Field */}
              <Controller
                name="delivery_address"
                control={control}
                defaultValue={parcel?.delivery_address}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Delivery Address"
                    variant="outlined"
                    fullWidth
                    type="text"
                    error={!!errors.delivery_address}
                    helperText={
                      errors.delivery_address && errors.delivery_address.message
                    }
                  />
                )}
                rules={{
                  required: "Delivery Address is required",
                }}
              />
              {/* Requested Delivery Date Field */}
              <Controller
                name="requested_date"
                control={control}
                defaultValue={parcel?.requested_date}
                render={({ field }) => (
                  <TextField
                    {...field}
                    // label="Delivery Date"
                    variant="outlined"
                    fullWidth
                    type="date"
                    error={!!errors.requested_date}
                    helperText={
                      errors.requested_date && errors.requested_date.message
                    }
                  />
                )}
                rules={{
                  required: "Requested Delivery Date is required",
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              gap="8px"
            >
              {/* Delivery Address Latitude Field */}
              <Controller
                name="latitude"
                control={control}
                defaultValue={parcel?.latitude}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Delivery Address Latitude"
                    variant="outlined"
                    fullWidth
                    type="number"
                    error={!!errors.latitude}
                    helperText={errors.latitude && errors.latitude.message}
                  />
                )}
                rules={{
                  required: "Delivery Address Latitude is required",
                }}
              />
              {/* Delivery Address Longtitude Field */}
              <Controller
                name="longtitude"
                control={control}
                defaultValue={parcel?.longtitude}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Delivery Address Longtitude"
                    variant="outlined"
                    fullWidth
                    type="number"
                    error={!!errors.longtitude}
                    helperText={errors.longtitude && errors.longtitude.message}
                  />
                )}
                rules={{
                  required: "Delivery Address Longtitude is required",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              {/* Price Field */}
              <Controller
                name="price"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Price"
                    variant="outlined"
                    fullWidth
                    disabled
                    value={price}
                    type="number"
                    error={!!errors.price}
                    helperText={errors.price && errors.price.message}
                  />
                )}
                // rules={{
                //   required: "Price is required",
                // }}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}
            >
              Book Parcel
            </Button>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default UpdateAparcel;
