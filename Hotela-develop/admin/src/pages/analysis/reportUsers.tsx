import { Button, Flex, Group, Select, Table, Text } from "@mantine/core";
import { useGetUsersReportQuery } from "../../redux/RTK_Query/reportSlice";
import { BarchartComp } from "../../components/BarchartComponent";
import { useRef, useState } from "react";
import { IconPrinter } from "@tabler/icons-react";
import { useReactToPrint } from "react-to-print";

const ReportUsers = () => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const d: Date = new Date(Date.now());
  const getYear = d.getFullYear().toString();
  const [year, setYear] = useState<string | null>(getYear);
  // Increase the number of years
  const years = Array.from({ length: 30 }, (_, index) =>
    (Number(getYear) - 10 + index).toString(),
  );

  const { data: users = [] } = useGetUsersReportQuery(year);
  const rows = users.map((user) => (
    <Table.Tr className='tableChild' key={user.month}>
      <Table.Td fw={500}>{user.month}</Table.Td>
      <Table.Td fw={500}>{user.total}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Flex
      ref={componentRef}
      w={"65%"}
      direction={"column"}
      align={"center"}
      className='print-container'
      gap={10}>
      <Flex
        w={"100%"}
        className='print-title'
        p={4}
        justify={"center"}
        align={"center"}>
        <Text c={"rgb(41, 61, 64)"} fz={25} fw={700}>
          Hotela Report
        </Text>
      </Flex>
      <Flex w={"100%"} pb={5} justify={"space-between"} align={"center"}>
        <Text c={"#172a3a"} fw={600}>
          Users Report
        </Text>
        <Group>
          <Select
            radius={"lg"}
            width={40}
            fw={500}
            searchable
            value={year}
            onChange={(e) => setYear(e)}
            data={years}
          />
          <Button onClick={handlePrint} radius={"md"} bg={"cyan"}>
            <IconPrinter />
          </Button>
        </Group>
      </Flex>

      <Flex
        w={"100%"}
        h={"57vh"}
        bg={"#fdfffc"}
        direction={"column"}
        p={10}
        style={{ borderRadius: 12 }}>
        <BarchartComp height={300} data={users} name='total' />
      </Flex>
      <Table
        fz={16}
        striped
        stickyHeader
        stripedColor='#008080'
        withTableBorder
        style={{
          borderRadius: 12,
        }}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Month</Table.Th>
            <Table.Th>Total Users</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Flex>
  );
};

export default ReportUsers;
