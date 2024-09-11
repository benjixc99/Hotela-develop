import { Button, Flex, List, Text } from "@mantine/core";
import Confetti from "react-confetti";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSessionCheckSuccessMutation } from "../../Store/Slices/bookingSlice";
import { useEffect } from "react";

const SuccessPayment = () => {
  const message = "Payment Successful!";
  const message2 =
    "Thank you for your payment, Your transaction was completed successfully.";

  const [sessionCheck] = useSessionCheckSuccessMutation();

  useEffect(() => {
    let isMounted = true;
    const handleSession = async (sessionId) => {
      try {
        await sessionCheck({
          sessionId,
        }).unwrap();
      } catch (err) {
        console.log(err);
      } finally {
        if (isMounted) {
          console.log("Successful");
        }
      }
    };
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id",
    );
    console.log("Session ID: " + sessionId);

    if (sessionId && isMounted) {
      handleSession(sessionId);
    }
    return () => {
      isMounted = false; // cleanup flag
    };
  }, [sessionCheck]);

  return (
    <Flex w={"100%"} flex={1} justify={"center"} py={45} px={20}>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        numberOfPieces={700}
        recycle={false}
        style={{
          zIndex: 99,
        }}
      />

      <Flex
        w={"45%"}
        h={"fit-content"}
        bg={"#f6fff8"}
        py={20}
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
          <IoCheckmarkCircleSharp color='#1a535c' size={105} />
          <Text c={"#1a535c"} ta={"center"} fz={28} fw={700}>
            {message}
          </Text>
          <Text ta={"center"}>{message2}</Text>
        </Flex>
        <Flex
          w={"100%"}
          justify={"space-between"}
          bg={"gray.3"}
          py={10}
          px={15}
          style={{
            borderRadius: "16px",
          }}>
          <List listStyleType='none' fz={14}>
            <List.Item>OrderId</List.Item>
            <List.Item>Payment Type</List.Item>
          </List>
          <List listStyleType='none' fz={14}>
            <List.Item>#3f4589..</List.Item>
            <List.Item>Card Payment</List.Item>
          </List>
        </Flex>
        <Flex w={"100%"} direction={"column"} gap={8}>
          <Link to={"/bookinghistory"}>
            <Button w={"100%"} fz={16} h={45} color='#1a535c' radius={"lg"}>
              Booking History
            </Button>
          </Link>
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

export default SuccessPayment;
