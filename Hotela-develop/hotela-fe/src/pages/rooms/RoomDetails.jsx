/* eslint-disable react/prop-types */
import { Box, Divider, Flex, Loader } from "@mantine/core";
import { IoArrowBack } from "react-icons/io5";
import YourDetails from "../../components/features/roomDetails/YourDetails";
import PropertyDetails from "../../components/features/roomDetails/PropertyDetails";
import PaymentMethods from "../../components/features/roomDetails/PaymentMethods";
import { useMediaQuery } from "@mantine/hooks";
import RoomInfo from "../../general/RoomInfo";
import { useSearchParams } from "react-router-dom";
import { useRoomDetailsQuery } from "../../Store/Slices/roomSlice";
import { useEffect, useState } from "react";
import {
  useCryptoPaymentMutation,
  useStripePaymentMutation,
} from "../../Store/Slices/bookingSlice";
import { useSelector } from "react-redux";
import { currentUser } from "../../Store/auth/authSlice";
import { differenceInDays } from "date-fns";

import { loadStripe } from "@stripe/stripe-js";

function RoomDetails() {
  const [hotelParams, setHotelParams] = useSearchParams();
  const user = useSelector(currentUser);
  const stripePkKey = import.meta.env.VITE_stripeTestKey;
  const data = {
    firstName: user?.userInfo?.firstName,
    lastName: user?.userInfo?.lastName,
    email: user?.userInfo?.email,
  };
  const roomId = hotelParams.get("reg");
  const hotelId = hotelParams.get("hotel");
  const [checkIn, setCheckIn] = useState(hotelParams.get("checkIn") || null);
  const [checkOut, setCheckOut] = useState(hotelParams.get("checkOut") || null);
  const [noOfGuest, setNoOfGuest] = useState(hotelParams.get("guest") || "");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { data: room = {}, isLoading } = useRoomDetailsQuery(roomId);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const numberDay = differenceInDays(new Date(checkOut), new Date(checkIn));
  const totalPrice = room?.price * numberDay;
  const body = {
    hotel: hotelId,
    rooms: roomId,
    checkIn,
    checkOut,
    price: totalPrice,
    totalGuest: noOfGuest,
  };
  const [stripePayment, { isLoading: loading }] = useStripePaymentMutation();
  const [cryptoPayment, { isLoading: cryptoLoading }] =
    useCryptoPaymentMutation();
  const cashPayment = async (e) => {
    e.preventDefault();
    try {
      const payment = await stripePayment(body).unwrap();
      const stripeCheckout = await loadStripe(`${stripePkKey}`);

      stripeCheckout.redirectToCheckout({
        sessionId: payment.id,
      });
      console.log(payment);
    } catch (err) {
      console.log(err);
    }
  };
  const cryptoCheckout = async (e) => {
    e.preventDefault();
    try {
      const payment = await cryptoPayment(body).unwrap();
      console.log(payment);

      if (payment && payment.result.url) {
        window.location.href = payment.result.url; // Redirect to the checkout URL
      } else {
        console.log("Checkout URL not found in the payment response");
      }
      console.log(payment);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Flex w={"100%"} mb={50} direction={"column"}>
      <IoArrowBack style={{ display: isMobile ? "none" : "flex" }} size={30} />
      {isLoading ? (
        <Flex w={"100%"} h={"80vh"} justify={"center"} align={"center"}>
          <Loader color='blue' size='xl' type='dots' />
        </Flex>
      ) : (
        <Flex
          gap={20}
          mt={{ sm: 20 }}
          direction={{ base: "column-reverse", sm: "row" }}
          w={"100%"}>
          <Box h={"100%"} w={"100%"}>
            <YourDetails data={data} />
            <Divider my={"xl"} />
            <PropertyDetails />
            <Divider my={"xl"} />
            <PaymentMethods
              handleStripePayment={cashPayment}
              stripeLoading={loading}
              handleCryptoPayment={cryptoCheckout}
              cryptoLoading={cryptoLoading}
            />
          </Box>
          <Box h={"100%"} w={"100%"}>
            <RoomInfo
              name={room?.name}
              images={room?.images}
              price={room?.price}
              checkIn={checkIn}
              checkOut={checkOut}
              guest={noOfGuest}
            />
          </Box>
        </Flex>
      )}
    </Flex>
  );
}

export default RoomDetails;
