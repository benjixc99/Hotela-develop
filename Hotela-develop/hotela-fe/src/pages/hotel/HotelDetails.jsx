import { Flex, Loader } from "@mantine/core";
import { IoArrowBack } from "react-icons/io5";
import HotelImages from "../../components/features/HotelDetails/HotelImages";
import HotelRooms from "../../components/features/HotelDetails/HotelRooms";
import HotelInfo from "../../components/features/HotelDetails/HotelInfo";
import { useSearchParams } from "react-router-dom";
import { useHotelDetailsQuery } from "../../Store/Slices/hotelSlice";
import { useEffect, useState } from "react";
function HotelDetails() {
  const [hotelParams, setHotelParams] = useSearchParams();
  const hotelId = hotelParams.get("reg");
  const [checkIn, setCheckIn] = useState(hotelParams.get("checkIn") || null);
  const [checkOut, setCheckOut] = useState(hotelParams.get("checkOut") || null);
  const [noOfGuest, setNoOfGuest] = useState(hotelParams.get("guest") || "");
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const { data = {}, isLoading } = useHotelDetailsQuery(hotelId);
  console.log(data.hotel);

  return (
    <Flex
      w={"100%"}
      flex={1}
      h={"fit-content"}
      direction={"column"}
      gap={2}
      mb={50}>
      <IoArrowBack size={30} />
      {isLoading ? (
        <Flex w={"100%"} h={"80vh"} justify={"center"} align={"center"}>
          <Loader color='blue' size='xl' type='dots' />
        </Flex>
      ) : (
        <>
          <HotelImages ImagesProp={data?.hotel?.images} />
          <HotelInfo
            hotelId={hotelId}
            name={data?.hotel?.name}
            location={data?.hotel?.location?.name}
            rating={data?.averageRating}
            email={data?.hotel?.email}
            images={data?.hotel?.images}
            visitor={data?.hotel?.visitors?.length}
            review={data?.hotel?.visitors}
            description={data?.hotel?.description}
            address={data?.hotel?.address}
            amenities={data?.hotel?.amenities}
          />
          <HotelRooms
            hotelId={hotelId}
            checkIn={checkIn}
            setCheckIn={setCheckIn}
            checkOut={checkOut}
            guest={noOfGuest}
            setCheckOut={setCheckOut}
            setNoOfGuest={setNoOfGuest}
          />
        </>
      )}
    </Flex>
  );
}

export default HotelDetails;
