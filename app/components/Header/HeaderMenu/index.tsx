import {
  Box,
  Button,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import arrowDown from "app/assets/arrowDown.svg";
const HeaderMenu = ({
  items,
  title,
  setSelectedItem,
}: {
  items: any;
  title: string;
  setSelectedItem: any;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Menu onOpen={onOpen} onClose={onClose}>
      <MenuButton as={Button}>
        <HStack spacing={"4px"} justifyContent={"center"} alignItems={"center"}>
          <Text>{title}</Text>
          <Box
            transform={`rotate(${isOpen ? "180deg" : "0"})`}
            transition={"all 200ms"}
          >
            <Image width={"16px"} height={"16px"} src={arrowDown} />
          </Box>
        </HStack>
      </MenuButton>
      <MenuList
        bgColor={"white"}
        border={"1px solid gainsboro"}
        p={"4px "}
        zIndex={99}
        borderRadius={"8px"}
      >
        {items.map((cli: any, index: number) => {
          return (
            <MenuItem
              bgColor={"white"}
              _hover={{ bgColor: "#C7D3F7" }}
              cursor={"pointer"}
              borderRadius={"4px"}
              transition={"all 200ms"}
              px={"8px"}
              key={index}
            >
              <Text onClick={() => setSelectedItem(index)}>{cli}</Text>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};
export default HeaderMenu;
