import { Box, Button, Flex, Stack, Text } from "@mantine/core";
import hostelRoom from "../../../assets/hostelRoom.jpg";
import CustomSelect from "./CustomSelect";
import CustomDatePicker from "./CustomDatePicker";
import { useMediaQuery } from "@mantine/hooks";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { cities } from "../../../cities";

function DashBoardMain() {
  const isMobile = useMediaQuery("(max-width: 767px)"); // Adjusted for mobile view
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [noOfGuest, setNoOfGuest] = useState("");
  const [minRating, setMinRating] = useState("");
  const [name, setName] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleCheckInChange = (newCheckInDate) => {
    setCheckIn(newCheckInDate);

    // Reset check out date if the new check in date is later than the current check out date
    if (checkOut && newCheckInDate && newCheckInDate > checkOut) {
      setCheckOut(null);
    }
  };

  return (
    <Box align="center" justify="center" w="100%">
      <Box
        direction="column"
        align="center"
        justify="center"
        h={{ base: "55vh", sm: "55vh" }}
        style={{
          width: "100%",
          backgroundImage: `url(${hostelRoom})`,
          backgroundSize: "cover", // Ensure the image covers the container
          backgroundPosition: "center", // Center the image
          backgroundRepeat: "no-repeat", // Prevent image repetition
          borderRadius: "25px", // Optional: rounded corners
          overflow: "hidden", // Ensures no overflow of the background image
        }}
      >
        <Flex
          direction="column"
          align="center"
          justify="center"
          style={{
            width: "100%", // Full width of the parent container
            height: "100%", // Full height of the parent container
            backgroundColor: "#00000091", // Dark semi-transparent background
            borderRadius: "8px", // Rounded corners if needed
            padding: "20px", // Padding inside the content area
          }}
        >
          <Stack
            align="center"
            justify="center"
            dir="column"
            gap={{ base: "xs", sm: "sm" }}
          >
            <Text c="white" fw={600} fz={{ base: "23px", sm: "40px" }}>
              Discover your new favorite <br /> stay with Hotela
            </Text>
            <Text c="white" fz={{ base: "10px", sm: "20px" }}>
              Explore stays in trending destinations!
            </Text>
          </Stack>
        </Flex>
      </Box>
      <Flex
        bg="white"
        maw={700}
        mt={-40}
        px={{ base: 10, sm: 40 }}
        py={{ base: 10 }}
        gap={{ base: 0, sm: 20 }}
        align="center"
        justify="center"
        style={{
          borderRadius: !isMobile && "100px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add shadow
        }}
        h={{ base: "100%", sm: 70 }}
        direction={{ base: "column", sm: "row" }}
        pos={"relative"}
      >
        <CustomSelect
          label="Location"
          placeholder="Where to?"
          onChange={setLocation}
          data={cities}
          showBorder={true}
        />
        <CustomDatePicker
          label="Check In"
          placeholder="Select Date"
          checkInData={checkIn}
          value={checkIn}
          onChange={handleCheckInChange}
        />
        <CustomDatePicker
          label="Check out"
          placeholder="Select Date"
          checkInData={checkIn}
          value={checkOut}
          onChange={setCheckOut}
        />
        <CustomSelect
          label="Guest"
          onChange={setNoOfGuest}
          placeholder="Number of guest"
          data={["1", "2", "3", "4", "5"]}
          showBorder={false}
        />
        <Link
          to={`/searchResult?location=${location}&guest=${noOfGuest}&checkIn=${checkIn}&checkOut=${checkOut}&name=${name}&minRating=${minRating}&minPrice=${minPrice}&maxPrice=${maxPrice}`}
        >
          <Button
            w={{ base: "100%", sm: 60 }}
            h={{ base: 50, sm: 60 }}
            pos={{ base: "unset", md: "absolute" }}
            bg={"#1668e3"}
            px={10}
            top={4}
            right={isMobile ? "auto" : 10}
            style={{
              borderRadius: isMobile ? "" : "50%",
              margin: isMobile ? "10px 0" : "0",
            }}
            disabled={
              location === "" ||
              noOfGuest === "" ||
              checkIn === null ||
              checkOut === null
            }
          >
            {isMobile ? (
              <Text fw={600} fz={20}>
                Search
              </Text>
            ) : (
              <FaArrowRight size={30} />
            )}
          </Button>
        </Link>
      </Flex>
    </Box>
  );
}

export default DashBoardMain;
