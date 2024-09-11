import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Box } from "@mantine/core";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default marker icon paths
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useMediaQuery } from "@mantine/hooks";

// Fix Leaflet's default marker issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const DEFAULT_COORDS = [51.509865, -0.118092]; // Default to London

function MapMainLeaflet({ hotels, centerCoords, onMarkerClick }) {
  const [coords, setCoords] = useState(DEFAULT_COORDS);

  const isMobile = useMediaQuery("(max-width: 600px)");

  const geoSuccess = useCallback(({ coords: { latitude, longitude } }) => {
    setCoords([latitude, longitude]);
  }, []);

  const geoError = useCallback(() => {
    console.warn("Geolocation access denied or failed.");
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        geoSuccess,
        geoError,
        { timeout: 10000 } // 10 seconds timeout for geolocation
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }
  }, [geoSuccess, geoError]);

  useEffect(() => {
    if (centerCoords) {
      setCoords([centerCoords.lat, centerCoords.lng]);
    }
  }, [centerCoords]);

  return (
    <Box w="100%" h="100%" p={12}>
      <MapContainer
        center={coords}
        zoom={isMobile ? 12 : 14}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {hotels.map((hotel) => (
          <Marker
            key={hotel.id}
            position={[hotel.location.lat, hotel.location.lng]}
            eventHandlers={{
              click: () => onMarkerClick(hotel),
            }}
          >
            <Popup>
              <div>
                <img
                  src={hotel.image || "https://via.placeholder.com/100"}
                  alt={hotel.name}
                  style={{ width: "100%", borderRadius: "4px" }}
                />
                <strong>{hotel.name}</strong>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
}

MapMainLeaflet.propTypes = {
  hotels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      location: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
      }).isRequired,
      image: PropTypes.string,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  centerCoords: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
  onMarkerClick: PropTypes.func.isRequired,
};

export default MapMainLeaflet;
