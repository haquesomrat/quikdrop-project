import { Avatar, Box, FormControl, Typography } from "@mui/material";
import PageTitle from "../../../Components/Dashboard/PageTitle";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useFindSingleUser from "../../../hooks/useFindSingleUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const img_hosting_key = import.meta.env.VITE_img_hosting_key;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const Profile = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [loggedUser] = useFindSingleUser();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // img upload to imgbb and get an url
    const imageFile = { image: data.image[0] };

    const res = await axiosPublic.post(img_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const finalImg = res.data.data.display_url;
    const updateImg = {
      img: finalImg,
    };

    // update in the database
    const updateImgRes = await axiosSecure.patch(
      `/users/${loggedUser._id}`,
      updateImg
    );
    if (updateImgRes.data.modifiedCount > 0) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your profile image is successfully updated ",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div>
      <Helmet>
        <title>Dashboard | My Profile</title>
      </Helmet>
      <PageTitle>My Profile</PageTitle>
      <Box>
        <div>
          <Avatar
            alt="User Avatar"
            src={loggedUser.image}
            sx={{ width: 120, height: 120 }}
          />
        </div>
        <Typography variant="h5" className="mt-3">
          {loggedUser.name || "User"}
        </Typography>
        {/* User details */}
        <div className="grid gap-2 my-4">
          <Typography color="textSecondary" className="mt-1">
            Role: {loggedUser.role}
          </Typography>
          <Typography variant="body" color="textSecondary">
            Email: {loggedUser.email || "example@gmail.com"}
          </Typography>
          <Typography variant="body" color="textSecondary" className="mt-1">
            Phone:{loggedUser.phoneNumber || "+8801754-000222"}
          </Typography>
        </div>
        <form
          className="inline-flex flex-col sm:flex-row gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl>
            <input
              name="image"
              type="file"
              className="p-1 border rounded-lg w-52"
              {...register("image", { required: true })}
            />
            {errors.image && (
              <span className="text-red-500 my-2">Image field is required</span>
            )}
          </FormControl>
          <input
            type="submit"
            value="Update"
            className="border rounded-lg px-4 py-2 bg-slate-400 text-white max-h-10"
          />
        </form>
      </Box>
    </div>
  );
};

export default Profile;
