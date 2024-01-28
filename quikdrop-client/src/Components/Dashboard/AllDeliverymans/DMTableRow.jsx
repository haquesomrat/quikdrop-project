import { Rating, TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DMTableRow = ({ item }) => {
  const axiosSecure = useAxiosSecure();
  const [deliveredParcels, setDeliveredParcels] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    axiosSecure(
      `https://quikdrop-haquesomrat.vercel.app/delivered/${item?._id}`
    ).then((res) => {
      setDeliveredParcels(res?.data);
    });
  }, [axiosSecure, item?._id]);

  useEffect(() => {
    axiosSecure(
      `https://quikdrop-haquesomrat.vercel.app/reviews/${item?._id}`
    ).then((res) => setReviews(res?.data));
  }, [axiosSecure, item?._id]);

  //   calculate average review
  const ratings = reviews?.map((review) => {
    return parseFloat(review?.rating);
  });
  const totalRating = ratings?.reduce((item, total) => {
    return item + total;
  }, 0);
  const averageRating = totalRating / ratings?.length;

  return (
    <TableRow
      key={item?._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="item">
        {item?.name}
      </TableCell>
      <TableCell>{item?.phone || "01976758778"}</TableCell>
      <TableCell>{deliveredParcels?.length}</TableCell>
      <TableCell>
        <Rating name="read-only" value={averageRating || 0} readOnly />
      </TableCell>
    </TableRow>
  );
};

export default DMTableRow;
