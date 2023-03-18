import StarRatings from "react-star-ratings";
const StarRating = (props) => {
  const { rating } = props;
  return (
    <StarRatings
      rating={rating}
      starRatedColor="#171717"
      numberOfStars={10}
      name="rating"
      starDimension="16px"
      starSpacing="2.5px"
    />
  );
};

export default StarRating;
