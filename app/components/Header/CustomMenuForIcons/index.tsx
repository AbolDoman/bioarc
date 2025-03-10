import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  forwardRef,
} from "@chakra-ui/react";
import { ReactNode, memo } from "react";

const MenuContent = memo(({ sampleText }: { sampleText: string }) => (
  <MenuItem>{sampleText}</MenuItem>
));
MenuContent.displayName = "MenuContent";

const IconButton = forwardRef(
  ({ children, ...props }: { children: ReactNode }, ref) => (
    <Button
      ref={ref}
      variant="unstyled"
      minW="auto"
      p="0"
      height="auto"
      lineHeight="normal"
      {...props}
    >
      {children}
    </Button>
  )
);
IconButton.displayName = "IconButton";

const CustomMenuForIcons = memo(
  ({ icon, sampleText }: { icon: ReactNode; sampleText: string }) => {
    return (
      <Menu placement="bottom" closeOnSelect={true} strategy="fixed">
        <MenuButton as={IconButton}>{icon}</MenuButton>
        <MenuList
          bgColor={"white"}
          minW={"300px"}
          minH={"150px"}
          border={"1px solid gainsboro"}
          p={"8px 16px"}
          borderRadius={"8px"}
          zIndex={10}
        >
          <MenuContent sampleText={sampleText} />
        </MenuList>
      </Menu>
    );
  }
);

CustomMenuForIcons.displayName = "CustomMenuForIcons";

export default CustomMenuForIcons;
