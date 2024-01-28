import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://quikdrop-haquesomrat.vercel.app",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
