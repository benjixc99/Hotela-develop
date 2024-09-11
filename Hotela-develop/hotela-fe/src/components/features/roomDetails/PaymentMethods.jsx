/* eslint-disable react/prop-types */
import {
  Box,
  Title,
  Button,
  Stack,
  Paper,
  Group,
  Avatar,
  Image,
} from "@mantine/core";
import { FaStripe, FaBitcoin } from "react-icons/fa";
import cryptomus from "./../../../assets/cryptomus.svg";
function PaymentMethods({
  handleStripePayment,
  stripeLoading,
  handleCryptoPayment,
  cryptoLoading,
}) {
  return (
    <Box>
      <Paper>
        <Title order={3} mb='md'>
          Step 3: Choose Payment Method
        </Title>

        <Stack spacing='lg'>
          <Group align='center' mt='md'>
            <Button
              onClick={handleStripePayment}
              loading={stripeLoading}
              justify='center'
              fullWidth
              color='#ffffff'
              bd={"none"}
              size='lg'
              radius='md'
              bg={"#6B71E3"}
              ta={"center"}
              variant='outline'>
              <FaStripe color='#ffffff' size={55} />
            </Button>
            <Button
              onClick={handleCryptoPayment}
              justify='center'
              loading={cryptoLoading}
              fullWidth
              rightSection={<span />}
              radius='md'
              bg={"#000000"}
              fw={500}
              bd={"none"}
              color='#ffffff'
              c={"#ffffff"}
              ta={"center"}
              variant='outline'
              size='lg'>
              <Image src={cryptomus} h={"100%"} /> Cryptomus
            </Button>
            {/* <Button
              onClick={handleCryptoPayment}
              leftIcon={<FaBitcoin />}
              size="lg"
              radius="md"
              color="orange"
              variant="outline"
              style={{ display: "flex", alignItems: "center" }}
            >
              Pay with Crypto
            </Button> */}
          </Group>
        </Stack>
      </Paper>
    </Box>
  );
}

export default PaymentMethods;
