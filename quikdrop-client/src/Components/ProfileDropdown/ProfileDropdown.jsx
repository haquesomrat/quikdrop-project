import { Avatar, Box, Button, IconButton, Menu, Tooltip } from "@mui/material";
import DashboardLinks from "../NavItems/DashboardLinks";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { FaBell } from "react-icons/fa";

const ProfileDropdown = () => {
  const { user, logOut } = useAuth();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logout Successful");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {user ? (
        <>
          {/* notification icon */}
          <FaBell className="mr-4" size={20} />
          {/* profile dropdown  */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="User"
                  src={user ? user?.photoURL : "/static/images/avatar/2.jpg"}
                />
              </IconButton>
            </Tooltip>
            {/* profile dropdown menus */}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <ul className="font-medium ">
                <li className="px-4 py-1 select-none">
                  {user ? user.displayName : "User Name"}
                </li>
                <DashboardLinks />
                {user && (
                  <li
                    onClick={handleLogout}
                    className="px-4 py-1 cursor-pointer"
                  >
                    Logout
                  </li>
                )}
              </ul>
            </Menu>
          </Box>
        </>
      ) : (
        <Button
          variant="outlined"
          sx={{
            borderColor: "#fff",
            color: "#fff",
            "&:hover": {
              borderColor: "#fff",
              backgroundColor: "rgba(255,255,255,0.2)",
            },
          }}
        >
          <NavLink to={"/signin"}>Sign In</NavLink>
        </Button>
      )}
    </>
  );
};

export default ProfileDropdown;
