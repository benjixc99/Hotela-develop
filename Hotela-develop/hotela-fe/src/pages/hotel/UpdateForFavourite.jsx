import {
  Box,
  Button,
  Flex,
  Group,
  Image,
  Menu,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import dummy from "../../assets/dummy.avif";
import { TiPencil, TiTrash } from "react-icons/ti";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import DeleteModal from "../../components/features/favourite/DeleteModal";
import { useState } from "react";
import RenameModal from "../../components/features/favourite/RenameModal";
import CreateNewListModal from "../../components/features/favourite/CreateNewListModal";

function UpdateForFavourite() {
  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);

  const [
    renameModalOpened,
    { open: openRenameModal, close: closeRenameModal },
  ] = useDisclosure(false);

  const [
    createNewListModalOpened,
    { open: openCreateNewListModal, close: closeCreateNewListModal },
  ] = useDisclosure(false);
  const [selectedList, setSelectedList] = useState(null);

  const isMobile = useMediaQuery("(max-width: 767px)"); // Adjusted for mobile view

  const [favouriteData, setFavouriteData] = useState([
    { id: 1, name: "Your next Stay" },
    { id: 2, name: "Exciting Adventure" },
    { id: 3, name: "Relaxing Getaway" },
    { id: 4, name: "Family Vacation" },
    { id: 5, name: "Business Trip" },
    { id: 6, name: "Weekend Retreat" },
  ]);

  const handleDelete = () => {
    setFavouriteData(
      favouriteData.filter((data) => data.id !== selectedList.id)
    ),
      closeDeleteModal();
  };

  return (
    <Box w={"100%"} p="lg">
      <Group align="center" justify="space-between" mb="xl">
        <Stack>
          <Title order={2}>Your Favourites</Title>
          <Text size="sm" c="dimmed">
            {favouriteData.length} items in your list
          </Text>
        </Stack>

        <Button
          onClick={() => openCreateNewListModal()}
          variant="outline"
          color="blue"
          size="md"
          radius="xl"
        >
          Create new list
        </Button>
      </Group>

      <Flex wrap="wrap" gap="lg">
        {favouriteData.map((favourite, i) => (
          <Stack
            spacing="sm"
            className="image-stack"
            w={{ base: "100%", sm: 200 }}
            key={i}
          >
            <Box pos="relative">
              <Image src={dummy} w={"100%"} h={147} radius="md" />
              {i === 0 ? null : (
                <Menu position="top">
                  <Menu.Target>
                    <Box
                      pos="absolute"
                      bottom={10}
                      right={10}
                      w={35}
                      h={35}
                      bg="white"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "10%",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                      }}
                      className={!isMobile && "pencil-box"}
                    >
                      <HiOutlineDotsVertical size={20} />
                    </Box>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      onClick={() => {
                        setSelectedList({
                          id: favourite.id,
                          name: favourite.name,
                        });
                        openRenameModal();
                      }}
                    >
                      <Flex align="center">
                        <TiPencil size={20} />
                      </Flex>
                    </Menu.Item>

                    <Menu.Divider />

                    <Menu.Item
                      onClick={() => {
                        setSelectedList({
                          id: favourite.id,
                          name: favourite.name,
                        });
                        openDeleteModal();
                      }}
                    >
                      <Flex align="center">
                        <TiTrash size={20} />
                      </Flex>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              )}
            </Box>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                overflow: "hidden", // Ensures content overflows properly
                whiteSpace: "nowrap", // Keeps text on the same line
              }}
            >
              <Text
                fw={600}
                fz={16}
                style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              >
                {favourite.name}
              </Text>
              <Text fz={16}>(0 stays)</Text>
            </Box>
          </Stack>
        ))}
      </Flex>

      <DeleteModal
        openedDelete={deleteModalOpened}
        onOpen={openDeleteModal}
        onClose={closeDeleteModal}
        selectedName={selectedList?.name}
        onDelete={handleDelete}
      />

      <RenameModal
        openedRename={renameModalOpened}
        onOpen={openRenameModal}
        onClose={closeRenameModal}
        selectedName={selectedList?.name}
      />

      <CreateNewListModal
        openedCreateNewList={createNewListModalOpened}
        onOpen={openCreateNewListModal}
        onClose={closeCreateNewListModal}
      />
    </Box>
  );
}

export default UpdateForFavourite;
