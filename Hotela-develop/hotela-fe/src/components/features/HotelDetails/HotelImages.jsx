/* eslint-disable react/prop-types */
import { Carousel } from "@mantine/carousel";
import { Container, SimpleGrid, Image, Box } from "@mantine/core";

const HotelImages = ({ ImagesProp }) => {
  console.log("Images", ImagesProp);

  return (
    <Container my='md' maw={"1200px"} w={"100%"} mt={20} h={"50vh !important"}>
      <SimpleGrid cols={{ base: 1, sm: 2 }} w={"100%"}>
        <Box h={"60vh"}>
          {ImagesProp &&
            ImagesProp.map(
              (url, index) =>
                index === 0 && (
                  <Image
                    key={index}
                    src={`http://localhost:5000/${url}`}
                    h='100%'
                    radius='lg'
                    style={{ objectFit: "cover" }}
                  />
                ),
            )}
        </Box>

        <Carousel
          height={"60vh"}
          loop
          styles={{
            root: {
              borderRadius: "20px",
              overflow: "hidden",
            },
          }}
          controlSize={40}
          withIndicators>
          {ImagesProp?.map((url, index) => (
            <Carousel.Slide key={index}>
              <Image
                src={`http://localhost:5000/${url}`}
                alt='Hotel Detail 1'
                radius='md'
                height={"100%"}
                style={{ borderRadius: "8px" }}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </SimpleGrid>
    </Container>
  );
};

export default HotelImages;
