import { Flex } from "@mantine/core";
import PopularDestination from "../../components/features/dashboard/PopularDestination";
import HostelLovedByGuest from "../../components/features/dashboard/HostelLovedByGuest";
import DashBoardMain from "../../components/features/dashboard/DashBoardMain";

const Dashboard = () => {
  return (
    <Flex w="100%" direction="column">
      <DashBoardMain />
      <PopularDestination />
      <HostelLovedByGuest />
    </Flex>
  );
};

export default Dashboard;
