/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import {
  Badge,
  Box,
  Card,
  Flex,
  Image,
  Select,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import BookingDetailsModal from "./BookingDetailsModal";
import { format } from "date-fns";
function BookingHistoryList({ data }) {
  const [opened, setOpened] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const isMobile = useMediaQuery("(max-width: 500px)");

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setOpened(true);
  };

  return (
    <Box w='100%' px={isMobile ? "sm" : "lg"}>
      <Title order={2} mt='md' mb='lg'>
        Booking History
      </Title>

      <Select
        value={""}
        onChange={(value) => setStatusFilter(value)}
        data={["All", "Ongoing", "Upcoming", "Completed"]}
        label='Filter by status'
        placeholder='Select status'
        size='md'
        style={{ marginBottom: 20 }}
        fullWidth={isMobile}
        w={isMobile ? "100%" : "200px"}
        allowDeselect={false}
      />

      {data.map((booking) => (
        <Flex key={booking._id} w={"100%"} px={!isMobile && 30}>
          <Card
            shadow='sm'
            // padding="lg"
            p={isMobile && 0}
            radius='md'
            mb='lg'
            w={"100%"}
            withBorder
            onClick={() => openModal(booking)}
            style={{ cursor: "pointer" }} // Make the card clickable
          >
            <Flex
              direction={isMobile ? "column" : "row"}
              align='center'
              h={isMobile && 300}>
              {booking.rooms.images.map(
                (room, i) =>
                  i === 0 && (
                    <Image
                      key={i}
                      src={`http://localhost:5000/${room}`}
                      w={isMobile ? "100%" : 100}
                      h={isMobile ? "60%" : 100}
                      alt={booking.hotel?.name}
                      fit='cover'
                      radius='md'
                      mr={!isMobile && 20}
                    />
                  ),
              )}

              <Flex
                direction={isMobile && "row"}
                align='center'
                justify='space-between'
                w={"100%"}
                h={isMobile && "40%"}
                px={isMobile && 10}>
                <Flex direction='column' style={{ flex: 1 }}>
                  <Text weight={600} size={isMobile ? "md" : "lg"}>
                    {booking.rooms?.name}
                  </Text>
                  <Text c='dimmed' size={isMobile ? "sm" : "md"}>
                    {booking.hotel?.name}, {booking.hotel?.location?.name}
                  </Text>
                  <Text c='dimmed' size='sm'>
                    {format(new Date(booking?.checkIn), "yyyy-MM-dd")} -
                    {format(new Date(booking?.checkOut), "yyyy-MM-dd")}
                  </Text>
                  <Badge
                    color={
                      booking.bookingStatus === "Upcoming"
                        ? "blue"
                        : booking.bookingStatus === "Completed"
                        ? "green"
                        : "gray"
                    }
                    mt='sm'>
                    {booking.bookingStatus}
                  </Badge>
                </Flex>
                <Flex
                  direction='column'
                  align='flex-end'
                  mt={isMobile ? "md" : 0}>
                  <Text size='xl' fw={600} c='#228be6'>
                    £{booking.price}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Card>
        </Flex>
      ))}

      <BookingDetailsModal
        opened={opened}
        onClose={() => setOpened(false)}
        booking={selectedBooking}
      />
    </Box>
  );
}

BookingHistoryList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default BookingHistoryList;
