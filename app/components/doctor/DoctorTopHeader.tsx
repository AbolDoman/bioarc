import { Box, Button, HStack, Skeleton, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState, memo, useMemo } from "react";
import { converting } from "../../helper";
import moment from "moment-jalaali";
import { Tag } from "lucide-react";
import { useTranslation } from "react-i18next";

const ConsiderationTag = memo(({ text }: { text: string }) => (
  <Box
    p={"3px 8px"}
    borderRadius={"16px"}
    bgColor={"#FEF3F3"}
    fontSize={"14px"}
  >
    {text}
  </Box>
));
ConsiderationTag.displayName = "ConsiderationTag";

const CurrentTime = memo(() => {
  const [currentTime, setCurrentTime] = useState(moment());
  const { t, i18n } = useTranslation();

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format date based on language
  const formattedDate = useMemo(() => {
    const dateFormat = currentTime.format("dddd jD jMMMM");
    return i18n.language === "en" ? dateFormat : converting(dateFormat);
  }, [currentTime, i18n.language]);

  return (
    <HStack align="center" spacing={"16px"}>
      <Text color={"#636366"}>
        {t("timeLabel")} {currentTime.format("HH:mm:ss")}
      </Text>
      <Text color={"#636366"}>{formattedDate}</Text>
    </HStack>
  );
});
CurrentTime.displayName = "CurrentTime";

// Tag button component
const TagButton = memo(({ label }: { label: string }) => (
  <Button
    bgColor={"#DEF5FE"}
    transition={"all 100ms"}
    _active={{ bgColor: "aqua" }}
    borderRadius={"6px"}
    p={"8px 16px"}
    _hover={{ opacity: "80%" }}
    leftIcon={<Tag size={"18px"} />}
  >
    {label}
  </Button>
));
TagButton.displayName = "TagButton";

// Considerations list with loading state
const ConsiderationsList = memo(
  ({
    considerations,
    isLoading,
  }: {
    considerations: string[] | undefined;
    isLoading: boolean;
  }) => {
    if (isLoading) {
      return (
        <VStack spacing="4px" align="start">
          <Skeleton height="22px" width="80px" borderRadius="16px" />
          <Skeleton height="22px" width="120px" borderRadius="16px" />
        </VStack>
      );
    }

    if (!considerations || considerations.length === 0) {
      return null;
    }

    return (
      <VStack spacing={"4px"} align="start">
        {considerations.map((consider: string, index: number) => (
          <ConsiderationTag key={index} text={consider} />
        ))}
      </VStack>
    );
  }
);
ConsiderationsList.displayName = "ConsiderationsList";

const DoctorTopHeader = memo(
  ({ data, isMobile }: { data: any; isMobile: boolean }) => {
    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { t, i18n } = useTranslation();

    // Handle client-side rendering
    useEffect(() => {
      setIsClient(true);

      // Simulate data loading
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }, []);

    const borderStyle = useMemo(
      () => ({
        borderRight: i18n.language === "en" ? "none" : "1px solid #DDF1F7",
        borderLeft: i18n.language === "en" ? "1px solid #DDF1F7" : "none",
      }),
      [i18n.language]
    );

    return (
      <HStack
        alignItems={isMobile ? "start" : "center"}
        flexDirection={isMobile ? "column" : "row"}
        spacing={"0"}
        width={"100%"}
        borderBottom={"1px solid #DDF1F7"}
      >
        <Box flex={"2"} />
        <HStack
          p={"8px 20px"}
          {...borderStyle}
          flex={"6"}
          width={"100%"}
          justifyContent={"space-between"}
        >
          <VStack alignItems={"start"}>
            <Text fontWeight={"600"} fontSize={"18px"} color={"#5178F5"}>
              {t("profile")}
            </Text>

            {/* Render time only on client-side */}
            {isClient ? (
              <CurrentTime />
            ) : (
              <Skeleton height="20px" width="200px" />
            )}
          </VStack>

          <HStack spacing={"16px"}>
            <ConsiderationsList
              considerations={data?.considerations}
              isLoading={isLoading}
            />

            {!isMobile && <TagButton label={t("tag")} />}
          </HStack>
        </HStack>
      </HStack>
    );
  }
);

DoctorTopHeader.displayName = "DoctorTopHeader";

export default DoctorTopHeader;
