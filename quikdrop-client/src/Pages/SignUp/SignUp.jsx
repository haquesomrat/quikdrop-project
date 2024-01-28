import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { TbTruckDelivery } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../Home/Shared/Navbar/Navbar";
import useAuth from "../../hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../Home/Shared/SocialLogin/SocialLogin";
import { Helmet } from "react-helmet";

const img_hosting_key = import.meta.env.VITE_img_hosting_key;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const SignUp = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm();

  // sign up with email and password
  const onSubmit = async (data) => {
    // img upload to imgbb and get an url

    const imageFile = { image: data.image[0] };

    const res = await axiosPublic.post(img_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const finalImg = res.data.data.display_url;
    if (res.data.success) {
      createUser(data.email, data.password)
        .then((res) => {
          const loggedUser = res.user;
          console.log(loggedUser, finalImg);
          updateUserProfile(data.name, finalImg).then(() => {
            // create user in the database
            const userInfo = {
              name: data.name,
              email: data.email,
              image: finalImg,
              role: "user",
            };
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                reset();
                toast.success("Sign Up Successful");
                navigate(from, { replace: true });
              }
            });
          });
        })
        .catch((err) => {
          console.log(err.message);
          toast.error("Email is already used");
        });
    }
  };

  return (
    <div>
      <Helmet>
        <title>QuikDrop | Sign Up</title>
      </Helmet>
      <Navbar />
      <Container>
        <div className="h-[calc(100vh-72px)] grid items-center justify-center">
          <div className="max-w-[600px] space-y-8">
            {/* logo  */}
            <div>
              <Link to="/">
                <Typography
                  noWrap
                  component="div"
                  sx={{
                    mr: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    fontFamily: "ruda",
                    fontWeight: 800,
                    letterSpacing: ".1rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <TbTruckDelivery
                    size={"60px"}
                    sx={{
                      display: { xs: "none", sm: "flex" },
                      ml: 1,
                    }}
                  />
                  <span className="text-4xl">QuikDrop</span>
                </Typography>
              </Link>
            </div>
            <Typography component="h1" textAlign="center" variant="h4">
              Sign Up
            </Typography>
            {/* login form  */}
            <div>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 3 }}
              >
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
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          sx={{ width: { xs: "100%", sm: "80%" } }}
                          label="Name"
                          variant="outlined"
                          fullWidth
                          error={!!errors.name}
                          helperText={errors.name && errors.name.message}
                        />
                      )}
                      rules={{
                        required: "Name is required",
                      }}
                    />
                    {/* Image Field */}
                    <input
                      className="border m-auto h-[56px] p-3 rounded"
                      type="file"
                      placeholder="Image"
                      {...register("image", { required: true })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {/* Email Field */}
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Email"
                          variant="outlined"
                          fullWidth
                          error={!!errors.email}
                          helperText={errors.email && errors.email.message}
                        />
                      )}
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Invalid email address",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {/* Password Field */}
                    <Controller
                      name="password"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Password"
                          variant="outlined"
                          fullWidth
                          type="password"
                          error={!!errors.password}
                          helperText={
                            errors.password && errors.password.message
                          }
                        />
                      )}
                      rules={{
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                        maxLength: {
                          value: 20,
                          message: "Password can't be more than 20 characters",
                        },
                      }}
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
                    Sign Up
                  </Button>
                </Grid>
                <Grid
                  container
                  display={{ xs: "grid", sm: "flex" }}
                  justifyContent={{ xs: "center", sm: "space-between" }}
                  gap="16px"
                  alignItems="center"
                  mt="10px"
                >
                  <SocialLogin />
                  <Grid item>
                    <Typography>
                      Already have an account?{" "}
                      <Link
                        className="hover:underline text-green-600 "
                        to="/signin"
                      >
                        Sign In
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SignUp;
