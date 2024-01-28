import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const SocialLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { googleSignIn } = useAuth();
  const axiosSecure = useAxiosSecure();

  const from = location.state?.from?.pathname || "/";

  // google sign in
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((res) => {
        const userInfo = {
          name: res?.user?.displayName,
          email: res?.user?.email,
          image: res?.user?.photoURL,
          role: "user",
        };
        axiosSecure.post("/users", userInfo).then((res) => {
          console.log(res.data);
          toast.success("Google Login Successful");
          navigate(from, { replace: true });
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Button
        variant="outlined"
        color="success"
        onClick={handleGoogleSignIn}
        sx={{ borderRadius: "5rem" }}
        startIcon={<FcGoogle size={30} />}
      >
        Login With Google
      </Button>
    </div>
  );
};

export default SocialLogin;
