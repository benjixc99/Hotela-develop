import { Box, Button, Flex, Stack, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

function EmptyBooking() {
  const isMobile = useMediaQuery("(max-width: 980px)");

  return (
    <Flex
      w="100%"
      p="lg"
      ta={"center"}
      mih={"60vh"}
      align={"center"}
      justify={"center"}
    >
      <Stack spacing="md" align="center">
        <Title order={1} size={isMobile ? 24 : 36}>
          No Bookings Yet
        </Title>
        <Text size={isMobile ? "sm" : "md"} c="dimmed">
          It looks like you haven't made any bookings yet. Start exploring our
          options and book your stay to see them here!
        </Text>
        <Button size={isMobile ? "md" : "lg"} radius="xl" color="blue">
          Explore Stays
        </Button>
      </Stack>
    </Flex>
  );
}

export default EmptyBooking;
