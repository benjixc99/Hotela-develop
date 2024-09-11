import {
  Stepper,
  Button,
  Group,
  Flex,
  TextInput,
  Select,
  Text,
  InputLabel,
  List,
  Image,
  FileInput,
  Box,
  MultiSelect,
  Textarea,
} from "@mantine/core";
import Layout from "../../components/layout";
import classes from "../../assets/styles/demo.module.css";
import { useState } from "react";
import { useGetAllRoomQuery } from "../../redux/RTK_Query/roomSlice";

import { notifications } from "@mantine/notifications";
import {
  IconCheck,
  IconTrashFilled,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import { useGetLocationQuery } from "../../redux/RTK_Query/LocationSlice";
import { useCreateHotelMutation } from "../../redux/RTK_Query/hotelSlice";
import { useNavigate } from "react-router-dom";

// export interface IBookingState {
//   name: string;
//   location: string;
//   address: string;
//   occupation: string;
//   email: string;
//   phoneNumber: string;
//   passportNumber: string;
//   roomId: string | null;
//   discountAmount: number;
//   checkIn: Date | null;
//   checkOut: Date | null;
//   numOfGuest: number;
//   adults: number;
//   children: number;
// }

const CreateHotel = () => {
  const [createHotel, { isLoading }] = useCreateHotelMutation();
  const { data: cities = [] } = useGetLocationQuery();
  const [images, setPhotos] = useState<File[]>([]);
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string | null>("");
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [coordinate, setCoordinate] = useState({ lat: 0, lng: 0 });
  const [description, setDescription] = useState<string>("");

  const { data: room = [] } = useGetAllRoomQuery("");

  const [active, setActive] = useState<number>(0);

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const body = {
    name,
    location,
    address,
    email,
    price,
    amenities,
    coordinate,
    description,
  };
  const handleCordinateChange = (e) => {
    const { name, value } = e.target;
    setCoordinate((prevState) => ({
      ...prevState, // Keep the previous state values
      [name]: value, // Update only lat or long based on input name
    }));
  };
  const navigate = useNavigate();
  console.log(body);

  const handleCreateBooking = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const formData = new FormData();
    images.forEach((images) => formData.append("hotelImages", images));
    formData.append("name", name);
    formData.append("email", email);
    formData.append("location", location);
    formData.append("address", address);
    formData.append("price", price.toString());
    formData.append("description", description);
    formData.append("geoLocation[coordinates][0]", coordinate.lat.toString());
    formData.append("geoLocation[coordinates][1]", coordinate.lng.toString());
    amenities.forEach((amenities) => formData.append("amenities", amenities));
    try {
      await createHotel(formData).unwrap();

      navigate("/hotels");
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
      console.log(error);

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
      }
    }
  };
  return (
    <Layout>
      <>
        <form
          style={{
            display: "flex",
            justifyContent: "center",
          }}>
          <Flex
            w={{ base: "100%", md: "90%", lg: "80%" }}
            direction={"column"}
            px={{ base: 15, md: 30, lg: 50 }}
            justify={"center"}
            bg={"#fbfdff"}
            py={30}
            style={{
              borderRadius: "12px",
            }}>
            <Stepper
              color='teal'
              radius='lg'
              active={active}
              onStepClick={setActive}>
              <Stepper.Step
                label='Hotel Basic Information'
                description='Baic information'>
                <Flex
                  w={"100%"}
                  justify={"center"}
                  p={8}
                  gap={8}
                  direction={"column"}>
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
                      value={images}
                      onChange={setPhotos}
                      label='Upload files'
                      placeholder='Upload files'
                      multiple
                    />

                    <Flex w={"100%"} align={"center"} gap={5}>
                      {images &&
                        images.map((image) => (
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
                                setPhotos(images.filter((e) => e !== image))
                              }>
                              <IconTrashFilled size={16} />
                            </Button>
                          </Box>
                        ))}
                    </Flex>
                  </Flex>
                  <Flex w={"100%"} gap={20}>
                    <TextInput
                      radius='md'
                      w={"80%"}
                      label='Name'
                      variant='filled'
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      classNames={{
                        input: classes.input,
                      }}
                    />
                    <Select
                      label='Location'
                      variant='filled'
                      radius='md'
                      w={"50%"}
                      onChange={setLocation}
                      searchable
                      limit={6}
                      value={location}
                      placeholder='Select Location'
                      data={cities.map((loc) => ({
                        label: loc.name,
                        value: loc._id,
                      }))}
                    />
                  </Flex>
                  <Flex w={"100%"} gap={20}>
                    <TextInput
                      radius='md'
                      w={"80%"}
                      label='Address'
                      variant='filled'
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      classNames={{
                        input: classes.input,
                      }}
                    />
                  </Flex>
                  <Flex w={"100%"} gap={20}>
                    <TextInput
                      radius='md'
                      w={"80%"}
                      variant='filled'
                      label='Email Address'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      classNames={{
                        input: classes.input,
                      }}
                    />
                    <TextInput
                      radius='md'
                      w={"80%"}
                      variant='filled'
                      label='Phone Number'
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      classNames={{
                        input: classes.input,
                      }}
                    />
                  </Flex>
                </Flex>
              </Stepper.Step>
              <Stepper.Step
                label='Other Information'
                description='Amenities & coordinates'>
                <Flex
                  w={"100%"}
                  justify={"center"}
                  p={8}
                  gap={8}
                  direction={"column"}>
                  <Flex>
                    <MultiSelect
                      w={"100%"}
                      label='Room Utilities'
                      variant='filled'
                      radius={"md"}
                      value={amenities}
                      onChange={setAmenities}
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
                    <TextInput
                      radius='md'
                      w={"80%"}
                      name='lat'
                      label='Price'
                      variant='filled'
                      onChange={(e) => setPrice(parseInt(e.target.value))}
                      value={price}
                      classNames={{
                        input: classes.input,
                      }}
                    />
                  </Flex>
                  <Flex w={"100%"} gap={20}>
                    <TextInput
                      radius='md'
                      w={"80%"}
                      name='lat'
                      label='Latitude'
                      variant='filled'
                      onChange={handleCordinateChange}
                      value={coordinate.lat}
                      classNames={{
                        input: classes.input,
                      }}
                    />
                    <TextInput
                      radius='md'
                      name='lng'
                      w={"80%"}
                      label='Longitude'
                      variant='filled'
                      onChange={handleCordinateChange}
                      value={coordinate.lng}
                      classNames={{
                        input: classes.input,
                      }}
                    />
                  </Flex>
                  <Flex w={"100%"} gap={20}>
                    <Textarea
                      w={"100%"}
                      resize='vertical'
                      variant='filled'
                      label='Description'
                      value={description}
                      onChange={(e) => setDescription(e.currentTarget.value)}
                      placeholder='Hotel Description'
                      classNames={{
                        input: classes.input,
                      }}
                    />
                  </Flex>
                </Flex>
              </Stepper.Step>

              <Stepper.Completed>
                <Flex w={"100%"} h={"30vh"} justify={"center"} align={"center"}>
                  <Text fz={20} fw={500} ta={"center"}>
                    Completed
                    <br />
                    Return back to booking page
                  </Text>
                </Flex>
              </Stepper.Completed>
            </Stepper>

            <Group justify='center' mt='xl'>
              <Button radius={"md"} variant='default' onClick={prevStep}>
                Back
              </Button>
              {active === 1 ? (
                <Button
                  onClick={handleCreateBooking}
                  bg={"teal"}
                  radius={"md"}
                  loading={isLoading}>
                  Create Booking
                </Button>
              ) : (
                <Button radius={"md"} onClick={nextStep}>
                  Next step
                </Button>
              )}
            </Group>
          </Flex>
        </form>
      </>
    </Layout>
  );
};

export default CreateHotel;
