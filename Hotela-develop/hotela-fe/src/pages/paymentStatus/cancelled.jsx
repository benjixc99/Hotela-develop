import { Button, Flex, Text } from "@mantine/core";

import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";
const CancelledPayment = () => {
  const message = "Payment Cancelled!";
  const message2 = "Payment Failed! Please try again or contact support.";
  return (
    <Flex w={"100%"} flex={1} justify={"center"} py={45} px={20}>
      <Flex
        w={"45%"}
        h={"fit-content"}
        bg={"#f6fff8"}
        py={50}
        px={30}
        gap={20}
        direction={"column"}
        style={{
          borderRadius: "24px",
        }}>
        <Flex
          w={"100%"}
          justify={"center"}
          align={"center"}
          gap={5}
          direction={"column"}>
          <MdCancel color='#ef233c' size={105} />
          <Text c={"#ef233c"} fz={28} fw={700}>
            {message}
          </Text>
          <Text ta={"center"}>{message2}</Text>
        </Flex>

        <Flex w={"100%"} direction={"column"} gap={8}>
          <Link to={"/"}>
            <Button
              w={"100%"}
              fz={16}
              color='gray.3'
              c={"#051923"}
              h={45}
              radius={"lg"}>
              Continue Exploring
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CancelledPayment;
