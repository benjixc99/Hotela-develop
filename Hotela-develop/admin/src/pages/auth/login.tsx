import { useState } from "react";
import { useAppDispatch } from "../../redux/store";
import {
  Box,
  Button,
  Flex,
  Image,
  InputLabel,
  Text,
  TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import imgLogo from "../../assets/img/page-3.png";
import { IconCheck, IconLock, IconMail, IconX } from "@tabler/icons-react";
import { useLoginMutation } from "../../redux/RTK_Query/authSlice";
import { authenticate } from "../../redux/authRedux/appSLice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginMutation, { isLoading }] = useLoginMutation();

  const navigate = useNavigate();
  const body = {
    email,
    password,
  };

  const loginForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      dispatch(authenticate(await loginMutation(body).unwrap()));
      navigate("/dashboard");
      notifications.show({
        title: "Logged in successfully",
        message: `Welcome enjoy your engagement on bookinito`,
        icon: <IconCheck size={25} />,
        color: "#006d77",
        withCloseButton: true,
        autoClose: 4000,
        bg: "#e7fefd",
        radius: "lg",
      });
      console.log("Login successful");
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
      }
      console.log(error);
    }
  };
  return (
    <Flex
      w={"100%"}
      h={"100vh"}
      px={14}
      bg={"#004346"}
      c={"#e2e8f0"}
      py={20}
      justify={"center"}
      direction={"column"}
      align={"center"}>
      <Flex
        w={{ base: "100%", sm: "60%", md: "35%", lg: "32%" }}
        h={"fit-content"}
        p={14}
        direction={"column"}
        bg={"#E7FEFD"}
        style={{
          borderRadius: 12,
        }}>
        <Text ta={"center"} fz={20} fw={700} c='#172a3a'>
          Sign In
        </Text>
        <form
          onSubmit={loginForm}
          style={{
            width: "100%",
          }}>
          <Flex w={"100%"} direction={"column"} gap={4} pb={4}>
            <InputLabel fz={17} fw={600} c='#172a3a'>
              Email
            </InputLabel>
            <TextInput
              w={"100%"}
              fz={20}
              fw={500}
              py={8}
              leftSection={<IconMail fontSize={18} />}
              variant='filled'
              radius='md'
              placeholder='Email Address'
              onChange={(e) => setEmail(e.target.value)}
            />
          </Flex>
          <Flex w={"100%"} direction={"column"} gap={4} pb={8}>
            <InputLabel fz={17} fw={600} c='#172a3a'>
              Password
            </InputLabel>
            <TextInput
              w={"100%"}
              type='password'
              fz={20}
              py={8}
              fw={500}
              leftSection={<IconLock fontSize={18} />}
              variant='filled'
              radius='md'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </Flex>

          <Button w={"100%"} type='submit' bg={"#004346"} p={2} radius={"md"}>
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
      </Flex>
    </Flex>
  );
};

export default Login;
