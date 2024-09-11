import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Box } from "@mantine/core";
import GoogleMapReact from "google-map-react";
import { useMediaQuery } from "@mantine/hooks";
import Marker from "./Marker"; // Import the Marker component

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const DEFAULT_COORDS = { lat: 51.509865, lng: -0.118092 }; // Default to London
const GEO_OPTIONS = { timeout: 10000 }; // 10 seconds timeout for geolocation

function MapMain({ hotels, centerCoords, onMarkerClick, selectedHotel }) {
  const [coords, setCoords] = useState(DEFAULT_COORDS);

  const isMobile = useMediaQuery("(max-width: 600px)");

  const geoSuccess = useCallback(({ coords: { latitude, longitude } }) => {
    setCoords({ lat: latitude, lng: longitude });
  }, []);

  const geoError = useCallback(() => {
    console.warn("Geolocation access denied or failed.");
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        geoSuccess,
        geoError,
        GEO_OPTIONS,
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }
  }, [geoSuccess, geoError]);

  useEffect(() => {
    if (centerCoords) {
      setCoords(centerCoords);
    }
  }, [centerCoords]);

  return (
    <Box w='100%' h='100%' p={12}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
        center={coords}
        defaultZoom={isMobile ? 12 : 14}
        options={{ gestureHandling: "greedy", disableDefaultUI: true }}>
        {hotels.map((hotel) => (
          <Marker
            key={hotel._id}
            lat={hotel.geoLocation?.coordinates[1]}
            lng={hotel.geoLocation?.coordinates[0]}
            hotel={hotel}
            isMobile={isMobile}
            isSelected={selectedHotel === hotel._id}
            onClick={() => onMarkerClick(hotel._id)}
          />
        ))}
      </GoogleMapReact>
    </Box>
  );
}

MapMain.propTypes = {
  hotels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      location: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
      }).isRequired,
      image: PropTypes.string,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  centerCoords: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
  onMarkerClick: PropTypes.func.isRequired,
  selectedHotel: PropTypes.object.isRequired,
};

export default MapMain;
