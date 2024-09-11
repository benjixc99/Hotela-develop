import { Box, Flex, Modal } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import SearchNav from "../../components/features/searchResult/SearchNav";
import SearchMain from "../../components/features/searchResult/SearchMain";
import { useSearchParams } from "react-router-dom";
import { useSearchHotelsQuery } from "../../Store/Slices/hotelSlice";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [checkIn, setCheckIn] = useState(searchParams.get("checkIn") || null);
  const [checkOut, setCheckOut] = useState(
    searchParams.get("checkOut") || null
  );
  const [rating, setRating] = useState("");
  const [guest, setGuest] = useState(searchParams.get("guest") || "");
  // const location = searchParams.get("location");
  // const checkIn = searchParams.get("checkIn");
  // const checkOut = searchParams.get("checkOut");
  // const guest = searchParams.get("guest");
  // const minPrice = searchParams.get("minPrice");
  // const maxPrice = searchParams.get("maxPrice");

  const [price, setPrice] = useState([1, 1000]);
  const queryArgs = useMemo(
    () => ({
      locationName: location,
      name: "",
      minRating: rating,
      minPrice: price[0],
      maxPrice: price[1],
    }),
    [location, price, rating]
  );
  const { data = [], isLoading } = useSearchHotelsQuery(queryArgs, {});
  const [value] = useDebounce(data, 1000);
  console.log("data", data);

  // Handle input change

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated URL");

    // Update the search params with the form data
    setSearchParams({
      location: location,
      checkIn: checkIn,
      checkOut: checkOut,
      guest: guest,
    });
  };

  const handleCheckInChange = (newCheckInDate) => {
    // Ensure newCheckInDate is a Date object
    const newCheckIn = new Date(newCheckInDate);
    const currentCheckOut = checkOut ? new Date(checkOut) : null;

    console.log("New Check-In Date:", newCheckIn);
    console.log("Current Check-Out Date:", currentCheckOut);

    // Check if we should adjust the check-out date
    const shouldAdjustCheckOut =
      currentCheckOut &&
      newCheckIn &&
      newCheckIn.getTime() > currentCheckOut.getTime();

    console.log("Should Adjust Check-Out:", shouldAdjustCheckOut);

    // Set the new check-in date
    setCheckIn(newCheckIn);

    // If the new check-in date is later than the current check-out date, add one day to the check-out date
    if (shouldAdjustCheckOut) {
      const newCheckOut = new Date(newCheckIn);
      newCheckOut.setDate(newCheckOut.getDate() + 1);
      setCheckOut(newCheckOut);
    }
  };

  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 991px)");

  return (
    <Box w={"100%"} mb={20} h={"100%"}>
      <Flex w={"100%"} gap={0} h={"100%"}>
        <Box w={"25%"} h={"100%"} display={{ base: "none", md: "block" }}>
          <SearchNav
            location={location}
            onChange1={setLocation}
            checkIn={checkIn}
            onChange2={handleCheckInChange}
            checkOut={checkOut}
            onChange3={setCheckOut}
            guest={guest}
            onChange4={setGuest}
            price={price}
            handleSubmit={handleSubmit}
            setPrice={setPrice}
            rating={rating}
            setRating={setRating}
          />
        </Box>
        <Box w={{ base: "100%", md: "75%" }} h={"100%"}>
          <SearchMain
            location={location}
            isLoading={isLoading}
            roomData={data}
            checkIn={checkIn}
            checkOut={checkOut}
            guest={guest}
            onOpen={open}
          />
        </Box>
      </Flex>

      {isMobile && (
        <Modal
          opened={opened}
          onClose={close}
          fullScreen
          withCloseButton={false}
        >
          <SearchNav
            onClose={close}
            location={location}
            onChange1={setLocation}
            checkIn={checkIn}
            onChange2={handleCheckInChange}
            checkOut={checkOut}
            onChange3={handleCheckInChange}
            guest={guest}
            onChange4={setGuest}
            price={price}
            handleSubmit={handleSubmit}
            setPrice={setPrice}
          />
        </Modal>
      )}
    </Box>
  );
}

export default SearchResults;
