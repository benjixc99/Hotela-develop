import { Box, Button, Stack, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

function EmptyFavourites() {
  const isMobile = useMediaQuery("(max-width: 980px)");

  return (
    <Box
      w={"100%"}
      p="lg"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        textAlign: "center",
      }}
    >
      <Stack gap={10} align={"center"}>
        <Title order={1}>Your Favourites</Title>
        <Text size={isMobile ? "sm" : "md"} c="dimmed">
          You haven't added any favorites yet. Start exploring and add your
          favorite stays to see them here!
        </Text>
        <Button size={"sm"} radius="xl" color="blue">
          Explore Stays
        </Button>
      </Stack>
    </Box>
  );
}

export default EmptyFavourites;
