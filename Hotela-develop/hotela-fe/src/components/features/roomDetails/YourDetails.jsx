/* eslint-disable react/prop-types */
import { Box, Stack, TextInput, Title, Select } from "@mantine/core";
import { useState } from "react";

function YourDetails({ data }) {
  const [selectedTraveler, setSelectedTraveler] = useState(
    `${data.lastName} ${data.firstName}`,
  );
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
  const [email, setEmail] = useState(data.email);
  const [isEditable, setIsEditable] = useState(false);

  const handleTravelerChange = (value) => {
    setSelectedTraveler(value);
    if (value === `${data.lastName} ${data.firstName}`) {
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setIsEditable(false);
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
      setIsEditable(true);
    }
  };

  return (
    <Box c={"#000814"}>
      <Title order={2}>Who is checking in?</Title>
      <Box my='sm'>
        <Title order={4} mb='sm'>
          Step 1: Your details
        </Title>
        <form>
          <Stack gap='5px'>
            <Select
              w={{ base: "100%", sm: "50%" }}
              label='Traveler name'
              value={selectedTraveler}
              data={[
                {
                  group: "New Traveler",
                  items: [
                    { value: "Add new traveler", label: "Add new traveler" },
                  ],
                },
                {
                  group: "Select from my account",
                  items: [
                    {
                      value: `${data.lastName} ${data.firstName}`,
                      label: `${data.lastName} ${data.firstName}`,
                    },
                  ],
                },
              ]}
              onChange={handleTravelerChange}
            />
            <TextInput
              label='First name'
              w={{ base: "100%", sm: "70%" }}
              placeholder='Enter your first name'
              value={firstName}
              onChange={(event) => setFirstName(event.currentTarget.value)}
              disabled={!isEditable}
              required
              withAsterisk={false}
            />
            <TextInput
              label='Last name'
              w={{ base: "100%", sm: "70%" }}
              placeholder='Enter your last name'
              value={lastName}
              onChange={(event) => setLastName(event.currentTarget.value)}
              disabled={!isEditable}
              required
              withAsterisk={false}
            />
            <TextInput
              label='Email'
              w={{ base: "100%", sm: "70%" }}
              placeholder='Enter your email'
              type='email'
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
              disabled={!isEditable}
              required
              withAsterisk={false}
            />
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default YourDetails;
