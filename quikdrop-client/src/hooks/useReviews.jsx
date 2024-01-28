import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure("/reviews");
      return res?.data;
    },
  });
  return [reviews];
};

export default useReviews;
