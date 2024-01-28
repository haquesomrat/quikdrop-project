import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";
import { useState } from "react";
import NavItems from "../../../../Components/NavItems/NavITems";
import ProfileDropdown from "../../../../Components/ProfileDropdown/ProfileDropdown";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{ bgcolor: "rgba(58,69,75,.7)", backdropFilter: "blur(4px)" }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: "72px" }}>
          {/* logo for responsive  */}
          <Link to="/">
            <Typography
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: { xs: "none", sm: "flex" },
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

          {/* menus dropdown  */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <GiHamburgerMenu />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <ul className="font-medium">
                <NavItems />
              </ul>
            </Menu>
          </Box>

          {/* logo  */}
          <Typography
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "flex", sm: "none" },
              gap: "8px",
              flexGrow: 1,
              fontFamily: "ruda",
              fontWeight: 800,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link to={"/"} className="flex items-center gap-2">
              <TbTruckDelivery
                size={"32px"}
                sx={{
                  display: { xs: "none", sm: "flex" },
                  ml: 1,
                }}
              />
              <span className="text-xl">QuikDrop</span>
            </Link>
          </Typography>

          {/* menus  */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
            <ul className="flex font-medium">
              <NavItems />
            </ul>
          </Box>

          {/* profile dropdown  */}
          <ProfileDropdown />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
