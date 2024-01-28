import { Box, Button, Container, TextField } from "@mui/material";
import Lottie from "react-lottie";
import heroLogo from "../../../assets/logos/hero-logo.json";
import heroBg from "../../../assets/images/hero-bg.png";

const Hero = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: heroLogo,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="bg-[#3A454B] relative">
      <Container>
        <div className="flex flex-col-reverse sm:flex-row items-center pt-10 pb-16 gap-4 sm:gap-0 md:gap-4">
          {/* hero bg  */}
          <div>
            <img
              className="absolute bottom-0 left-0 opacity-20 bg-contain bg-center"
              src={heroBg}
              alt="hero bg"
            />
          </div>
          {/* hero text container  */}
          <div className="w-full sm:w-1/2 text-white space-y-4 sm:space-y-3 md:space-y-5 lg:space-y-6 text-center sm:text-left">
            <h2 className="font-ruda text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide font-extrabold">
              Reliable Service Every Time
            </h2>
            <p>
              Bangladesh&apos;s most trusted on-demand logistics network
              offering tech-enabled one stop delivery solutions. Since its
              inception in 2024, our vision has been to become the operating
              system for e-commerce in Bangladesh, through a combination of
              world-class infrastructure, logistics operations of the highest
              quality and cutting-edge technology capabilities.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex justify-center sm:justify-start items-center gap-2 sm:gap-3"
            >
              <Box
                sx={{
                  width: 400,
                  maxWidth: "100%",
                  border: "none",
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Enter Delivery Address"
                  size="small"
                  sx={{ backgroundColor: "white", borderRadius: "10px" }}
                />
              </Box>
              <Button
                type="submit"
                size="small"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  minWidth: "80px",
                  height: "40px",
                  margin: "0",
                  backgroundColor: "#F39F39",
                  "&:hover": {
                    backgroundColor: "rgba(243,159,57,.9)",
                  },
                }}
              >
                go
              </Button>
            </form>
          </div>
          {/* hero animation container  */}
          <div className="w-full sm:w-1/2">
            <Lottie options={defaultOptions} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
