/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Box,
  Group,
  Stack,
  Text,
  Title,
  Avatar,
  Rating,
  Paper,
  Divider,
  Pagination,
  Flex,
  Button,
} from "@mantine/core";
import { IoStar, IoStarOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import AddReviewModal from "./AddReviewModal";

import { formatDistance } from "date-fns";

// Sample data for reviews

function ReviewCard({ userId, date, rating, comments, avatar }) {
  return (
    <Paper
      shadow='xs'
      p='md'
      mb={20}
      style={{ backgroundColor: "#fff", borderRadius: "10px" }}>
      <Group align='flex-start'>
        <Avatar
          src={avatar}
          name={userId?.firstName + userId?.lastName}
          color='initials'
          allowedInitialsColors={["blue", "teal", "red", 'green", "yellow']}
          radius='xl'
          size='lg'
        />
        <Stack spacing={5} style={{ flexGrow: 1 }}>
          <Group position='apart' style={{ width: "100%" }}>
            <Text weight={500}>
              {userId?.firstName} {userId?.lastName}
            </Text>
            <Text size='xs' c='gray'>
              {formatDistance(date, new Date(), { addSuffix: true })}
            </Text>
          </Group>
          <Rating
            value={rating}
            fractions={2}
            readOnly
            size='sm'
            icon={<IoStar />}
            emptyIcon={<IoStarOutline />}
          />
          <Text size='sm' mt={5} style={{ lineHeight: 1.5 }}>
            {comments}
          </Text>
        </Stack>
      </Group>
    </Paper>
  );
}

ReviewCard.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

function Reviews({ review, hotelId }) {
  function chunk(array, size) {
    if (!array?.length) {
      return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
  }
  console.log("review", review);

  const data = chunk(review, 3);
  const [activePage, SetActivePage] = useState(1);
  const [isAddReviewModalOpen, { open, close }] = useDisclosure(false);
  console.log(isAddReviewModalOpen);

  const isMobile = useMediaQuery("(max-width: 500px)");
  return (
    <Box
      mt={20}
      px={{ base: 10, sm: 20 }}
      py={30}
      style={{
        backgroundColor: "#f8f9fa",
        borderRadius: "10px",
      }}>
      <Group align='center' mb={20} justify='space-between'>
        <Title order={2} fz={{ base: 20, sm: 30 }} style={{ color: "#2c3e50" }}>
          Customer Reviews
        </Title>

        <Button onClick={open} size={isMobile ? "xs" : "md"} radius={"xl"}>
          Leave a Review
        </Button>
      </Group>
      <Divider my='lg' />
      {data[activePage - 1]?.map((review, index) => (
        <ReviewCard key={index} {...review} />
      ))}
      <Flex align={"center"} justify={"center"}>
        <Pagination
          total={data.length}
          value={activePage}
          onChange={SetActivePage}
          mt='sm'
        />
      </Flex>

      <AddReviewModal
        opened={isAddReviewModalOpen}
        onClose={close}
        hotelId={hotelId}
      />
    </Box>
  );
}

export default Reviews;
