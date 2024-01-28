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
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import toast from "react-hot-toast";
import Navbar from "../Home/Shared/Navbar/Navbar";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SocialLogin from "../Home/Shared/SocialLogin/SocialLogin";
import { Helmet } from "react-helmet";

const SignIn = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [disabled, setDisabled] = useState(true);
  const { signIn } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // load captcha
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  // login with email and password
  const onSubmit = (data) => {
    console.log(data);
    signIn(data?.email, data?.password)
      .then((res) => {
        console.log(res?.user);
        toast.success("Sign In Successful");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid Email/Password");
      });
  };

  // validate captcha
  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  return (
    <div>
      <Helmet>
        <title>QuikDrop | Sign In</title>
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
              Sign In
            </Typography>
            {/* login form  */}
            <div>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
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
                  <Grid item xs={12}>
                    <LoadCanvasTemplate />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="captcha"
                      onBlur={handleValidateCaptcha}
                      label="Captcha"
                      placeholder="Enter Valid Captcha"
                      type="text"
                    />
                  </Grid>
                </Grid>
                <Grid container justifyContent="center">
                  <Button
                    type="submit"
                    disabled={disabled}
                    size="large"
                    variant="contained"
                    color="success"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
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
                    <Typography textAlign="center">
                      New to QuikDrop?{" "}
                      <Link
                        className="hover:underline text-green-600 "
                        to="/signup"
                      >
                        Sign Up
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

export default SignIn;
