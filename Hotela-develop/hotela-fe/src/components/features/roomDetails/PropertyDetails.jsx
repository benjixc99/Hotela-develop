import { Box, Title, Text, List, ThemeIcon, Stack } from "@mantine/core";
import {
  FaHome,
  FaCheckCircle,
  FaExclamationCircle,
  FaWifi,
  FaSnowflake,
  FaCar,
  FaSwimmingPool,
} from "react-icons/fa";

function PropertyDetails() {
  return (
    <Box my="md" c={"#000814"}>
      <Box>
        <Title order={3} mb="md">
          Step 2: Property Details
        </Title>

        <Stack spacing="lg">
          <Box>
            <Title
              order={5}
              mb="sm"
              style={{ display: "flex", alignItems: "center" }}
            >
              <FaHome color="green" size={24} style={{ marginRight: "10px" }} />
              Property Information
            </Title>
            <Text>
              <strong>Type:</strong> Apartment
            </Text>
            <Text>
              <strong>Size:</strong> 120 sqm
            </Text>
            <Text>
              <strong>Amenities:</strong>
            </Text>
            <List
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon color="teal" size={24} radius="xl">
                  <FaCheckCircle size={16} />
                </ThemeIcon>
              }
            >
              <List.Item icon={<FaWifi color="green" />}>WiFi</List.Item>
              <List.Item icon={<FaSnowflake color="green" />}>
                Air Conditioning
              </List.Item>
              <List.Item icon={<FaCar color="green" />}>Parking</List.Item>
              <List.Item icon={<FaSwimmingPool color="green" />}>
                Pool
              </List.Item>
            </List>
          </Box>

          <Box>
            <Title
              order={5}
              mb="sm"
              style={{ display: "flex", alignItems: "center" }}
            >
              <FaExclamationCircle
                color="green"
                size={24}
                style={{ marginRight: "10px" }}
              />
              House Rules
            </Title>
            <List
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon color="green" size={24} radius="xl">
                  <FaCheckCircle size={16} />
                </ThemeIcon>
              }
            >
              <List.Item>No smoking inside the property</List.Item>
              <List.Item>No pets allowed</List.Item>
              <List.Item>Quiet hours are from 10 PM to 8 AM</List.Item>
              <List.Item>
                Check-in is after 2 PM, and check-out is by 11 AM
              </List.Item>
              <List.Item>
                Please dispose of trash in the designated areas
              </List.Item>
            </List>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default PropertyDetails;
