import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  Tabs,
  Badge,
  SimpleGrid,
  Text,
  Flex,
} from "@mantine/core";
import { Suspense, useState } from "react";
import { useGetVacantRoomQuery } from "../redux/RTK_Query/roomSlice";
export const ModalComp = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [activeTab, setActiveTab] = useState<string | null>("first");
  const { data: rooms } = useGetVacantRoomQuery();
  return (
    <>
      <Modal.Root opened={opened} onClose={close} size={"lg"}>
        <Modal.Overlay />
        <Modal.Content bg={"#e7fefd"} radius={"lg"}>
          <Modal.Header bg={"#e7fefd"}>
            {/* <Modal.Title>Modal title</Modal.Title> */}
            <Modal.CloseButton />
          </Modal.Header>

          <Modal.Body>
            <Suspense fallback={"...Loading"}>
              <Tabs
                color='#004346'
                variant='pills'
                radius='md'
                value={activeTab}
                defaultValue={"first"}
                onChange={setActiveTab}>
                <Tabs.List justify='center'>
                  <Tabs.Tab value='first' fw={600}>
                    Vacant Rooms ({rooms && rooms.vacantRooms.length})
                  </Tabs.Tab>
                  <Tabs.Tab color='#c9184a' value='second' fw={600}>
                    Booked Rooms ({rooms && rooms.bookedRooms.length})
                  </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value='first' px={4} py={8}>
                  {rooms && rooms.vacantRooms.length <= 0 && (
                    <>
                      <Flex w={"100%"} justify={"center"}>
                        <Text fz={19}> No booked room today.</Text>
                      </Flex>
                    </>
                  )}
                  <SimpleGrid cols={8} spacing={4}>
                    {rooms &&
                      rooms.vacantRooms.map((room) => (
                        <Badge key={room._id} color='#004346' size='xl'>
                          {room.roomNumber}
                        </Badge>
                      ))}
                  </SimpleGrid>
                </Tabs.Panel>

                <Tabs.Panel px={4} py={8} value='second'>
                  {rooms && rooms.bookedRooms.length <= 0 && (
                    <>
                      <Flex w={"100%"} justify={"center"}>
                        <Text fz={19}> No booked room today.</Text>
                      </Flex>
                    </>
                  )}
                  <SimpleGrid cols={8} spacing={4}>
                    {rooms &&
                      rooms.bookedRooms.map((room) => (
                        <Badge key={room._id} color='#c9184a' size='xl'>
                          {room.roomNumber}
                        </Badge>
                      ))}
                  </SimpleGrid>
                </Tabs.Panel>
              </Tabs>
            </Suspense>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>

      <Button radius={"md"} onClick={open}>
        Availability
      </Button>
    </>
  );
};
