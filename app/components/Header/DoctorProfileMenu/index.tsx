import {
  Box,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useSubmit } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";

const StatusIndicator = memo(() => (
  <Box
    width={"10px"}
    height={"10px"}
    borderRadius={"100%"}
    bgColor={"#4CAF50"}
    pos={"absolute"}
    zIndex={3}
    border={"0.5px solid white"}
  />
));
StatusIndicator.displayName = "StatusIndicator";

const ProfileMenuItem = memo(
  ({
    children,
    onClick,
    mt,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    mt?: string;
  }) => (
    <MenuItem
      mt={mt}
      bgColor={"white"}
      _hover={{ bgColor: "#C7D3F7" }}
      cursor={"pointer"}
      borderRadius={"4px"}
      transition={"all 200ms"}
      px={"8px"}
      onClick={onClick}
    >
      <Text cursor={"pointer"}>{children}</Text>
    </MenuItem>
  )
);
ProfileMenuItem.displayName = "ProfileMenuItem";

const DoctorProfileMenu = memo(({ data }: { data: any }) => {
  const submit = useSubmit();
  const { t } = useTranslation();

  const handleLogout = useCallback(() => {
    submit(
      { as: "" },
      {
        action: "/logout",
        method: "post",
        encType: "application/x-www-form-urlencoded",
      }
    );
  }, [submit]);

  const profileImage = data?.image;

  return (
    <Box
      width={"40px"}
      height={"40px"}
      borderRadius={"100%"}
      border={"1px solid white"}
      zIndex={2}
    >
      <StatusIndicator />

      <Menu placement="bottom-end" gutter={8}>
        <MenuButton
          as={Button}
          aria-label="User menu"
          p={0}
          bg="transparent"
          _hover={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
        >
          <Image
            src={profileImage}
            borderRadius={"100%"}
            alt="Doctor profile"
            boxSize="100%"
            objectFit="cover"
          />
        </MenuButton>

        <MenuList
          bgColor={"white"}
          border={"1px solid gainsboro"}
          p={"4px"}
          borderRadius={"8px"}
          shadow="md"
        >
          <ProfileMenuItem>
            {t("profile")} {data?.name}
          </ProfileMenuItem>

          <ProfileMenuItem onClick={handleLogout} mt={"10px"}>
            {t("logout")}
          </ProfileMenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
});

DoctorProfileMenu.displayName = "DoctorProfileMenu";

export default DoctorProfileMenu;
