import { Avatar, Badge, Card, Flex, Text } from "@mantine/core";

const StaffCard = ({
  profile,
  fullname,
  email,
  role,
}: {
  profile: string;
  fullname: string;
  email: string;
  role: string;
}) => {
  return (
    <Card shadow='sm' radius={"lg"} padding='xl' component='a' target='_blank'>
      <Card.Section
        py={8}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Avatar size={"xl"} color='teal'>
          {profile}
        </Avatar>
      </Card.Section>
      <Flex w={"100%"} direction={"column"} gap={10} align={"center"}>
        <Text
          fw={600}
          size='md'
          lineClamp={1}
          fz={"lg"}
          c={"rgb(41, 61, 64)"}
          style={{
            textAlign: "center",
          }}>
          {fullname}
        </Text>
        <Text
          fw={500}
          lineClamp={1}
          fz={"md"}
          size='md'
          style={{
            textAlign: "center",
          }}>
          {email}
        </Text>
        <Badge size='lg' fw={500} variant='filled'>
          {role}
        </Badge>
      </Flex>
    </Card>
  );
};

export default StaffCard;
