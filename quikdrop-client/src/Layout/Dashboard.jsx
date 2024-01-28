import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { IoHome } from "react-icons/io5";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaAngellist, FaBoxesStacked, FaUsers } from "react-icons/fa6";
import { MdDeliveryDining } from "react-icons/md";
import { RiMailStarFill } from "react-icons/ri";
import { useState } from "react";
import { FaChevronLeft, FaUserCircle } from "react-icons/fa";
import { TbBookmarkPlus, TbTruckDelivery } from "react-icons/tb";
import { Link, NavLink, Outlet } from "react-router-dom";
import { ImStatsBars } from "react-icons/im";
import useFindSingleUser from "../hooks/useFindSingleUser";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [loggedUser] = useFindSingleUser();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* dashboard nav  */}
        <AppBar
          position="fixed"
          open={open}
          sx={{ bgcolor: "rgba(58,69,75,.7)", backdropFilter: "blur(4px)" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <GiHamburgerMenu />
            </IconButton>
            <Typography variant="h5" noWrap component="div">
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            {/* logo for responsive  */}
            <Link to="/">
              <Typography
                noWrap
                component="div"
                sx={{
                  mr: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "ruda",
                  fontWeight: 800,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <TbTruckDelivery
                  size={"32px"}
                  sx={{
                    display: { xs: "none", sm: "flex" },
                    ml: 1,
                  }}
                />
                <span className="text-xl">QuikDrop</span>
              </Typography>
            </Link>
            <IconButton onClick={handleDrawerClose}>
              <FaChevronLeft size={20} />
            </IconButton>
          </DrawerHeader>
          <Divider />
          {loggedUser?.role === "admin" ? (
            <List>
              {/* admin navlist  */}
              <NavLink to="/dashboard/statistics">
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <ImStatsBars size={24} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Statistics"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </NavLink>
              <NavLink to="/dashboard/parcels">
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <FaBoxesStacked size={24} />
                    </ListItemIcon>
                    <ListItemText
                      primary="All Parcels"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </NavLink>
              <NavLink to="/dashboard/users">
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <FaUsers size={24} />
                    </ListItemIcon>
                    <ListItemText
                      primary="All users"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </NavLink>
              <NavLink to="/dashboard/deliveymans">
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <MdDeliveryDining size={24} />
                    </ListItemIcon>
                    <ListItemText
                      primary="All Deliveryman"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            </List>
          ) : loggedUser?.role === "deliveryman" ? (
            <List>
              {/* deliveryman nav list  */}
              <NavLink to="/dashboard/deliveryList">
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <FaAngellist size={24} />
                    </ListItemIcon>
                    <ListItemText
                      primary="My Delivery List"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </NavLink>
              <NavLink to="/dashboard/reviews">
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <RiMailStarFill size={24} />
                    </ListItemIcon>
                    <ListItemText
                      primary="My Reviews"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            </List>
          ) : (
            <List>
              {/* user nav list  */}
              <NavLink to="/dashboard/bookAParcel">
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <TbBookmarkPlus size={28} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Book A Parcel"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </NavLink>
              <NavLink to="/dashboard/myParcels">
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <BsFillBookmarkCheckFill size={24} />
                    </ListItemIcon>
                    <ListItemText
                      primary="My Parcels"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </NavLink>
              <NavLink to="/dashboard/profile">
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <FaUserCircle size={24} />
                    </ListItemIcon>
                    <ListItemText
                      primary="My Profile"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            </List>
          )}

          <Divider />
          <List>
            <NavLink to="/">
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <IoHome size={24} />
                  </ListItemIcon>
                  <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
