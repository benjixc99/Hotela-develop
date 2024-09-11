import {
  Box,
  Button,
  FileInput,
  Flex,
  Image,
  InputLabel,
  MultiSelect,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core";
import Layout from "../../components/layout";
import { useState } from "react";
import {
  IconCheck,
  IconTrashFilled,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import { useCreateRoomMutation } from "../../redux/RTK_Query/roomSlice";
import { notifications } from "@mantine/notifications";
import { useNavigate, useParams } from "react-router-dom";

const CreateRoom = () => {
  const { id } = useParams();
  const [name, setRoomNumber] = useState<string>("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [perks, setPerks] = useState<string[]>([""]);
  const [category, setRoomType] = useState<string | null>("");
  const [price, setPrice] = useState<number>(0);
  const [maxGuest, setMaxGuest] = useState<number>(1);
  const [noOfRooms, setNoOfRooms] = useState<number>(1);
  const [description, setDescription] = useState<string>("");

  const [createRoom, { isLoading }] = useCreateRoomMutation();
  const body = {
    name,
    photos,
    category,
    price,
    perks,
    maxGuest,
    description,
    noOfRooms,
  };
  console.log("form", body);
  const navigate = useNavigate();
  const handleRoomForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      photos.forEach((photo) => formData.append("roomImages", photo));
      formData.append("name", name);
      formData.append("hotel", id);
      formData.append("category", category);
      formData.append("noOfRooms", noOfRooms.toString());
      formData.append("price", price.toString());
      formData.append("maxOccupancy", maxGuest.toString());
      formData.append("description", description);
      perks.forEach((perk) => formData.append("amenities", perk));

      await createRoom(formData).unwrap();
      navigate(`/hotels/${id}`);

      notifications.show({
        title: "Booked Successfully",
        message: ``,
        icon: <IconCheck size={25} />,
        color: "#006d77",
        withCloseButton: true,
        autoClose: 4000,
        bg: "#e7fefd",
        radius: "lg",
      });
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "data" in error) {
        notifications.show({
          title: `${error.data}`,
          message: ``,
          icon: <IconX size={25} />,
          color: "#d90429",
          withCloseButton: true,
          autoClose: 4000,
          bg: "#e7fefd",
          radius: "lg",
        });
        console.log(error.data);
      }
    }
  };

  return (
    <Layout>
      <>
        <Flex w={"100%"} justify={"center"}>
          <Flex
            w={"70%"}
            justify={"flex-start"}
            direction={"column"}
            p={14}
            style={{
              background: "#ffffff",
              borderRadius: 12,
            }}>
            <form onSubmit={handleRoomForm}>
              <Flex
                w={"100%"}
                align={"center"}
                gap={10}
                justify={"space-between"}>
                <label
                  htmlFor='images2'
                  style={{
                    width: 150,
                    height: 100,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#d0d0d0",
                    borderRadius: 12,
                  }}>
                  <IconUpload size={28} />
                </label>
                <FileInput
                  display={"none"}
                  w={"40%"}
                  id='images2'
                  value={photos}
                  onChange={setPhotos}
                  label='Upload files'
                  placeholder='Upload files'
                  multiple
                />

                <Flex w={"100%"} align={"center"} gap={5}>
                  {photos &&
                    photos.map((image) => (
                      <Box pos={"relative"}>
                        <Image
                          src={URL.createObjectURL(image)}
                          w={120}
                          h={100}
                          radius={12}
                        />
                        <Button
                          pos={"absolute"}
                          right={0}
                          bottom={0}
                          radius={"md"}
                          p={8}
                          bg={"red"}
                          onClick={() =>
                            setPhotos(photos.filter((e) => e !== image))
                          }>
                          <IconTrashFilled size={16} />
                        </Button>
                      </Box>
                    ))}
                </Flex>
              </Flex>
              <Flex
                w={"100%"}
                align={"center"}
                gap={10}
                justify={"space-between"}>
                <TextInput
                  label={"Room Number"}
                  variant='filled'
                  value={name}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  w={"100%"}
                  fz={22}
                  radius={"md"}
                />

                <Select
                  w={"100%"}
                  label='Room Type'
                  radius={"md"}
                  variant='filled'
                  fz={22}
                  value={category}
                  onChange={setRoomType}
                  placeholder='Select Room Type'
                  data={["Standard", "Deluxe", "Suite", "Luxury"]}
                />
                <Flex
                  w={"100%"}
                  direction={"column"}
                  h={"fit-content"}
                  align={"center"}>
                  <InputLabel ta={"left"}>Number of Rooms</InputLabel>
                  <Flex
                    w={"100%"}
                    align={"center"}
                    justify={"space-between"}
                    gap={5}
                    h={"fit-content"}>
                    <Button
                      disabled={noOfRooms === 1}
                      radius={"lg"}
                      fz={18}
                      onClick={() => setNoOfRooms(noOfRooms - 1)}>
                      -
                    </Button>
                    <TextInput
                      radius='md'
                      w={"60%"}
                      variant='filled'
                      type='number'
                      value={noOfRooms}
                      onChange={(e) => setNoOfRooms(e.target.valueAsNumber)}
                    />
                    <Button
                      radius={"lg"}
                      fz={18}
                      onClick={() => setNoOfRooms(noOfRooms + 1)}>
                      +
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
              <Flex
                w={"100%"}
                align={"center"}
                gap={10}
                justify={"space-between"}>
                <TextInput
                  label={"Price"}
                  w={"100%"}
                  value={price}
                  type='number'
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                  variant='filled'
                  fz={22}
                  radius={"md"}
                />
                {/* No of guest */}
                <Flex
                  w={"100%"}
                  direction={"column"}
                  h={"fit-content"}
                  align={"center"}>
                  <InputLabel ta={"left"}>Number of Guest</InputLabel>
                  <Flex
                    w={"100%"}
                    align={"center"}
                    justify={"space-between"}
                    gap={5}
                    h={"fit-content"}>
                    <Button
                      disabled={maxGuest === 1}
                      radius={"lg"}
                      fz={18}
                      onClick={() => setMaxGuest(maxGuest - 1)}>
                      -
                    </Button>
                    <TextInput
                      radius='md'
                      w={"60%"}
                      variant='filled'
                      type='number'
                      value={maxGuest}
                      onChange={(e) => setMaxGuest(e.target.valueAsNumber)}
                    />
                    <Button
                      radius={"lg"}
                      fz={18}
                      onClick={() => setMaxGuest(maxGuest + 1)}>
                      +
                    </Button>
                  </Flex>
                </Flex>
                <MultiSelect
                  w={"100%"}
                  label='Room Utilities'
                  variant='filled'
                  radius={"md"}
                  value={perks}
                  onChange={setPerks}
                  fz={22}
                  placeholder='Select Room Perks'
                  data={[
                    "WiFi",
                    "Air Conditioner",
                    "Fridge",
                    "Smart TV",
                    "LED TV",
                    "Towels",
                  ]}
                />
              </Flex>
              <Flex
                w={"100%"}
                align={"center"}
                gap={10}
                justify={"space-between"}>
                <Textarea
                  label={"Room Description"}
                  w={"100%"}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='Summary description of the room'
                  resize='vertical'
                  fz={22}
                  variant='filled'
                  radius={"md"}
                />
              </Flex>
              <Flex w={"100%"} align={"center"} py={10}>
                <Button
                  p={10}
                  w={"35%"}
                  type='submit'
                  radius={"md"}
                  loading={isLoading}>
                  Create Room
                </Button>
              </Flex>
            </form>
          </Flex>
        </Flex>
      </>
    </Layout>
  );
};

export default CreateRoom;
