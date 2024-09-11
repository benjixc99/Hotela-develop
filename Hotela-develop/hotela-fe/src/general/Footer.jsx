import { Flex, Stack, Text, Title, Group } from "@mantine/core";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <Flex
      direction="column"
      bg="#000814" // Light gray color
      // py={20}
      justify={"center"}
      px={{ base: 10, sm: 80 }}
      style={{
        borderTop: "1px solid #e0e0e0",
        width: "100%",
      }}
      h={180}
      c={"white"}
    >
      <Flex justify="space-between" align="flex-start" wrap="wrap">
        <Stack gap={10} style={{ maxWidth: 300 }}>
          <Title order={3} c={"white"}>
            Hotela
          </Title>
          <Text size="sm">Your favorite booking experience since 2024</Text>
        </Stack>

        <Stack gap={10}>
          <Title order={4} c={"white"}>
            Follow Us
          </Title>
          <Group spacing="sm">
            <a href="#" aria-label="Facebook">
              <FaFacebookF size={20} color="white" />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter size={20} color="white" />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram size={20} color="white" />
            </a>
          </Group>
        </Stack>
      </Flex>

      <Flex
        justify="center"
        align="center"
        direction="column"
        style={{ color: "white" }}
      >
        <Text size="sm">© 2024 Hotela. All rights reserved.</Text>
        <Text size="xs" c="white">
          Designed by YourCompany
        </Text>
      </Flex>
    </Flex>
  );
}

export default Footer;
