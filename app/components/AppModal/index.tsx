import { Box, Flex } from "@chakra-ui/react";
import React, { useCallback, useMemo } from "react";

const AppModal = React.memo((props: any) => {
  const {
    children,
    isVisibleSearch,
    isOpen,
    onClose,
    onOverlayClick,
    MobileFullPage,
    maxWidth,
    height,
    minW,
    boxId,
    padding,
  } = props;
  const modalStyles = useMemo(
    () => ({
      borderRadius: "12px",
      minWidth: minW || "60vw",
      maxWidth: maxWidth ? maxWidth : "none",
      width: "auto",
      height: height || "auto",
      padding: padding ? "0" : "16px 24px",
      overflow: "auto",
    }),
    [MobileFullPage, minW, maxWidth, padding]
  );

  const handleContentClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);
  const handleOverlayClick = () => {
    onClose();
  };

  return (
    <Box display={isOpen ? "block" : "none"} position={"absolute"}>
      <Box
        w={"100vw"}
        h="100vh"
        bgColor={"black"}
        position={"fixed"}
        zIndex={"9999"}
        top={"0"}
        right={"0"}
        opacity={"50%"}
        onClick={onOverlayClick}
      />
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        position={"fixed"}
        top={isVisibleSearch ? "72px" : "0"}
        right={"0"}
        zIndex={"9999"}
        w="100vw"
        h="100vh"
        onClick={onOverlayClick || handleOverlayClick}
      >
        <Box
          id={boxId}
          onClick={handleContentClick}
          bgColor={"white"}
          {...modalStyles}
        >
          {children}
        </Box>
      </Flex>
    </Box>
  );
});
AppModal.displayName = "AppModal";
export default AppModal;
