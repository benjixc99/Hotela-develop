import {
  Button,
  Flex,
  Loader,
  Pagination,
  SimpleGrid,
  Table,
  Text,
  ThemeIcon,
} from "@mantine/core";
import Layout from "../../components/layout";
import { useState } from "react";
import {
  IconBedFilled,
  IconBuildingSkyscraper,
  IconEdit,
  IconSearch,
  IconTrashFilled,
} from "@tabler/icons-react";
import SearchFilter from "../../components/searchFilter";
import { useGetAllRoomQuery } from "../../redux/RTK_Query/roomSlice";

import { Link } from "react-router-dom";
import { useGetAllHotelsQuery } from "../../redux/RTK_Query/hotelSlice";

const Hotels = () => {
  const { data: hotels = [], isLoading } = useGetAllHotelsQuery();

  function chunk<T>(array: T[], size: number): T[][] {
    if (!array.length) {
      return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
  }

  const item = chunk(hotels, 10);
  console.log(item);
  const [activePage, setPage] = useState<number>(1);
  const getHotels = item[activePage - 1] || [];
  const boxtype = [
    {
      name: "Total Hotel",
      total: isLoading ? (
        <Loader color='#006d77' size='md' type='dots' />
      ) : hotels?.length <= 0 ? (
        0
      ) : (
        hotels?.length
      ),
      icon: <IconBuildingSkyscraper />,
      color: "#d62828",
    },
  ];
  return (
    <Layout>
      <Flex w={"100%"} direction={"column"} gap={10} px={10}>
        <SimpleGrid
          w={"100%"}
          h={"fit-content"}
          cols={{ base: 1, md: 2, lg: 2 }}
          spacing={10}
          pb={10}>
          {boxtype.map((a) => (
            <Flex
              key={a.name}
              bg={"#fdfffc"}
              px={10}
              py={20}
              gap={5}
              align={"center"}
              style={{ borderRadius: 12 }}>
              <Flex
                w={"100%"}
                h={"100%"}
                direction={"column"}
                align={"flex-start"}>
                <Text
                  c={"#293d40"}
                  fz={{ base: 14, md: 14.2, lg: 14.5 }}
                  fw={600}>
                  {a.name}
                </Text>
                <Text fz={{ base: 16, md: 20, lg: 21 }} c={"#172a3a"} fw={600}>
                  {a.total}
                </Text>
              </Flex>
              <ThemeIcon variant='light' radius='lg' size='xl' color={a.color}>
                {a.icon}
              </ThemeIcon>
            </Flex>
          ))}
        </SimpleGrid>
        <SearchFilter
          PlaceHolder='Search by name'
          IconName={<IconSearch fontSize={18} />}
          link='/createHotel'
          onchange={(e) => setSearch(e.target.value)}
          BtnName='New Hotel'>
          <></>
        </SearchFilter>
        <Flex
          w={"100%"}
          direction={"column"}
          align={"center"}
          justify={"center"}>
          <Table striped>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Hotel Name</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Average Price(GBP)</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {getHotels.length <= 0 ? (
                <>
                  <Flex
                    w={"100%"}
                    justify={"center"}
                    align={"center"}
                    pos={"relative"}>
                    <Text fw={400} fz={23} ta={"center"}>
                      No data
                    </Text>
                  </Flex>
                </>
              ) : (
                getHotels.map((hotel) => (
                  <Table.Tr key={hotel._id}>
                    <Table.Td>{hotel.name}</Table.Td>
                    <Table.Td>{hotel.email}</Table.Td>
                    <Table.Td>{hotel.price}</Table.Td>

                    <Table.Td>
                      <Flex gap={10}>
                        <Link to={`/hotels/${hotel._id}`}>
                          <Button bg={"cyan"} radius={"lg"}>
                            <IconEdit size={20} />
                          </Button>
                        </Link>

                        <Button bg={"red"} radius={"lg"}>
                          <IconTrashFilled size={20} />
                        </Button>
                      </Flex>
                    </Table.Td>
                  </Table.Tr>
                ))
              )}
            </Table.Tbody>
          </Table>

          <Pagination
            total={item.length}
            value={activePage}
            onChange={setPage}
            radius='md'
          />
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Hotels;
