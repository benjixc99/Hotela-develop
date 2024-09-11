/* eslint-disable react/prop-types */
import { Badge, Box, Group, Stack, Tabs, Text, Title } from "@mantine/core";
import Overview from "./Overview";
import Info from "./Info";
import ReviewCard from "./reviewCard/ReviewCard";
import HotelPictures from "./HotelPictures";

function HotelInfo({
  hotelId,
  name,
  location,
  visitor,
  rating,
  images,
  description,
  address,
  amenities,
  review,
  email,
}) {
  //   const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <Box style={{ gap: "20px", display: "flex", flexDirection: "column" }}>
      <Group justify='space-between' align='center'>
        <Stack justify='center' gap='0'>
          <Title order={2}>{name}</Title>
          <Text fz={14}>{location}</Text>
        </Stack>
        <Group gap={8}>
          <Stack align='end' justify='center' gap='0'>
            {rating === 0 && (
              <Text fz={16} c={"red"} fw={600}>
                Poor
              </Text>
            )}
            {rating > 0 && rating < 2 && (
              <Text fz={16} c={"orange"} fw={600}>
                Poor
              </Text>
            )}
            {rating >= 2 && rating < 3.5 && (
              <Text fz={16} c={"orange"} fw={600}>
                Good
              </Text>
            )}
            {rating >= 3.5 && rating < 4.5 && (
              <Text fz={16} c={"teal"} fw={600}>
                Very Good
              </Text>
            )}
            {rating >= 4.5 && (
              <Text fz={16} c={"teal"} fw={600}>
                Excellent
              </Text>
            )}

            <Text fz={11} c={"gray"}>
              {visitor} reviews
            </Text>
          </Stack>
          <Badge
            variant='light'
            color={rating === 0 ? "red" : rating < 3.5 ? "orange" : "teal"}
            fz={16}
            py={20}
            radius={"md"}>
            {rating?.toFixed(1)}
          </Badge>
        </Group>
      </Group>

      <Tabs color='#1668e3' defaultValue='Overview' mb={30}>
        <Tabs.List style={{ gap: "0px" }}>
          <Tabs.Tab
            value='Overview'
            // leftSection={<IconPhoto style={iconStyle} />}
          >
            Overview
          </Tabs.Tab>
          <Tabs.Tab
            value='Info'
            // leftSection={<IconMessageCircle style={iconStyle} />}
          >
            Info
          </Tabs.Tab>
          <Tabs.Tab
            value='Photos'
            // leftSection={<IconAmenities style={iconStyle} />}
          >
            Photos
          </Tabs.Tab>
          <Tabs.Tab
            value='reviews'
            // leftSection={<IconAmenities style={iconStyle} />}
          >
            Reviews
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value='Overview'>
          <Overview amenities={amenities} />
        </Tabs.Panel>

        <Tabs.Panel value='Info'>
          <Info
            name={name}
            description={description}
            address={address}
            email={email}
          />
        </Tabs.Panel>

        <Tabs.Panel value='Photos'>
          <HotelPictures images={images} />
        </Tabs.Panel>

        <Tabs.Panel value='reviews'>
          <ReviewCard review={review} hotelId={hotelId} />
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}

export default HotelInfo;
