import { useState } from "react";
import {
  Box,
  Button,
  Group,
  Title,
  Text,
  TextInput,
  Checkbox,
  useMantineTheme,
  Flex,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IoMdCheckmarkCircle, IoMdCloseCircle } from "react-icons/io";
import { useRegisterMutation } from "../../Store/Slices/authenticationSlice";
import { authenticate } from "../../Store/auth/authSlice";
import { useDispatch } from "react-redux";

function SignUp() {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 767px)"); // Adjusted for mobile view

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation(); // SignUP Mutation
  console.log(error);

  const handleEmailChange = (event) => {
    setEmail(event.currentTarget.value);
    if (error === "Invalid email address") {
      setError("");
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.currentTarget.value);
    if (error === "Passwords do not match") {
      setError("");
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.currentTarget.value);
    if (error === "Passwords do not match") {
      setError("");
    }
  };

  const handleAgreeChange = (event) => {
    setAgree(event.currentTarget.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!validateEmail(email)) {
        setError("Invalid email address");
      } else if (password !== confirmPassword) {
        setError("Passwords do not match");
      } else if (!agree) {
        setError("You must agree to the terms and conditions");
      } else {
        dispatch(
          authenticate(
            await register({
              firstName,
              lastName,
              email,
              password,
            }).unwrap()
          )
        );
        navigate("/ConfirmAccount");
        notifications.show({
          title: "Successfully",
          message: "Verification code was sent to your email",
          color: "teal",
          radius: "lg",
          icon: <IoMdCheckmarkCircle fontSize={18} />,
        });
      }
    } catch (err) {
      notifications.show({
        message: `${err.data}`,
        color: "red",
        radius: "lg",
        icon: <IoMdCloseCircle fontSize={18} />,
      });
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: !isMobile && "20px",
      }}
    >
      <Box
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: !isMobile && "0 4px 12px rgba(0, 0, 0, 0.1)", // Consistent shadow
          backgroundColor: theme.white, // Background color to make the shadow effect more visible
        }}
      >
        <Title
          order={1}
          fz={"2.25rem"}
          fw={700}
          c={theme.colors.blue[6]}
          ta="center"
          mb="md"
        >
          Sign Up
        </Title>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <Group grow>
            <TextInput
              label="First Name"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.currentTarget.value)}
              required
              withAsterisk={false}
              minLength={3}
            />
            <TextInput
              label="Last Name"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.currentTarget.value)}
              required
              withAsterisk={false}
              minLength={3}
            />
          </Group>
          <TextInput
            label="Email Address"
            placeholder="Enter your email address"
            value={email}
            onChange={handleEmailChange}
            required
            withAsterisk={false}
          />
          <TextInput
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            withAsterisk={false}
            minLength={8}
          />
          <TextInput
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            withAsterisk={false}
            minLength={8}
          />
          <Checkbox
            label="I agree that all the information provided is accurate and true."
            checked={agree}
            onChange={handleAgreeChange}
            required
          />
          {error && (
            <Text c="red" fz={15} ta={"center"}>
              {error}
            </Text>
          )}
          <Button
            type="submit"
            h={40}
            fz={17}
            loading={isLoading}
            radius="xl"
            disabled={!agree}
            mt="md"
          >
            Sign Up
          </Button>
          <Flex w="100%" justify="center" align="center" mt="10px">
            <Text c="#000814">Already have an account?</Text>
            <Button
              component={Link}
              to="/login"
              variant="subtle"
              style={{
                height: "30px",
                fontSize: "16px",
                borderRadius: "15px",
                marginLeft: "10px",
                padding: "0 10px",
              }}
            >
              Login
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}

export default SignUp;
