import { Button, Flex, Group } from "@mantine/core";
import Layout from "../../components/layout";
import { NavLink, Outlet } from "react-router-dom";

const Report = () => {
  type NavLinkRenderProps = {
    isActive: boolean;
  };
  return (
    <Layout>
      <>
        <Flex
          w={"100%"}
          flex={1}
          direction={"column"}
          align={"center"}
          gap={20}>
          <Group justify='center' gap='md'>
            <NavLink
              to={"/reports/revenue"}
              style={({ isActive }: NavLinkRenderProps) => {
                return {
                  background: isActive ? "#008080" : "#228be6",
                  borderRadius: 12,
                };
              }}>
              <Button variant='filled' radius={"md"} bg={"transparent"}>
                Revenue Report
              </Button>
            </NavLink>
            <NavLink
              to={"/reports/bookings"}
              style={({ isActive }: NavLinkRenderProps) => {
                return {
                  background: isActive ? "#008080" : "#228be6",
                  borderRadius: 12,
                };
              }}>
              <Button variant='filled' radius={"md"} bg={"transparent"}>
                Booking Report
              </Button>
            </NavLink>
            <NavLink
              to={"/reports/users"}
              style={({ isActive }: NavLinkRenderProps) => {
                return {
                  background: isActive ? "#008080" : "#228be6",
                  borderRadius: 12,
                };
              }}>
              <Button variant='filled' radius={"md"} bg={"transparent"}>
                Users Report
              </Button>
            </NavLink>
          </Group>
          <Outlet />
        </Flex>
      </>
    </Layout>
  );
};

export default Report;
