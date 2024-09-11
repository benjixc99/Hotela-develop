/* eslint-disable react/prop-types */
import { Carousel } from "@mantine/carousel";
import {
  Box,
  Group,
  Stack,
  Text,
  Title,
  Image,
  Button,
  Paper,
  SimpleGrid,
  Badge,
  Flex,
} from "@mantine/core";
import {
  FaBed,
  FaArrowsAltV,
  FaUsers,
  FaArrowRight,
  FaDotCircle,
} from "react-icons/fa";
import PropTypes from "prop-types";
import { useHotelRoomsQuery } from "../../../Store/Slices/roomSlice";
import { Link } from "react-router-dom";
import CustomSelect from "../dashboard/CustomSelect";
import CustomDatePicker from "../dashboard/CustomDatePicker";
import { differenceInDays } from "date-fns";

function RoomCard({ room, hotelId, totalDays, checkIn, checkOut, guest }) {
  return (
    <Paper shadow='xs' p='md' radius='md'>
      <Box mb='md' style={{ position: "relative" }}>
        <Carousel h={300} loop>
          {room.images.map((url, i) => (
            <Carousel.Slide key={i}>
              <Image
                src={`http://localhost:5000/${url}`}
                alt={room.name}
                radius='md'
                height={300}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Box>
      <Stack gap={10} px='md' pb={"xl"}>
        <Title order={3} c={"#000814"}>
          {room.name}
        </Title>
        <Stack gap={10}>
          {room.amenities.map((a, i) => (
            <Text key={i} fz='sm' c={"#000814"}>
              <FaDotCircle /> {a}
            </Text>
          ))}
        </Stack>
        <Group align='center'>
          <Text fz='32' fw={600} c='green'>
            £{room.price}
          </Text>
        </Group>

        <Text fz='sm' c={"#000814"}>
          £{room.price * totalDays} total
        </Text>
        <Text fz='sm' c={"#000814"}>
          {room.priceDetails}
        </Text>

        <Text fz='sm' c={"#000814"}>
          {room.taxesFees}
        </Text>
        <Text fz='xs' weight={500} c='red'>
          {room.availability}
        </Text>
        <Link
          to={`/roomDetails?name=${room?.name}&hotel=${hotelId}&reg=${room?._id}&checkIn=${checkIn}&checkOut=${checkOut}&guest=${guest}`}>
          <Button
            fullWidth
            color='#1668e3'
            mt='md'
            size='md'
            radius='xl'
            fz={15}>
            Reserve
          </Button>
        </Link>
      </Stack>
    </Paper>
  );
}

RoomCard.propTypes = {
  room: PropTypes.object.isRequired,
};

function HotelRooms({
  hotelId,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  guest,
  setNoOfGuest,
}) {
  const { data: rooms = [] } = useHotelRoomsQuery(hotelId);
  console.log("hotel Rooms", rooms);

  // Sample data for rooms
  // const rooms = [
  //   {
  //     id: 1,
  //     name: "Standard Room",
  //     size: "25 sq m",
  //     sleeps: 2,
  //     bed: "1 Double Bed",
  //     price: 45,
  //     originalPrice: 50,
  //     nights: 2,
  //     taxesFees: "includes taxes & fees",
  //     priceDetails: "£22 per night",
  //     availability: "We have 4 left",
  //     image: hotelDetails1,
  //   },
  //   {
  //     id: 2,
  //     name: "Deluxe Room",
  //     size: "30 sq m",
  //     sleeps: 2,
  //     bed: "1 King Bed",
  //     price: 60,
  //     originalPrice: 70,
  //     nights: 2,
  //     taxesFees: "includes taxes & fees",
  //     priceDetails: "£30 per night",
  //     availability: "We have 3 left",
  //     image: hotelDetails1,
  //   },
  //   {
  //     id: 3,
  //     name: "Family Room",
  //     size: "40 sq m",
  //     sleeps: 4,
  //     bed: "2 Double Beds",
  //     price: 80,
  //     originalPrice: 90,
  //     nights: 2,
  //     taxesFees: "includes taxes & fees",
  //     priceDetails: "£40 per night",
  //     availability: "We have 2 left",
  //     image: hotelDetails1,
  //   },
  // ];
  const numberOfDays = differenceInDays(new Date(checkOut), new Date(checkIn));
  return (
    <Box mt={20} px={20}>
      <Title order={2} mb={20} c={"#000814"}>
        Choose your room
      </Title>
      <Flex w={"100%"} p={4} justify={"flex-start"} align={"center"}>
        <Flex
          bg='white'
          w={"80%"}
          px={{ base: 10, sm: 50 }}
          py={{ base: 10 }}
          gap={{ base: 0, sm: 20 }}
          align='center'
          justify='space-between'
          style={{
            borderRadius: "1.7rem",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add shadow
          }}
          h={{ base: "100%", sm: 70 }}
          direction={{ base: "column", sm: "row" }}
          pos={"relative"}>
          <CustomDatePicker
            label='Check In'
            placeholder='Select Date'
            value={new Date(checkIn)}
            onChange={setCheckIn}
          />
          <CustomDatePicker
            label='Check out'
            placeholder='Select Date'
            value={new Date(checkOut)}
            onChange={setCheckOut}
          />
          <CustomSelect
            label='Guest'
            value={guest}
            onChange={setNoOfGuest}
            placeholder='Number of guest'
            data={["1", "2", "3", "4", "5"]}
            showBorder={false}
          />
        </Flex>
      </Flex>

      <SimpleGrid
        cols={{ base: 1, md: 2, lg: 3 }}
        spacing='lg'
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: "md" },
          { maxWidth: 755, cols: 1, spacing: "sm" },
        ]}>
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            hotelId={hotelId}
            totalDays={numberOfDays}
            checkIn={checkIn}
            checkOut={checkOut}
            guest={guest}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default HotelRooms;
