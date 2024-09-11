/* eslint-disable react/prop-types */
import { Box, Group, Image, Stack, Text, Title } from "@mantine/core";
import { IoWifi, IoCarSport, IoFitness, IoWater, IoBed } from "react-icons/io5";
import { TbAirConditioning } from "react-icons/tb";
import googleMap from "../../../assets/googleMap.jpg";

// function chunkArray(array, chunkSize) {
//   const chunks = [];
//   for (let i = 0; i < array.length; i += chunkSize) {
//     chunks.push(array.slice(i, i + chunkSize));
//   }
//   return chunks;
// }

function Overview({ amenities }) {
  // const featureChunks = chunkArray(amenities, 4);
  console.log(amenities);

  return (
    <Box
      mt={20}
      p={30}
      style={{ backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
      <Group align='start' justify='space-between'>
        <Box>
          <Title order={2} mb={20}>
            Property Overview
          </Title>
          <Group align='start' gap={{ base: 0, sm: 50 }}>
            <Stack spacing='lg'>
              {amenities?.map((feature) => (
                <Group key={feature}>
                  {feature === "Free WiFi" ? (
                    <IoWifi />
                  ) : feature === "Swimming Pool" ? (
                    <IoWater />
                  ) : (
                    feature === "Air conditioning" && <TbAirConditioning />
                  )}
                  <Text fz={14}>{feature}</Text>
                </Group>
              ))}
            </Stack>
          </Group>
        </Box>
        <Image
          src={googleMap}
          alt='Google Map'
          width={400}
          height={200}
          radius='lg'
          style={{ objectFit: "cover" }}
        />
      </Group>
    </Box>
  );
}

export default Overview;
