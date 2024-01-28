import PageTitle from "../../../Components/Dashboard/PageTitle";
import { Card, CardContent, Grid, Rating, Typography } from "@mui/material";
import useReviews from "../../../hooks/useReviews";
import moment from "moment";
import useFindSingleUser from "../../../hooks/useFindSingleUser";
import { Helmet } from "react-helmet";

const Reviews = () => {
  const [reviews] = useReviews();
  const [loggedUser] = useFindSingleUser();

  const deliverymanReviews = reviews.filter((review) => {
    return loggedUser._id === review.deliveryman_id;
  });

  return (
    <div>
      <Helmet>
        <title>Dashboard | Customer Reviews</title>
      </Helmet>
      <PageTitle>My Reviews</PageTitle>
      {/* review cards  */}
      <Grid container spacing={4}>
        {deliverymanReviews.map((card) => (
          <Grid item key={card._id} xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <div>
                  <img
                    className="rounded-full mx-auto w-20"
                    src={card.reviewer_image}
                    alt="reviewer image"
                  />
                </div>
                <Typography
                  variant="body2"
                  sx={{
                    marginBlock: "4px",
                  }}
                >
                  {moment(card.review_date).format("LL")}
                </Typography>
                <Rating name="read-only" value={card?.rating} readOnly />
                <Typography variant="h6">- {card.reviewer_name}</Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mt: "8px",
                  }}
                >
                  {card.feedback}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Reviews;
