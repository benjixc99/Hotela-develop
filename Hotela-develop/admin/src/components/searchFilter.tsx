import React, { ReactElement } from "react";
import { Button, Flex, TextInput } from "@mantine/core";
import { Link } from "react-router-dom";

interface ISearchProps {
  PlaceHolder: string;
  BtnName: string;
  IconName: ReactElement;
  children: ReactElement;
  link: string;
  onchange: React.ChangeEventHandler<HTMLInputElement>;
}
const SearchFilter: React.FC<ISearchProps> = ({
  PlaceHolder,
  IconName,
  BtnName,
  children,
  link,
  onchange,
}) => {
  return (
    <form>
      <Flex
        w={"100%"}
        h={"5vh"}
        justify={"space-between"}
        gap={4}
        align={"center"}>
        {children}

        <Flex w={"50%"} align={"center"}>
          <TextInput
            w={"100%"}
            onChange={onchange}
            styles={{
              input: {
                background: "#ffffff",
              },
            }}
            fz={18}
            fw={500}
            py={8}
            leftSection={IconName}
            variant='filled'
            radius={"10px 0px 0px 10px"}
            placeholder={PlaceHolder}
          />
          <Button type='submit' radius={"0px 10px 10px 0px"}>
            {IconName}
          </Button>
        </Flex>
        <Link to={link}>
          <Button radius={"md"}>{BtnName}</Button>
        </Link>
      </Flex>
    </form>
  );
};

export default SearchFilter;
