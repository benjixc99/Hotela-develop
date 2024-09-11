/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import {
  Modal,
  Textarea,
  Button,
  Box,
  Text,
  Title,
  Divider,
} from "@mantine/core";
import StarRating from "./StarRating";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useAddRatingAndCommentMutation } from "../../../../Store/Slices/hotelSlice";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../Store/auth/authSlice";
import { notifications } from "@mantine/notifications";
import { IoMdCheckmarkCircle, IoMdCloseCircle } from "react-icons/io";

const AddReviewModal = ({ opened, onClose, hotelId }) => {
  const [rating, setRating] = useState(1);
  const [comments, setComments] = useState("");

  const user = useSelector(currentUser);
  console.log(comments);

  const [rateAndComment, { isLoading }] = useAddRatingAndCommentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await rateAndComment({
        id: hotelId,
        userId: user?.userInfo?._id,
        rating,
        comments,
      }).unwrap();
      notifications.show({
        title: "Added successfully",
        radius: "lg",
        message: "",
        autoClose: 5000,
        color: "teal",
        icon: <IoMdCheckmarkCircle fontSize={18} />,
      });
      onClose();
    } catch (err) {
      console.log(err);
      notifications.show({
        title: "Error",
        message: `${err && err.data && err.data.message}`,
        radius: "lg",
        color: "red",
        icon: <IoMdCloseCircle fontSize={18} />,
      });
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      radius={"md"}
      centered
      size={500}
      title={
        <Text fz={20} fw={500}>
          Write a Review
        </Text>
      }
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      closeButtonProps={{
        icon: <IoClose size={50} stroke={1.5} />,
      }}>
      <Divider mb={20} />

      <Box>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Title ta={"center"} fw={700} fz={{ base: 27, sm: 30 }}>
            How Was Your Experience with Us?
          </Title>

          <Text ta={"center"} size='sm'>
            We value your feedback and want to ensure every guest enjoys an
            exceptional stay. Share your thoughts and help us continue to
            elevate our service.
          </Text>

          <StarRating rating={rating} setRating={setRating} />

          <Textarea
            size='lg'
            placeholder='Add a comment'
            radius={"md"}
            onChange={(e) => setComments(e.target.value)}
            autosize
            minRows={4}
            maxRows={4}
            required
          />

          <Button type='submit' loading={isLoading} radius='xl' size='md'>
            Submit Review
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

AddReviewModal.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddReviewModal;
