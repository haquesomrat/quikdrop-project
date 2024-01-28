import { Box, Container, Typography } from "@mui/material";
import { TbTruckDelivery } from "react-icons/tb";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import moment from "moment";

const Footer = () => {
  const date = moment().format("YYYY");
  return (
    <div>
      <Box
        component="footer"
        sx={{
          py: 6,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[400]
              : theme.palette.grey[800],
        }}
      >
        <Container>
          <div className="space-y-4">
            {/* footer logo  */}
            <div>
              <Link to="/">
                <Typography
                  noWrap
                  component="div"
                  sx={{
                    mr: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", md: "left" },
                    gap: "8px",
                    fontFamily: "ruda",
                    fontWeight: 800,
                    letterSpacing: ".1rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <TbTruckDelivery
                    size={"40px"}
                    sx={{
                      display: { xs: "none", sm: "flex" },
                      ml: 1,
                    }}
                  />
                  <span className="text-2xl">QuikDrop</span>
                </Typography>
              </Link>
            </div>
            {/* footer content  */}
            <div className="grid grid-cols-1 md:grid-cols-5 text-center md:text-left gap-8">
              <nav className="flex flex-col gap-2 text-white/80 justify-between">
                <header className="text-xl font-semibold pb-3">Company</header>
                <div className="flex flex-col gap-1">
                  <a href="#">About</a>
                  <a href="#">Product</a>
                  <a href="#">Blog</a>
                </div>
              </nav>
              <nav className="flex flex-col gap-2 text-white/80 justify-between">
                <header className="text-xl font-semibold pb-3">Join Us</header>
                <div className="flex flex-col gap-1 mb-auto">
                  <a href="#">Driver Partner</a>
                  <a href="#">Merchant</a>
                </div>
              </nav>
              <nav className="flex flex-col gap-2 text-white/80">
                <header className="text-xl font-semibold pb-3">Career</header>
                <div className="flex flex-col gap-1 mb-auto">
                  <a href="#">Intership</a>
                  <a href="#">Professional</a>
                </div>
              </nav>
              <nav className="flex flex-col gap-2 text-white/80">
                <header className="text-xl font-semibold pb-3">
                  Further Information
                </header>
                <div className="flex flex-col gap-1 mb-auto">
                  <a href="#">Terms & Condition</a>
                  <a href="#">Privacy Policy</a>
                </div>
              </nav>
              <nav className="flex flex-col gap-2 text-white/80">
                <header className="text-xl font-semibold pb-3">Find Us</header>
                <div className="flex justify-center md:justify-start gap-4">
                  <a className="hover:animate-bounce" href="#">
                    <FaFacebook size={24} />
                  </a>

                  <a className="hover:animate-bounce" href="#">
                    <AiFillTwitterCircle size={24} />
                  </a>
                </div>
              </nav>
            </div>
            {/* copyright */}
            <div className="text-center">
              <small className="text-sm md:text-base font-ruda">
                Copyright &copy; {date} QuikDrop Inc.
              </small>
            </div>
          </div>
        </Container>
      </Box>
    </div>
  );
};

export default Footer;
