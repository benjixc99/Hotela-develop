import { Flex } from "@mantine/core";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(null);

  return (
    <Flex align={"center"} justify={"center"} gap={8} h={80}>
      {[1, 2, 3, 4, 5].map((star) => {
        const size = hover === star ? 50 : 32; // Increase size on hover

        return (
          <FaStar
            key={star}
            size={size}
            color={star <= (hover || rating) ? "#FFD700" : "#e4e5e9"}
            style={{
              cursor: "pointer",
              transition: "transform 0.2s ease, color 0.2s ease",
              transform: hover === star ? "scale(1.5)" : "scale(1)",
            }}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
          />
        );
      })}
    </Flex>
  );
};

export default StarRating;
