import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useDeliveryman = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isDeliveryman, isPending: isDeliverymanLoading } = useQuery({
    queryKey: [user?.email, "isdeliveryman"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/deliveryman/${user?.email}`);
      //   console.log(res?.data);
      return res?.data?.deliveryman;
    },
  });
  return [isDeliveryman, isDeliverymanLoading];
};

export default useDeliveryman;
