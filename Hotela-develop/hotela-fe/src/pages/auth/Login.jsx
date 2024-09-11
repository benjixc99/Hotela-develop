import { useState } from "react";
import {
  Box,
  Button,
  TextInput,
  Title,
  useMantineTheme,
  Text,
  Flex,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Link, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { IoMdCheckmarkCircle, IoMdCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { authenticate } from "../../Store/auth/authSlice";
import { useLoginMutation } from "../../Store/Slices/authenticationSlice";
function Login() {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signIn, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEmailChange = (event) => {
    setEmail(event.currentTarget.value);
    if (error) {
      setError("");
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.currentTarget.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!validateEmail(email)) {
        setError("Invalid email address");
      } else {
        dispatch(
          authenticate(
            await signIn({
              email,
              password,
            }).unwrap()
          )
        );

        notifications.show({
          title: "Logged In Successfully",
          radius: "lg",
          message: "",
          color: "teal",
          icon: <IoMdCheckmarkCircle fontSize={18} />,
        });
        navigate("/");
      }
    } catch (err) {
      notifications.show({
        title: "Error",
        message: `${err.data}`,
        radius: "lg",
        color: "red",
        icon: <IoMdCloseCircle fontSize={18} />,
      });

      console.log(err);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Box
      c={"#000814"}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: !isMobile && "90vh",
        cursor: "default",
        padding: !isMobile && "20px",
      }}
    >
      <Box
        c={theme.colors.dark[9]}
        pb={30}
        py={25}
        w={400}
        px={30}
        style={{
          borderRadius: "12px",
          width: "100%",
          boxShadow: !isMobile && "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow with larger spread
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
          Login
        </Title>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <TextInput
            label="Email Address"
            placeholder="Enter your email address"
            value={email}
            onChange={handleEmailChange}
            error={error}
            required
            withAsterisk={false}
            data-autofocus
          />
          <TextInput
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            withAsterisk={false}
          />

          <Button
            type="submit"
            loading={isLoading}
            h={40}
            fz={18}
            radius="xl"
            fullWidth
            mt="md"
          >
            Log in
          </Button>

          {error && (
            <Text c="red" fz={15} ta={"center"} mt="md">
              {error}
            </Text>
          )}
        </form>

        <Link to={"/forgotPassword"} style={{ textDecoration: "none" }}>
          <Text
            fz={15}
            c={"#000814"}
            ta={"center"}
            fw={600}
            mt="md"
            style={{ cursor: "pointer" }}
          >
            Forgot Password?
          </Text>
        </Link>
        <Flex w="100%" justify="center" align="center" mt="12px">
          <Text c="#000814">Don't have an account?</Text>
          <Button
            component={Link}
            to="/signup"
            variant="subtle"
            style={{
              height: "30px",
              fontSize: "16px",
              borderRadius: "15px",
              marginLeft: "10px",
              padding: "0 10px",
            }}
          >
            Sign Up
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

export default Login;
