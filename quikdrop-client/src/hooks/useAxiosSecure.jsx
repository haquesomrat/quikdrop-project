import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "https://quikdrop-haquesomrat.vercel.app",
});
const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // req interceptor to add authorization header for every secure call to the api
    axiosSecure.interceptors.request.use(
      function (config) {
        const token = localStorage.getItem("access-token");
        // console.log("request stopped by interceptors", token);
        config.headers.authorization = `Bearer ${token}`;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    // interceptors 401 and 403 status
    axiosSecure.interceptors.response.use(
      function (response) {
        return response;
      },
      async (error) => {
        const status = error?.response?.status;
        // console.log("error tracked in the interceptors", error.response);
        // for 401 and 403 status, logout the user and show him/her the login page
        if ((error.response && status === 401) || status === 403) {
          await logOut();
          navigate("/signin");
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
