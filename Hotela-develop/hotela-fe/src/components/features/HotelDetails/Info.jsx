/* eslint-disable react/prop-types */
import { Box, Stack, Text, Title, Group, Divider, Paper } from "@mantine/core";
import { IoCall, IoMail, IoLocationSharp } from "react-icons/io5";

function Info({ name, description, address, email }) {
  return (
    <Box
      mt={20}
      px={20}
      py={30}
      style={{ backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
      <Title order={2} mb={20} style={{ color: "#2c3e50" }}>
        About {name}
      </Title>
      <Text mb={20} fz={"sm"} style={{ lineHeight: 1.6 }}>
        {description}
      </Text>

      <Divider my='lg' />

      <Paper
        shadow='xs'
        p='md'
        mb={20}
        style={{ backgroundColor: "#fff", borderRadius: "10px" }}>
        <Group align='center'>
          <IoLocationSharp size={30} color='#3498db' />
          <Stack spacing={0}>
            <Text fw={600} size='lg'>
              Location
            </Text>
            <Text size='sm'>{address}</Text>
          </Stack>
        </Group>
      </Paper>

      <Paper
        shadow='xs'
        p='md'
        mb={20}
        style={{ backgroundColor: "#fff", borderRadius: "10px" }}>
        <Group align='center'>
          <IoCall size={30} color='#3498db' />
          <Stack spacing={0}>
            <Text fw={600} size='lg'>
              Contact
            </Text>
            <Text size='sm'>Telephone: +1 (520) 426-3500</Text>
            <Text size='sm'>Fax: +1 (520) 836-4728</Text>
          </Stack>
        </Group>
      </Paper>

      <Paper
        shadow='xs'
        p='md'
        mb={20}
        style={{ backgroundColor: "#fff", borderRadius: "10px" }}>
        <Group align='center'>
          <IoMail size={30} color='#3498db' />
          <Stack spacing={0}>
            <Text fw={600} size='lg'>
              Email
            </Text>
            <Text size='sm'>{email}</Text>
          </Stack>
        </Group>
      </Paper>
    </Box>
  );
}

export default Info;
