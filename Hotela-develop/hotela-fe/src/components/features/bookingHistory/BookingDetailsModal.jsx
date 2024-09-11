/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { Modal, Box, Text, Badge } from "@mantine/core";
import { format } from "date-fns";

const BookingDetailsModal = ({ opened, onClose, booking }) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title='Booking Details'
      radius={"lg"}
      centered
      size='md'>
      {booking && (
        <Box>
          <Text fw={500}>
            {booking.hotel?.name} -- {booking.rooms?.name}
          </Text>
          <Text size='sm' c='dimmed'>
            {booking.hotel?.location?.name}
          </Text>
          <Text mt='md' size='sm'>
            Check-In: {format(new Date(booking?.checkIn), "yyyy-MM-dd")}
          </Text>

          <Text size='sm'>
            Check-Out: {format(new Date(booking?.checkOut), "yyyy-MM-dd")}
          </Text>
          <Text mt='sm' fz={18} fw={500} c='#228be6'>
            Total Price: £{booking.price}
          </Text>
          <Badge
            fw={500}
            fz={14}
            color={booking.bookingStatus === "Upcoming" ? "green" : "gray"}
            mt='sm'>
            {booking.bookingStatus}
          </Badge>
        </Box>
      )}
    </Modal>
  );
};

BookingDetailsModal.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  booking: PropTypes.shape({
    hotelName: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    checkIn: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }),
};

export default BookingDetailsModal;
