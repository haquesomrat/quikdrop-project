import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useStats = () => {
  const axiosPublic = useAxiosPublic();
  const { data: stats = [] } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const statsRes = await axiosPublic("/stats");
      return statsRes?.data;
    },
  });
  return [stats];
};

export default useStats;
