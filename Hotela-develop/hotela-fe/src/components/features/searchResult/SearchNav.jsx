/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Divider,
  Stack,
  Title,
  Group,
  useMantineTheme,
  RangeSlider,
  Text,
  Image,
  Anchor,
  Select,
  Radio,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import { DatePickerInput } from "@mantine/dates";
import googleMap from "../../../assets/googleMap.jpg";
import { cities } from "../../../cities";
import { Link, NavLink } from "react-router-dom";

function SearchNav({
  onClose,
  handleSubmit,
  location,
  onChange1,
  checkIn,
  onChange2,
  checkOut,
  onChange3,
  guest,
  onChange4,
  price,
  setPrice,
  rating,
  setRating,
}) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const [selectedStar, setSelectedStar] = useState(null);

  const handleStarClick = (star) => {
    setSelectedStar(star);
  };

  // Set the nextDay null because it brings error if i set as checkIn
  let nextDay = null;

  if (checkIn instanceof Date && !isNaN(checkIn)) {
    // Add one day to the checkIn date
    nextDay = new Date(checkIn);
    nextDay.setDate(checkIn.getDate() + 1);
  }
  return (
    <Box c={"#000814"}>
      <Box
        style={{
          backgroundColor: "#f8f9fa",
          padding: theme.spacing.md,
          boxShadow: theme.shadows.sm,
          margin: -13,
        }}
        pr={{ md: 60 }}>
        <Group justify='space-between' mb='md'>
          <IoArrowBack
            style={{ display: isMobile ? "none" : "block" }}
            size={30}
            onClick={onClose}
          />
          <Title order={3} style={{ flexGrow: 1, textAlign: "center" }}>
            Your Search
          </Title>
        </Group>

        <Box
          bd={"1px solid #DFDFDF"}
          h={200}
          style={{
            borderRadius: "1rem",
            cursor: "pointer",
          }}
          my={10}>
          <NavLink
            to={`/map?location=${location}&guest=${guest}&checkIn=${checkIn}&checkOut=${checkOut}`}>
            <Box h={"75%"}>
              <Image
                src={googleMap}
                h={"100%"}
                style={{
                  borderTopLeftRadius: "1rem",
                  borderTopRightRadius: "1rem",
                }}
              />
            </Box>
            <Stack h={"25%"} align='center' justify='center'>
              <Anchor target='_blank' ta={"center"} fz={13} fw={600}>
                View on a map
              </Anchor>
            </Stack>
          </NavLink>
        </Box>

        <form onSubmit={handleSubmit}>
          <Stack spacing='md'>
            <Select
              label={"Location"}
              data={cities}
              radius={"md"}
              value={location}
              limit={5}
              onChange={onChange1}
              searchable
              allowDeselect={false}
            />
            <DatePickerInput
              valueFormat='YYYY MMM DD'
              label={"CheckIn"}
              radius={"md"}
              minDate={new Date()}
              value={new Date(checkIn)}
              onChange={onChange2}
            />
            <DatePickerInput
              valueFormat='YYYY MMM DD'
              label={"CheckOut"}
              radius={"md"}
              minDate={nextDay}
              value={new Date(checkOut)}
              onChange={onChange3}
              disabled={!checkIn} // Disable if checkIn is not set
            />
            <Select
              label={"Guest"}
              radius={"md"}
              data={["1", "2", "3", "4", "5"]}
              value={guest}
              onChange={onChange4}
            />
            <Button type='submit' bg={"#1668e3"} fullWidth radius={"xl"}>
              Search
            </Button>
          </Stack>
        </form>
      </Box>

      <Divider mb='md' />

      <Stack spacing='md' gap={5}>
        <Title order={4}>Your budget (Per night)</Title>
        <Group>
          <Text>£{price[0]}</Text> - <Text>£{price[1]}</Text>
        </Group>
        <RangeSlider
          size='md'
          showLabelOnHover={false}
          min={1}
          max={10000}
          step={1}
          value={price}
          onChange={setPrice}
          onChangeEnd={onClose}
        />
      </Stack>

      <Divider my='md' />

      <Stack spacing='md'>
        <Title order={4}>Property Class</Title>
        <Radio.Group display={"none"} value={rating} onChange={setRating}>
          <Radio value={""} id='All' />

          {["5", "4", "3", "2", "1"].map((star, index) => (
            <Radio
              key={index}
              id={star}
              value={star}
              label={star}
              defaultValue={""}
            />
          ))}
        </Radio.Group>
        <Group>
          {["All", "5", "4", "3", "2", "1"].map((star, index) => (
            <label
              key={index}
              htmlFor={star}
              size='lg'
              onClick={() => handleStarClick(star)}
              style={{
                display: "flex",
                padding: "6px 12px",
                borderRadius: "9px",
                backgroundColor:
                  selectedStar === star ? "rgb(22, 104, 227)" : "#6c6f73",
                color: "white",
                alignItems: "center",
                cursor: "pointer",
                transition: "background-color 0.4s ease",
              }}>
              {star === "All" ? (
                "All"
              ) : (
                <AiFillStar
                  style={{
                    marginRight: 4,
                    color: selectedStar === star ? "yellow" : "white",
                  }}
                />
              )}
              {star !== "All" && star}
            </label>
          ))}
        </Group>
      </Stack>
    </Box>
  );
}

SearchNav.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SearchNav;
