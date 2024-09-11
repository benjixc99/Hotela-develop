import { Flex } from "@mantine/core";

type Props = {
  name: string;
  count: number;
};
export const ReportComponent = ({ name, count }: Props) => {
  return (
    <Flex w={"100%"}>
      <text>{name}</text>
      <text>{count}</text>
    </Flex>
  );
};
