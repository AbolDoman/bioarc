import { Box, HStack } from "@chakra-ui/react";
import { CircleX } from "lucide-react";
// import { useIsMobile } from 'app/utils/hook';
export function AppDrawer(props: any) {
  const {
    in: sliderOpenening,
    children,
    secondPos,
    onClose,
    realPos,
    drawerId,
    transitionTime,
    pt,
  } = props;

  return (
    <>
      <Box
        id={drawerId}
        position={"fixed"}
        bgColor={"white"}
        top={"0"}
        right={"0"}
        width={"100%"}
        height={"100vh"}
        overflow={"auto"}
        transition={`all ${transitionTime || 500}ms`}
        zIndex={9999}
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"start"}
        p={"12px 24px"}
        style={{
          transform: `translateX(${sliderOpenening ? realPos : secondPos})`,
        }}
      >
        <HStack justifyContent={"end"} width={"100%"}>
          <CircleX onClick={onClose} />
        </HStack>
        <Box pt={pt || "12px"} width={"100%"} overflow={"auto"}>
          {children}
        </Box>
      </Box>
    </>
  );
}
