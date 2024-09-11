import { Box, Flex, Loader } from "@mantine/core";

import EmptyBooking from "../../components/features/bookingHistory/EmptyBooking";
import BookingHistoryList from "../../components/features/bookingHistory/BookingHistoryList";
import { useAllBookingsQuery } from "../../Store/Slices/bookingSlice";

const BookingHistory = () => {
  const { data: bookingHistory = [], isLoading } = useAllBookingsQuery();
  console.log("Booking History", bookingHistory);

  return (
    <Box w={"100%"}>
      {isLoading ? (
        <Flex w={"100%"} h={"90vh"} justify={"center"} align={"center"}>
          <Loader color='blue' size='xl' type='dots' />
        </Flex>
      ) : bookingHistory.length === 0 ? (
        <EmptyBooking />
      ) : (
        <BookingHistoryList data={bookingHistory} />
      )}
    </Box>
  );
};

export default BookingHistory;
