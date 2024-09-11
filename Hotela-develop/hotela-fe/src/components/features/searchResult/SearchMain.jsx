/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import {
  Box,
  Flex,
  Group,
  Image,
  Select,
  Stack,
  Text,
  Title,
  Badge,
  Pagination,
  Button,
  Loader,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useMediaQuery } from "@mantine/hooks";
import { differenceInDays, format } from "date-fns";
import { Link } from "react-router-dom";
import {
  useAddToFavouriteMutation,
  useGetSingleUserQuery,
} from "../../../Store/Slices/authenticationSlice";
import { useSelector } from "react-redux";
import { currentUser } from "../../../Store/auth/authSlice";

function SearchMain({
  onOpen,
  roomData,
  isLoading,
  location,
  checkIn,
  checkOut,
  guest,
}) {
  // const roomData = [
  //   {
  //     id: 1,
  //     image: hostelRoom,
  //     hotelName: "Hotel Norrebro",
  //     distance: "0.4 km from city centre",
  //     cancellation: true,
  //     BreakfastIncluded: false,
  //     reviews: "1000 reviews",
  //     rating: "Excellent",
  //     ratingScore: "9.6",
  //     roomType: "Comfort room",
  //     bedType: "1x king size bed",
  //     bathroom: "1x bathroom",
  //     price: "£180",
  //     nights: "3 nights, 2 guests",
  //     badges: ["#Hotel deal", "#Popular"],
  //   },
  //   {
  //     id: 2,
  //     image: hostelRoom,
  //     hotelName: "Hotel Central",
  //     distance: "1.2 km from city centre",
  //     cancellation: true,
  //     BreakfastIncluded: false,
  //     reviews: "800 reviews",
  //     rating: "Very Good",
  //     ratingScore: "8.5",
  //     roomType: "Deluxe room",
  //     bedType: "1x queen size bed",
  //     bathroom: "1x bathroom",
  //     price: "£200",
  //     nights: "3 nights, 2 guests",
  //     badges: ["#Luxury", "#Trending"],
  //   },
  //   {
  //     id: 3,
  //     image: hostelRoom,
  //     hotelName: "Hotel Vista",
  //     distance: "2.0 km from city centre",
  //     cancellation: true,
  //     BreakfastIncluded: false,
  //     reviews: "500 reviews",
  //     rating: "Good",
  //     ratingScore: "7.8",
  //     roomType: "Standard room",
  //     bedType: "2x single beds",
  //     bathroom: "1x bathroom",
  //     price: "£150",
  //     nights: "3 nights, 2 guests",
  //     badges: ["#Value", "#Economy"],
  //   },
  //   {
  //     id: 4,
  //     image: hostelRoom,
  //     hotelName: "Hotel Ocean",
  //     distance: "0.8 km from city centre",
  //     cancellation: true,
  //     BreakfastIncluded: false,
  //     reviews: "1200 reviews",
  //     rating: "Exceptional",
  //     ratingScore: "9.8",
  //     roomType: "Suite",
  //     bedType: "1x king size bed",
  //     bathroom: "2x bathrooms",
  //     price: "£350",
  //     nights: "3 nights, 2 guests",
  //     badges: ["#TopRated", "#Luxury"],
  //   },
  //   {
  //     id: 5,
  //     image: hostelRoom,
  //     hotelName: "Hotel Sky",
  //     distance: "0.3 km from city centre",
  //     cancellation: true,
  //     BreakfastIncluded: false,
  //     reviews: "900 reviews",
  //     rating: "Excellent",
  //     ratingScore: "9.2",
  //     roomType: "Junior Suite",
  //     bedType: "1x queen size bed",
  //     bathroom: "1x bathroom",
  //     price: "£250",
  //     nights: "3 nights, 2 guests",
  //     badges: ["#Popular", "#Luxury"],
  //   },
  //   {
  //     id: 6,
  //     image: hostelRoom,
  //     hotelName: "Hotel Horizon",
  //     distance: "1.5 km from city centre",
  //     cancellation: true,
  //     BreakfastIncluded: false,
  //     reviews: "700 reviews",
  //     rating: "Very Good",
  //     ratingScore: "8.4",
  //     roomType: "Comfort room",
  //     bedType: "1x king size bed",
  //     bathroom: "1x bathroom",
  //     price: "£180",
  //     nights: "3 nights, 2 guests",
  //     badges: ["#Trending", "#Comfort"],
  //   },
  //   {
  //     id: 7,
  //     image: hostelRoom,
  //     hotelName: "Hotel Garden",
  //     distance: "2.3 km from city centre",
  //     cancellation: true,
  //     BreakfastIncluded: false,
  //     reviews: "600 reviews",
  //     rating: "Good",
  //     ratingScore: "7.9",
  //     roomType: "Deluxe room",
  //     bedType: "1x queen size bed",
  //     bathroom: "1x bathroom",
  //     price: "£220",
  //     nights: "3 nights, 2 guests",
  //     badges: ["#Value", "#Popular"],
  //   },
  //   {
  //     id: 8,
  //     image: hostelRoom,
  //     hotelName: "Hotel Mountain",
  //     distance: "3.0 km from city centre",
  //     cancellation: true,
  //     BreakfastIncluded: false,
  //     reviews: "400 reviews",
  //     rating: "Good",
  //     ratingScore: "7.5",
  //     roomType: "Standard room",
  //     bedType: "2x single beds",
  //     bathroom: "1x bathroom",
  //     price: "£160",
  //     nights: "3 nights, 2 guests",
  //     badges: ["#Economy", "#Comfort"],
  //   },
  //   {
  //     id: 9,
  //     image: hostelRoom,
  //     hotelName: "Hotel River",
  //     distance: "1.0 km from city centre",
  //     cancellation: true,
  //     BreakfastIncluded: false,
  //     reviews: "1100 reviews",
  //     rating: "Exceptional",
  //     ratingScore: "9.9",
  //     roomType: "Suite",
  //     bedType: "1x king size bed",
  //     bathroom: "2x bathrooms",
  //     price: "£400",
  //     nights: "3 nights, 2 guests",
  //     badges: ["#TopRated", "#Luxury"],
  //   },
  // ];
  const user = useSelector(currentUser);
  const { data: singleUser = {}, isLoading: favLoad } = useGetSingleUserQuery(
    user?.userInfo?._id,
  );

  const [addToFavorite] = useAddToFavouriteMutation();
  const startDate = new Date(checkIn);
  const endDate = new Date(checkOut);
  function chunk(array, size) {
    if (!array.length) {
      return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
  }

  const [activePage, setPage] = useState(1);

  const [animate, setAnimate] = useState(null);
  const data = chunk(roomData, 3);

  // Use useEffect to scroll to top when activePage changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activePage]);

  const handleFavouriteClick = async (hotelId) => {
    try {
      const data = await addToFavorite({
        userId: singleUser._id,
        hotelId,
      }).unwrap();
      setAnimate(hotelId);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const isMobile = useMediaQuery("(max-width: 980px)"); // Adjusted for mobile view

  return (
    <Box px={{ base: 0, md: 40 }} c={"#000814"}>
      <Title
        order={4}
        fz={{ base: 15, xs: 20, sm: 27 }}
        ta={isMobile && "center"}
        mb={isMobile && 5}>
        {location}, {checkIn && format(checkIn, "d MMM")} -{" "}
        {checkOut && format(checkOut, "d MMM")}, {guest} guests
      </Title>

      <Flex
        align='center'
        justify={{ base: "center", md: "space-between" }}
        mb={20}
        gap={20}>
        {!isMobile &&
          (roomData?.length <= 0 ? (
            <Text fz='md' fw={500}>
              No Properties found.
            </Text>
          ) : (
            <Text fz='md' fw={500}>
              {roomData?.length}+ Properties
            </Text>
          ))}

        {isMobile && (
          <Button
            display={{ base: "block", md: "none" }}
            w={200}
            onClick={onOpen}>
            Filter and Map
          </Button>
        )}

        <Select
          label={isMobile ? "" : "Sort by"}
          fw={600}
          defaultValue='Recommended'
          placeholder='Pick value'
          data={[
            "Recommended",
            "Price: high to low",
            "Price: low to high",
            "Star rating",
          ]}
          variant='unstyled'
          styles={(theme) => ({
            input: {
              border: "1px solid gray",
              padding: "0.5rem 1rem",
              borderRadius: theme.radius.md,
            },
          })}
        />
      </Flex>

      {isMobile &&
        (roomData?.length <= 0 ? (
          <Text fz='xs' ta={"center"} mb={10} mt={-15}>
            No Properties found.
          </Text>
        ) : (
          <Text fz='xs' ta={"center"} mb={10} mt={-15}>
            {roomData?.length}+ Properties
          </Text>
        ))}

      <Stack gap={20}>
        {isLoading && (
          <Flex w='100%' h={"60vh"} justify={"center"} align={"center"} py={10}>
            <Loader color='blue' size='xl' type='dots' />;
          </Flex>
        )}

        {!roomData || roomData?.length === 0 ? (
          <Flex
            w='100%'
            p='lg'
            ta={"center"}
            mih={"60vh"}
            align={"center"}
            justify={"center"}>
            <Stack spacing='md' align='center'>
              <Title order={1} size={isMobile ? 24 : 36}>
                No hotel in {location}.
              </Title>
              <Text size={isMobile ? "sm" : "md"} c='dimmed'>
                Start exploring our options in other locations and book your
                stay to see them here!
              </Text>
            </Stack>
          </Flex>
        ) : (
          data[activePage - 1]?.map((room) => (
            <Flex
              key={room._id}
              direction={isMobile ? "column" : "row"}
              style={{
                borderRadius: "15px",
                boxShadow: "1px 0px 4px 4px rgba(0, 0, 0, 0.1)",
                height: "45vh",
              }}
              gap={14}>
              <Box w={isMobile ? "100%" : "35%"} h={"auto"} pos={"relative"}>
                {room?.images.map(
                  (url, i) =>
                    i === 0 && (
                      <Image
                        key={i}
                        src={`http://localhost:5000/${url}`}
                        fit='cover'
                        h={"100%"}
                        style={{
                          borderRadius: "15px",
                        }}
                      />
                    ),
                )}
                <Button
                  onClick={() => handleFavouriteClick(room._id)}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "100%",
                    transition: "transform 0.3s ease",
                    transform: singleUser?.favourites?.includes(room._id)
                      ? "scale(1.2)"
                      : "scale(0.9)",
                  }}
                  bg={"rgba(255, 255, 255, 0.9)"}
                  loading={favLoad}
                  w={18}
                  h={35}>
                  {singleUser?.favourites?.includes(room._id) ? (
                    <FaHeart color='#dd0426' size={16} />
                  ) : (
                    <CiHeart color='#ff6347' size={18} />
                  )}
                </Button>
              </Box>

              <Flex
                direction={"column"}
                p={10}
                gap={13}
                w={isMobile ? "100%" : "75%"}>
                <Link
                  to={`/HotelDetails?name=${room?.name}&reg=${room?._id}&checkIn=${checkIn}&checkOut=${checkOut}&guest=${guest}`}>
                  <Group justify='space-between' align='flex-start'>
                    <Stack gap={0}>
                      <Title order={4}>{room?.name}</Title>
                      <Text fz={14} c={"gray"}>
                        {room?.location}
                      </Text>

                      {room.cancellation && (
                        <Text size='xs' c='gray' mt={1}>
                          Free cancellation
                        </Text>
                      )}

                      {room.BreakfastIncluded && (
                        <Text size='xs' c='gray' mt={1}>
                          Breakfast included
                        </Text>
                      )}
                    </Stack>

                    <Group gap={8}>
                      <Stack align='end' justify='center' gap='0'>
                        {room?.averageRating === 0 && (
                          <Text fz={16} c={"red"} fw={600}>
                            Poor
                          </Text>
                        )}
                        {room?.averageRating > 0 && room?.averageRating < 2 && (
                          <Text fz={16} c={"orange"} fw={600}>
                            Poor
                          </Text>
                        )}
                        {room?.averageRating >= 2 &&
                          room?.averageRating < 3.5 && (
                            <Text fz={16} c={"orange"} fw={600}>
                              Good
                            </Text>
                          )}
                        {room?.averageRating >= 3.5 &&
                          room?.averageRating < 4.5 && (
                            <Text fz={16} c={"teal"} fw={600}>
                              Very Good
                            </Text>
                          )}
                        {room?.averageRating >= 4.5 && (
                          <Text fz={16} c={"teal"} fw={600}>
                            Excellent
                          </Text>
                        )}
                        <Text fz={11} c={"gray"}>
                          {room.visitorCount} reviews
                        </Text>
                      </Stack>

                      <Badge
                        variant='light'
                        color={
                          room?.averageRating === 0
                            ? "red"
                            : room?.averageRating < 3.5
                            ? "orange"
                            : "teal"
                        }
                        fz={16}
                        py={20}
                        radius={"md"}>
                        {room?.averageRating?.toFixed(1)}
                      </Badge>
                    </Group>
                  </Group>

                  <Group align='center' justify='space-between'>
                    <Stack gap={0}>
                      {room?.amenities.map((peak, i) => (
                        <Text c={"#252422"} fz={12} fw={500} key={i}>
                          {peak}
                        </Text>
                      ))}
                    </Stack>
                    <Stack gap={0} mt={10}>
                      <Text ta={"end"} fw={600}>
                        £{room?.price}
                      </Text>
                      <Text fz={12} c='gray'>
                        {differenceInDays(endDate, startDate)} nights, {guest}{" "}
                        guests
                      </Text>
                    </Stack>
                  </Group>

                  <Group align='center' justify='space-between'>
                    <Group>
                      {room?.breakFast === true && (
                        <Badge
                          color='#1668e3'
                          py={13}
                          px={13}
                          variant='outline'
                          fz={12}>
                          Breakfast Included
                        </Badge>
                      )}
                    </Group>
                  </Group>
                </Link>
              </Flex>
            </Flex>
          ))
        )}
      </Stack>

      <Flex justify={"center"}>
        <Pagination
          color={"#1668e3"}
          total={data.length}
          value={activePage}
          onChange={setPage}
          mt='sm'
        />
      </Flex>
    </Box>
  );
}

SearchMain.propTypes = {
  onOpen: PropTypes.func.isRequired,
};

export default SearchMain;
