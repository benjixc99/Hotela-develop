import { useState, useEffect } from "react";
import {
  Box,
  Image,
  px,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";

import Islington from "../../../assets/Islington.jpg";
import Richmond from "../../../assets/Richmond.jpg";
import Westminster from "../../../assets/Westminster.jpg";
import Southwark from "../../../assets/Southwark.jpg";
import Merton from "../../../assets/Merton.jpg";
import Camden from "../../../assets/Camden.jpg";

const getChild = (height, imageSrc, name, loading) => (
  <Skeleton visible={loading} height={height} radius="xl" animate={true}>
    <Box w="100%" h="100%" radius="xl" pos="relative">
      <Image
        src={imageSrc}
        h="100%"
        radius="xl"
        style={{ objectFit: "cover" }}
      />
      <Text
        c="black"
        pos="absolute"
        bottom={15}
        left={20}
        py={5}
        px={10}
        bg="rgba(255, 255, 255, 0.7)"
        size="sm"
        style={{
          borderRadius: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {name}
      </Text>
    </Box>
  </Skeleton>
);

const BASE_HEIGHT = 360;
const getSubHeight = (children, spacing) =>
  BASE_HEIGHT / children - spacing * ((children - 1) / children);

function PopularDestination() {
  const theme = useMantineTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a data fetch with a timeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box mt={20} mb={10}>
      <Text fw={600} mb={10} fz="xl" c={"#000814"}>
        Popular Destination
      </Text>
      <SimpleGrid cols={{ base: 1, xs: 4 }}>
        {getChild(BASE_HEIGHT, Islington, "Islington", loading)}
        <Stack>
          {getChild(
            getSubHeight(2, px(theme.spacing.md)),
            Richmond,
            "Richmond",
            loading
          )}
          {getChild(
            getSubHeight(2, px(theme.spacing.md)),
            Westminster,
            "Westminster",
            loading
          )}
        </Stack>
        {getChild(BASE_HEIGHT, Southwark, "Southwark", loading)}
        <Stack>
          {getChild(
            getSubHeight(2, px(theme.spacing.md)),
            Merton,
            "Merton",
            loading
          )}
          {getChild(
            getSubHeight(2, px(theme.spacing.md)),
            Camden,
            "Camden",
            loading
          )}
        </Stack>
      </SimpleGrid>
    </Box>
  );
}

export default PopularDestination;
