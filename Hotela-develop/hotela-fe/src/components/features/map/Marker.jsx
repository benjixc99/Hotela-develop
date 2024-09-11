import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Image,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { FaMapMarkerAlt } from "react-icons/fa";

const Marker = React.memo(({ hotel, isMobile, onClick, isSelected }) => {
  const theme = useMantineTheme();
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (isSelected) {
      setIsShaking(true);
      const timer = setTimeout(() => {
        setIsShaking(false);
      }, 500); // Stop shaking after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [isSelected]);

  return !isMobile ? (
    <Card
      w={100}
      h={100}
      shadow='sm'
      padding={0}
      radius='md'
      withBorder
      onClick={onClick}
      style={{
        cursor: "pointer",
        zIndex: isSelected ? 100 : 1, // Apply z-index if selected
        // backgroundColor: isSelected ? "blue" : "", // Apply z-index if selected
        position: "relative",
        animation: isShaking ? "shake 0.5s ease-in-out infinite" : "none", // Apply shaking animation conditionally
      }}>
      {hotel.images.map(
        (url, i) =>
          i === 0 && (
            <Image
              key={i}
              src={
                `http://localhost:5000/${url}` ||
                "https://via.placeholder.com/100"
              }
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/100")
              }
              height={50}
              width={"100%"}
              alt={hotel.name}
            />
          ),
      )}

      <Text size='sm' weight={500} ta={"center"} mt={3} fz={14} fw={500}>
        {hotel.name}
      </Text>
    </Card>
  ) : (
    <Tooltip label={hotel.name}>
      <FaMapMarkerAlt
        size={30}
        color={isSelected ? theme.colors.red[6] : theme.colors.blue[6]}
        onClick={onClick}
        style={{
          cursor: "pointer",
          zIndex: isSelected ? 10 : 1, // Apply z-index if selected
          position: "relative",
          animation: isShaking ? "shake 0.5s ease-in-out infinite" : "none", // Apply shaking animation conditionally
        }}
      />
    </Tooltip>
  );
});

Marker.displayName = "Marker";

Marker.propTypes = {
  hotel: PropTypes.shape({
    images: PropTypes.string,
    name: PropTypes.string.isRequired,
  }).isRequired,
  isMobile: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired, // Add isSelected prop to track selected hotel
};

export default Marker;
