import { Flex, Loader } from "@mantine/core";

const Loading = () => {
  return (
    <Flex
      w={"100%"}
      h={"100dvh"}
      bg={"#e7fefd"}
      justify={"center"}
      align={"center"}>
      <Loader color='#006d77' size='xl' type='dots' />
    </Flex>
  );
};

export default Loading;
