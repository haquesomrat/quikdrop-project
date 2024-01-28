import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useFindSingleUser = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: loggedUser } = useQuery({
    queryKey: [user?.email, "loggedUser"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/user?email=${user?.email}`);
      console.log(res?.data);
      return res?.data;
    },
  });
  return [loggedUser];
};

export default useFindSingleUser;
