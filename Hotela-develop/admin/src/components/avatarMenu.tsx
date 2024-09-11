import { forwardRef } from "react";
import { IconChevronRight, IconSettings, IconTrash } from "@tabler/icons-react";
import {
  Group,
  Avatar,
  Text,
  Menu,
  UnstyledButton,
  rem,
  Box,
} from "@mantine/core";

interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, email, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        padding: "var(--mantine-spacing-md)",
        color: "var(--mantine-color-text)",
        borderRadius: "var(--mantine-radius-sm)",
      }}
      {...others}>
      <Group>
        <Avatar src={image} radius='xl' />

        <div style={{ flex: 1 }}>
          <Text size='sm' fw={500}>
            {name}
          </Text>

          <Text c='dimmed' size='xs'>
            {email}
          </Text>
        </div>

        {icon || <IconChevronRight size='1rem' />}
      </Group>
    </UnstyledButton>
  ),
);

const AvaterMenu = ({
  name,
  image,
  email,
  onclick,
}: {
  name: string;
  image: string;
  email: string;
  onclick: () => void;
}) => {
  return (
    <Box display={{ base: "none", md: "block", lg: "block" }}>
      <Menu withArrow>
        <Menu.Target>
          <UserButton image={image} name={name} email={email} />
        </Menu.Target>
        {/* ... menu items */}

        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item
            leftSection={
              <IconSettings style={{ width: rem(14), height: rem(14) }} />
            }>
            Profile
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconSettings style={{ width: rem(14), height: rem(14) }} />
            }>
            Notificaion
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item
            onClick={onclick}
            color='red'
            leftSection={
              <IconTrash style={{ width: rem(14), height: rem(14) }} />
            }>
            SignOut
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
};

export default AvaterMenu;
