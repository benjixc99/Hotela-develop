/* eslint-disable react/prop-types */
import { Carousel } from "@mantine/carousel";
import {
  Box,
  Image,
  Text,
  Title,
  Divider,
  Paper,
  Stack,
  Group,
} from "@mantine/core";
import { differenceInDays, format } from "date-fns";

function RoomInfo({ name, images, price, checkIn, checkOut, guest }) {
  const numberOfDays = differenceInDays(new Date(checkOut), new Date(checkIn));

  const totalCharge = price * numberOfDays;
  return (
    <Paper
      shadow='md'
      radius='md'
      p='lg'
      c={"#000814"}
      style={{
        maxWidth: 800,
        margin: "auto",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
      }}>
      <Carousel
        height={300}
        loop
        styles={{
          root: {
            borderRadius: "20px",
            overflow: "hidden",
          },
        }}
        controlSize={40}
        withIndicators>
        {images?.map((url, index) => (
          <Carousel.Slide key={index}>
            <Image
              src={`http://localhost:5000/${url}`}
              alt='Hotel Detail 1'
              radius='md'
              height={300}
              style={{ borderRadius: "8px" }}
            />
          </Carousel.Slide>
        ))}
      </Carousel>

      <Box mt='md'>
        <Stack spacing={4}>
          <Title order={3} c={"#000814"}>
            {name}
          </Title>
          <Text size='sm' c='dimmed'>
            3-star hotel located in the heart of Copenhagen
          </Text>
        </Stack>

        <Stack spacing={4} mt={20}>
          <Text size='sm'>
            <strong>Check-in:</strong>
            <span style={{ marginLeft: "30px" }}>
              {checkIn && format(checkIn, "d MMM yyy")}
            </span>
          </Text>
          <Text size='sm'>
            <strong>Check-out:</strong>
            <span style={{ marginLeft: "20px" }}>
              {checkOut && format(checkOut, "d MMM yyy")}
            </span>
          </Text>
          <Text size='sm'>
            <strong>Guests:</strong>
            <span style={{ marginLeft: "20px" }}>{guest}</span>
          </Text>
        </Stack>
        <Divider my='sm' />
        <Title order={4} c={"#000814"}>
          Price Information
        </Title>
        <Group justify='space-between' mt='sm' c={"#000814"}>
          <Text size='sm'>
            <strong>Number of nights:</strong> {numberOfDays}
          </Text>
          <Text size='sm'>
            <strong>Charge per night:</strong> £{price}
          </Text>
        </Group>

        <Divider my='sm' />
        <Text size='lg' c={"#000814"}>
          <strong>Total charge:</strong> £{totalCharge}
        </Text>
      </Box>
    </Paper>
  );
}

export default RoomInfo;
