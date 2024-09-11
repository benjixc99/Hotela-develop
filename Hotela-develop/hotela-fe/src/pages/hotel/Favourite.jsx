import { Box } from "@mantine/core";

import hostelRoom from "../../assets/hostelRoom.jpg";
import FavouritesList from "../../components/features/favourite/FavouritesList";
import EmptyFavourite from "../../components/features/favourite/EmptyFavourite";
import { useSelector } from "react-redux";
import { currentUser } from "../../Store/auth/authSlice";
import { useGetFavouritesQuery } from "../../Store/Slices/authenticationSlice";

function Favourite() {
  const favouriteList = [
    {
      id: 1,
      image: hostelRoom,
      hotelName: "Hotel Norrebro",
      distance: "0.4 km from city centre",
      cancellation: true,
      BreakfastIncluded: false,
      reviews: "1000 reviews",
      rating: "Excellent",
      ratingScore: "9.6",
      roomType: "Comfort room",
      bedType: "1x king size bed",
      bathroom: "1x bathroom",
      price: "£180",
      nights: "3 nights, 2 guests",
      badges: ["#Hotel deal", "#Popular"],
    },
    {
      id: 2,
      image: hostelRoom,
      hotelName: "Hotel Central",
      distance: "1.2 km from city centre",
      cancellation: true,
      BreakfastIncluded: false,
      reviews: "800 reviews",
      rating: "Very Good",
      ratingScore: "8.5",
      roomType: "Deluxe room",
      bedType: "1x queen size bed",
      bathroom: "1x bathroom",
      price: "£200",
      nights: "3 nights, 2 guests",
      badges: ["#Luxury", "#Trending"],
    },
    {
      id: 3,
      image: hostelRoom,
      hotelName: "Hotel Vista",
      distance: "2.0 km from city centre",
      cancellation: true,
      BreakfastIncluded: false,
      reviews: "500 reviews",
      rating: "Good",
      ratingScore: "7.8",
      roomType: "Standard room",
      bedType: "2x single beds",
      bathroom: "1x bathroom",
      price: "£150",
      nights: "3 nights, 2 guests",
      badges: ["#Value", "#Economy"],
    },
    {
      id: 4,
      image: hostelRoom,
      hotelName: "Hotel Ocean",
      distance: "0.8 km from city centre",
      cancellation: true,
      BreakfastIncluded: false,
      reviews: "1200 reviews",
      rating: "Exceptional",
      ratingScore: "9.8",
      roomType: "Suite",
      bedType: "1x king size bed",
      bathroom: "2x bathrooms",
      price: "£350",
      nights: "3 nights, 2 guests",
      badges: ["#TopRated", "#Luxury"],
    },
    {
      id: 5,
      image: hostelRoom,
      hotelName: "Hotel Sky",
      distance: "0.3 km from city centre",
      cancellation: true,
      BreakfastIncluded: false,
      reviews: "900 reviews",
      rating: "Excellent",
      ratingScore: "9.2",
      roomType: "Junior Suite",
      bedType: "1x queen size bed",
      bathroom: "1x bathroom",
      price: "£250",
      nights: "3 nights, 2 guests",
      badges: ["#Popular", "#Luxury"],
    },
    {
      id: 6,
      image: hostelRoom,
      hotelName: "Hotel Horizon",
      distance: "1.5 km from city centre",
      cancellation: true,
      BreakfastIncluded: false,
      reviews: "700 reviews",
      rating: "Very Good",
      ratingScore: "8.4",
      roomType: "Comfort room",
      bedType: "1x king size bed",
      bathroom: "1x bathroom",
      price: "£180",
      nights: "3 nights, 2 guests",
      badges: ["#Trending", "#Comfort"],
    },
    {
      id: 7,
      image: hostelRoom,
      hotelName: "Hotel Garden",
      distance: "2.3 km from city centre",
      cancellation: true,
      BreakfastIncluded: false,
      reviews: "600 reviews",
      rating: "Good",
      ratingScore: "7.9",
      roomType: "Deluxe room",
      bedType: "1x queen size bed",
      bathroom: "1x bathroom",
      price: "£220",
      nights: "3 nights, 2 guests",
      badges: ["#Value", "#Popular"],
    },
    {
      id: 8,
      image: hostelRoom,
      hotelName: "Hotel Mountain",
      distance: "3.0 km from city centre",
      cancellation: true,
      BreakfastIncluded: false,
      reviews: "400 reviews",
      rating: "Good",
      ratingScore: "7.5",
      roomType: "Standard room",
      bedType: "2x single beds",
      bathroom: "1x bathroom",
      price: "£160",
      nights: "3 nights, 2 guests",
      badges: ["#Economy", "#Comfort"],
    },
    {
      id: 9,
      image: hostelRoom,
      hotelName: "Hotel River",
      distance: "1.0 km from city centre",
      cancellation: true,
      BreakfastIncluded: false,
      reviews: "1100 reviews",
      rating: "Exceptional",
      ratingScore: "9.9",
      roomType: "Suite",
      bedType: "1x king size bed",
      bathroom: "2x bathrooms",
      price: "£400",
      nights: "3 nights, 2 guests",
      badges: ["#TopRated", "#Luxury"],
    },
  ];

  const user = useSelector(currentUser);
  const { data: singleUser = {} } = useGetFavouritesQuery(user?.userInfo?._id);

  // TO CHECK EMPTY FAVOURITE
  // const favouriteList = [];

  return (
    <Box w={"100%"}>
      {singleUser?.favourites?.length === 0 ? (
        <EmptyFavourite />
      ) : (
        <FavouritesList
          favouriteList={singleUser?.favourites}
          currentUser={singleUser?._id}
        />
      )}
    </Box>
  );
}

export default Favourite;
