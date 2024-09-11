import {
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  Loader,
  Menu,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, logOut } from "../Store/auth/authSlice";
import { notifications } from "@mantine/notifications";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import { useGetSingleUserQuery } from "../Store/Slices/authenticationSlice";
function Header() {
  const theme = useMantineTheme();
  const user = useSelector(currentUser);
  const { data = {}, isLoading } = useGetSingleUserQuery(user?.userInfo?._id);

  const dispatch = useDispatch();
  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logOut());
    notifications.show({
      title: "Logged Out",
      radius: "lg",
      message: "",
      color: "teal",
      icon: <IoMdCheckmarkCircle fontSize={18} />,
    });
  };

  return (
    <>
      <Flex h={60} align='center' justify='space-between'>
        <NavLink to='/' style={{ textDecoration: "none" }}>
          <Text order={2} fw={700} fz={25} c={theme.colors.blue[6]}>
            Hotela
          </Text>
        </NavLink>
        {user ? (
          <Menu shadow='md' width={200}>
            {isLoading ? (
              <Loader color='blue' type='dots' />
            ) : (
              <Menu.Target>
                <Avatar
                  size={"md"}
                  radius={"lg"}
                  name={`${data.firstName} ${data.lastName}`}
                  color='initials'
                />
              </Menu.Target>
            )}
            <Menu.Dropdown
              w={{ lg: "25%!important", xl: "30%!important" }}
              style={{
                borderRadius: "18px",
              }}>
              <Flex w={"100%"} align={"center"} pr={10}>
                <Flex direction={"column"} py={4} w={"100%"}>
                  <Menu.Label fz={16} c={"#000814"}>
                    Hi, {data?.firstName}
                  </Menu.Label>
                  <Menu.Label fz={13} c={"#000814"}>
                    {data.email}
                  </Menu.Label>
                </Flex>
                {data.isVerified === true && (
                  <Tooltip
                    label='Verified!'
                    color='#eaf4ff'
                    style={{
                      color: "#000814",
                    }}
                    position='left-start'
                    offset={{ mainAxis: -8, crossAxis: -30 }}
                    transitionProps={{ transition: "fade-up", duration: 300 }}>
                    <Box bg={"transparent"} w={"fit-content"} h={"fit-content"}>
                      <MdVerified color='blue' fontSize={25} />
                    </Box>
                  </Tooltip>
                )}
              </Flex>
              <Flex direction={"column"} py={4} w={"100%"}>
                <Menu.Label c={"#000814"}>Hotela points </Menu.Label>
                <Menu.Label fz={20} fw={500} c={"#000814"}>
                  {data.points}
                  Hp
                </Menu.Label>
              </Flex>
              <Menu.Label c={"#000814"}>Application</Menu.Label>

              <Link to={"/profile"}>
                <Menu.Item leftSection={""}>Profile</Menu.Item>
              </Link>
              <Link to={"/favourite"}>
                <Menu.Item leftSection={""}>List of favorites</Menu.Item>
              </Link>
              <Link to={"/bookinghistory"}>
                <Menu.Item leftSection={""}>Booking History</Menu.Item>
              </Link>

              <Menu.Divider />

              <Menu.Item color='red' leftSection={""} onClick={handleLogOut}>
                LogOut
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <Group>
            <NavLink to='/signup' style={{ textDecoration: "none" }}>
              <Button variant='outline' radius='xl'>
                Sign up
              </Button>
            </NavLink>
            <NavLink to='/login' style={{ textDecoration: "none" }}>
              <Button variant='filled' radius='xl'>
                Login
              </Button>
            </NavLink>
          </Group>
        )}
      </Flex>
    </>
  );
}

export default Header;
