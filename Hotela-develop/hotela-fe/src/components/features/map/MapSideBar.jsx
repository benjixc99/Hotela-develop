import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Image,
  Text,
  Badge,
  Group,
  Stack,
  useMantineTheme,
  Button,
  Select,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { FaWifi, FaCoffee, FaDumbbell, FaDotCircle } from "react-icons/fa";

const MapSideBar = React.forwardRef(({ hotels, onHotelClick }, ref) => {
  const theme = useMantineTheme();

  // Add a ref for each card element
  const cardRefs = React.useRef({});
  let icon;
  React.useImperativeHandle(ref, () => ({
    scrollToHotel: (hotelId) => {
      const cardRef = cardRefs.current[hotelId];
      if (cardRef) {
        cardRef.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    },
  }));

  return (
    <Box
      bg={"#f0f0f0"}
      w={{ base: "100%", md: "30%" }}
      h={"100%"}
      p='md'
      style={{ overflowY: "auto" }}
      c={"#000814"}>
      <Select
        label={"Sort by"}
        fw={600}
        defaultValue='Recommended'
        mb={10}
        allowDeselect={false}
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

      {hotels.map((hotel) => (
        <Card
          ref={(el) => (cardRefs.current[hotel._id] = el)}
          shadow='sm'
          padding='lg'
          radius='md'
          withBorder
          mb='md'
          style={{ cursor: "pointer" }}
          onClick={() => onHotelClick(hotel._id)}
          key={hotel._id}>
          <Card.Section>
            {hotel.images.map(
              (url, i) =>
                i === 0 && (
                  <Image
                    key={i}
                    src={`http://localhost:5000/${url}`}
                    height={160}
                    alt={hotel.name}
                  />
                ),
            )}
          </Card.Section>

          <Stack mt='md' mb='xs' gap={0}>
            <Text fw={600} fz={18}>
              {hotel.name}
            </Text>
            <Text size='xs' c='dimmed'></Text>
          </Stack>

          <Group justify='space-between' gap={8}>
            <Stack justify='center' gap='0'>
              <Text fz={16} c={"green"} fw={600}>
                {hotel.rating}
              </Text>
              <Text fz={11} c={"gray"}></Text>
            </Stack>

            <Badge variant='light' color='green' fz={16} py={20} radius={"md"}>
              {hotel.score}
            </Badge>
          </Group>

          <Stack gap={2} mt='md'>
            {hotel.amenities.map((amenity, index) => (
              <Group gap={10} key={index} spacing='xs'>
                {amenity === "Free Wi-Fi"
                  ? (icon = <FaWifi color={theme.colors.blue[6]} />)
                  : amenity === "Complimentary breakfast"
                  ? (icon = <FaCoffee color='orange' />)
                  : amenity === "Fitness center"
                  ? (icon = <FaDumbbell color='green' />)
                  : (icon = <FaDotCircle color={theme.colors.blue[6]} />)}
                <Text
                  fz={12}
                  fw={500}
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}>
                  {amenity}
                </Text>
              </Group>
            ))}
          </Stack>

          <Button
            component={Link}
            to='/hotelDetails'
            size='xs'
            mt={10}
            radius={"xl"}>
            Details
          </Button>
        </Card>
      ))}
    </Box>
  );
});

// Set display name
MapSideBar.displayName = "HotelMarker";

MapSideBar.propTypes = {
  hotels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      distance: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      price: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onHotelClick: PropTypes.func.isRequired,
};

export default MapSideBar;
