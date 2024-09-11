/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Flex, Select, SimpleGrid } from "@mantine/core";
import Layout from "../../components/layout";
import StaffCard from "../../components/staffCard";
import React, { useState } from "react";
import SearchFilter from "../../components/searchFilter";
import { IconSearch } from "@tabler/icons-react";
import { useGetAllUsersQuery } from "../../redux/RTK_Query/authSlice";

const Staffs: React.FC = () => {
  const [role, setRole] = useState<string>("");
  const { data: users = [] } = useGetAllUsersQuery(role);
  return (
    <Layout>
      <Flex w={"100%"} gap={10} direction={"column"}>
        <SearchFilter
          PlaceHolder='Search staff name'
          IconName={<IconSearch fontSize={18} />}
          BtnName='New Staff'>
          <>
            <Select
              variant='default'
              bg={"#ffffff"}
              radius={"md"}
              placeholder='Roles'
              data={["All", "Super-Admin", "Receptionist"]}
            />
          </>
        </SearchFilter>
        <SimpleGrid cols={{ base: 2, md: 3, lg: 4 }} spacing={8}>
          {users.map((user) => (
            <>
              <StaffCard
                key={user._id}
                //@ts-expect-error
                profile={user.fullname
                  .match(/(\b\S)?/g)
                  .join("")
                  .toUpperCase()}
                fullname={user.fullname}
                email={user.email}
                role={user.role}
              />
            </>
          ))}
        </SimpleGrid>
      </Flex>
    </Layout>
  );
};

export default Staffs;
