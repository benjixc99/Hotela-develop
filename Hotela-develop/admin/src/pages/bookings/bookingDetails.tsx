import Layout from "../../components/layout";
import { useParams } from "react-router-dom";
import { useSingleBookingQuery } from "../../redux/RTK_Query/bookingSlice";
import { Box, Flex, List, Text, ThemeIcon } from "@mantine/core";
import { format } from "date-fns";
import { IconHome, IconUser } from "@tabler/icons-react";
const BookingDetails = () => {
  const { id } = useParams();
  const { data } = useSingleBookingQuery(id);
  console.log(data);

  return (
    <Layout>
      <>
        <Flex
          w='100%'
          flex={1}
          align='center'
          justify='center'
          style={{ padding: "20px" }}>
          <Box
            w='100%'
            bg='#f8fafc'
            p='20px'
            style={{
              borderRadius: "20px",
              border: "2px solid #e0e0e0",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
            }}>
            <Flex justify='space-between' gap='20px'>
              <Box w='48%'>
                <Box
                  bg='blue'
                  style={{
                    borderRadius: "7px",
                    padding: "10px",
                    textAlign: "center",
                  }}>
                  <Text fw={500} size='lg' color='#ffffff'>
                    Customer Details
                  </Text>
                </Box>
                <List
                  spacing='xs'
                  size='md'
                  mt='md'
                  icon={
                    <ThemeIcon color='blue' variant='light'>
                      <IconUser size={16} />
                    </ThemeIcon>
                  }>
                  <List.Item>
                    <Text fw={600}>Fullname</Text> {data?.guestName}
                  </List.Item>
                  <List.Item>
                    <Text fw={600}>Email</Text> {data?.email}
                  </List.Item>
                  <List.Item>
                    <Text fw={600}>Gender</Text> {data?.gender}
                  </List.Item>
                  <List.Item>
                    <Text fw={600}>Phone Number</Text> {data?.phoneNumber}
                  </List.Item>
                  <List.Item>
                    <Text fw={600}>Number of Guest</Text> {data?.numOfGuest}
                  </List.Item>
                  <List.Item>
                    <Text fw={600}>Address</Text> {data?.address}
                  </List.Item>
                  <List.Item>
                    <Text fw={600}>Occupation</Text> {data?.occupation}
                  </List.Item>
                  <List.Item>
                    <Text fw={600}>Nationality</Text> {data?.nationality}
                  </List.Item>
                  <List.Item>
                    <Text fw={600}>Passport Number</Text> {data?.passportNumber}
                  </List.Item>
                </List>
              </Box>

              <Box w='48%'>
                <Box
                  bg='teal'
                  style={{
                    borderRadius: "7px",
                    padding: "10px",
                    textAlign: "center",
                  }}>
                  <Text fw={500} size='lg' color='#ffffff'>
                    Room Details
                  </Text>
                </Box>
                <List
                  spacing='xs'
                  size='md'
                  mt='md'
                  icon={
                    <ThemeIcon color='teal' variant='light'>
                      <IconHome size={16} />
                    </ThemeIcon>
                  }>
                  <List.Item>
                    <Text fw={600}>Room Number</Text> {data?.roomId.roomNumber}
                  </List.Item>
                  <List.Item>
                    <Text fw={600}>Price</Text> {data?.price} NGN
                  </List.Item>
                  <List.Item>
                    <Text fw={600}>Discount</Text> {data?.discountAmount} NGN
                  </List.Item>
                  <List.Item>
                    <Text fw={600}>Adults</Text> {data?.adults}
                  </List.Item>
                  <List.Item>
                    <Text fw={600}>Children</Text> {data?.children}
                  </List.Item>
                  <List.Item>
                    <Text fw={600}>Date Check-IN</Text>
                    {data?.checkIN &&
                      format(new Date(data?.checkIN), "yyyy-MM-dd")}
                  </List.Item>
                  <List.Item>
                    <Text fw={600}>Date Check-OUT</Text>
                    {data?.checkOUT &&
                      format(new Date(data?.checkOUT), "yyyy-MM-dd")}
                  </List.Item>
                  <List.Item>
                    <Text fw={600} size='lg'>
                      Total Amount
                    </Text>{" "}
                    {data && data?.price - data?.discountAmount} NGN
                  </List.Item>
                </List>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </>
    </Layout>
  );
};

export default BookingDetails;
