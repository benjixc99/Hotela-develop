import {
  Box,
  Image,
  Stack,
  Text,
  Flex,
  useMantineTheme,
  Badge,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import dashBoardRoom1 from "../../../assets/dashBoardRoom1.jpg";

const itemsData = [
  {
    id: 1,
    name: "Cozy Cottage",
    location: "Camden",
    price: "£90",
    image: dashBoardRoom1,
    reviews: [9, 8, 10, 7, 9],
  },
  {
    id: 2,
    name: "Elegant Estate",
    location: "Kensington",
    price: "£150",
    image: dashBoardRoom1,
    reviews: [9, 9, 8, 10, 8],
  },
  {
    id: 3,
    name: "Modern Apartment",
    location: "Chelsea",
    price: "£200",
    image: dashBoardRoom1,
    reviews: [10, 9, 8, 10, 9],
  },
  {
    id: 4,
    name: "Classic Villa",
    location: "Hampstead",
    price: "£250",
    image: dashBoardRoom1,
    reviews: [9, 9, 10, 9, 10],
  },
  {
    id: 5,
    name: "Beach House",
    location: "Brighton",
    price: "£180",
    image: dashBoardRoom1,
    reviews: [8, 8, 9, 8, 8],
  },
  {
    id: 6,
    name: "Country Inn",
    location: "Oxford",
    price: "£120",
    image: dashBoardRoom1,
    reviews: [7, 8, 7, 8, 7],
  },
  {
    id: 7,
    name: "Luxury Loft",
    location: "Mayfair",
    price: "£300",
    image: dashBoardRoom1,
    reviews: [10, 10, 10, 9, 10],
  },
  {
    id: 8,
    name: "Rustic Retreat",
    location: "Cotswolds",
    price: "£110",
    image: dashBoardRoom1,
    reviews: [7, 7, 8, 7, 8],
  },
  {
    id: 9,
    name: "Urban Studio",
    location: "Soho",
    price: "£130",
    image: dashBoardRoom1,
    reviews: [9, 8, 8, 9, 9],
  },
  {
    id: 10,
    name: "Historic Mansion",
    location: "Greenwich",
    price: "£220",
    image: dashBoardRoom1,
    reviews: [9, 9, 9, 8, 9],
  },
];

const getAverageRating = (reviews) => {
  const sum = reviews.reduce((a, b) => a + b, 0);
  return (sum / reviews.length).toFixed(1);
};

const getRatingCategory = (average) => {
  if (average >= 9) return "Wonderful";
  if (average >= 8) return "Very Good";
  if (average >= 7) return "Good";
  return "Bad";
};

function HostelLovedByGuest() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const theme = useMantineTheme();

  return (
    <Box mt={6} mb={20}>
      <Text fw={600} c={"#000814"} fz="xl" mb="xs">
        Hostel Loved By Guests
      </Text>
      <Carousel
        height={"100%"}
        slideSize={isMobile ? "20%" : "25%"}
        slideGap="md"
        align="start"
        controlSize={40}
        controlsOffset="sm"
        pb={20}
        loop={true}
        withControls={!isMobile}
      >
        {itemsData.map((item) => {
          const averageRating = getAverageRating(item.reviews);
          const ratingCategory = getRatingCategory(averageRating);
          return (
            <Carousel.Slide key={item.id}>
              <Stack
                w={280}
                h={"100%"}
                bd={2}
                style={{
                  boxShadow: theme.shadows.sm,
                  borderRadius: theme.radius.xl,
                  backgroundColor: theme.white,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Box h={"600%"} pos={"relative"}>
                  <Image src={item.image} height="" />
                </Box>
                <Box p="sm">
                  <Flex justify="space-between" align="center" mb="xs">
                    <Badge color="#000814" radius="sm" size="md">
                      {averageRating}/10
                    </Badge>
                    <Text size="sm" weight={500} color="dimmed">
                      {ratingCategory} ({item.reviews.length} reviews)
                    </Text>
                  </Flex>
                  <Text size="lg" weight={700} color="dark">
                    {item.name}
                  </Text>
                  <Text size="sm" color="dimmed" mb="xs">
                    {item.location}
                  </Text>
                  <Text size="xl" weight={700} color="primary">
                    {item.price}
                  </Text>
                </Box>
              </Stack>
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </Box>
  );
}

export default HostelLovedByGuest;
