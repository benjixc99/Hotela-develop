import PropTypes from "prop-types";
import {
  Badge,
  Box,
  Button,
  Flex,
  Group,
  Image,
  List,
  Pagination,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import {
  useAddToFavouriteMutation,
  useGetSingleUserQuery,
} from "../../../Store/Slices/authenticationSlice";
import { Link, useSearchParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function FavouritesList({ favouriteList, currentUser }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [checkIn] = useState(new Date(Date.now()) || "");
  const [checkOut] = useState(new Date(Date.now()) || "");

  const [guest] = useState(1);
  const { data: activeUser = {} } = useGetSingleUserQuery(currentUser);

  const [addToFavorite] = useAddToFavouriteMutation();
  const handleFavouriteClick = async (hotelId) => {
    try {
      const data = await addToFavorite({
        userId: currentUser,
        hotelId,
      }).unwrap();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  function chunk(array, size) {
    if (!array?.length) {
      return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
  }

  const [activePage, setPage] = useState(1);

  const data = chunk(favouriteList, 3);

  // Use useEffect to scroll to top when activePage changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activePage]);

  const isMobile = useMediaQuery("(max-width: 980px)"); // Adjusted for mobile view

  return (
    <Box w={"100%"} p='lg'>
      <Stack gap={1}>
        <Title order={2}>Your Favourites</Title>
        <Text size='sm' c='dimmed'>
          {favouriteList?.length} items in your list
        </Text>
      </Stack>

      <Flex
        w={"100%"}
        direction={"column"}
        gap={20}
        mt={20}
        px={30}
        align={"center"}
        justify='center'
        style={{
          transition: "0.3s ease-out all",
        }}>
        {data[activePage - 1]?.map((hotel) => (
          <Flex
            key={hotel._id}
            direction={isMobile ? "column" : "row"}
            w={"80%"}
            h={"40vh"}
            style={{
              borderRadius: "15px",
              boxShadow: "1px 0px 4px 4px rgba(0, 0, 0, 0.1)",
            }}
            gap={14}>
            <Box w={isMobile ? "100%" : "35%"} h={"auto"} pos={"relative"}>
              {hotel?.images?.map(
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

              <Box
                onClick={() => handleFavouriteClick(hotel._id)}
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
                  transform: activeUser?.favourites?.includes(hotel?._id)
                    ? "scale(1.2)"
                    : "scale(0.9)",
                }}
                bg={"rgba(255, 255, 255, 0.5)"}
                w={30}
                h={30}>
                {activeUser?.favourites?.includes(hotel?._id) ? (
                  <FaHeart color='#dd0426' size={16} />
                ) : (
                  <CiHeart color='#ff6347' size={16} />
                )}
              </Box>
            </Box>

            <Flex
              direction={"column"}
              p={10}
              gap={13}
              w={isMobile ? "100%" : "75%"}>
              <Link
                to={`/HotelDetails?name=${hotel?.name}&reg=${hotel?._id}&checkIn=${checkIn}&checkOut=${checkOut}&guest=${guest}`}>
                <Group justify='space-between' align='flex-start'>
                  <Stack gap={0}>
                    <Title order={4}>{hotel.name}</Title>
                    <Text fz={12} c={"gray"}>
                      {hotel?.location?.name}
                    </Text>

                    {hotel.cancellation && (
                      <Text size='xs' c='gray' mt={1}>
                        Free cancellation
                      </Text>
                    )}

                    {hotel.breakFast && (
                      <Text size='xs' c='gray' mt={1}>
                        Breakfast included
                      </Text>
                    )}
                  </Stack>

                  <Group gap={8}>
                    <Stack align='end' justify='center' gap='0'>
                      <Text fz={18} c={"green"} fw={600}>
                        £{hotel?.price}
                      </Text>
                      <Text fz={11} c={"gray"}>
                        {hotel.reviews}
                      </Text>
                    </Stack>
                    <Badge
                      variant='light'
                      color='green'
                      fz={16}
                      py={20}
                      radius={"md"}>
                      {hotel.ratingScore}
                    </Badge>
                  </Group>
                </Group>

                <Group align='center' justify='space-between'>
                  <List fz={14}>
                    {hotel?.amenities?.map((perks) => (
                      <List.Item key={perks._id} icon={<p />}>
                        {perks.name}
                      </List.Item>
                    ))}
                  </List>

                  <Button>Check Prices</Button>
                </Group>
              </Link>
            </Flex>
          </Flex>
        ))}
      </Flex>

      <Flex justify={"center"} my={20}>
        <Pagination
          color={"#1668e3"}
          total={data?.length}
          value={activePage}
          onChange={setPage}
          mt='sm'
        />
      </Flex>
    </Box>
  );
}

FavouritesList.propTypes = {
  favouriteList: PropTypes.object.isRequired,
};

export default FavouritesList;
