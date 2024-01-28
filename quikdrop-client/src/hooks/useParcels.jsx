import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useParcels = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allParcels = [], refetch } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axiosSecure("/parcels");
      return res?.data;
    },
  });
  return [allParcels, refetch];
};

export default useParcels;
