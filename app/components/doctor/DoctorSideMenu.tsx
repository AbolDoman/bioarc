import { HStack, Text, VStack, Skeleton } from "@chakra-ui/react";
import { doctorSideMenuEn, doctorSideMenu } from "../../assets/data/consts";
import { useMemo, memo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const MenuItem = memo(
  ({
    icon,
    title,
    isActive,
    onClick,
  }: {
    icon: React.ReactNode;
    title: string;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <HStack
      width={"95%"}
      borderRadius={"12px"}
      p={"4px 8px"}
      mt={"8px"}
      bgColor={isActive ? "#FEF3F3" : "transparent"}
      _hover={{ bgColor: "#FEF3F3" }}
      cursor={"pointer"}
      px={"20px"}
      spacing={"4px"}
      transition="background-color 0.2s"
      onClick={onClick}
    >
      {icon}
      <Text
        _hover={{ color: "black" }}
        color={isActive ? "#5178F5" : "#424242"}
        transition="color 0.2s"
      >
        {title}
      </Text>
    </HStack>
  )
);
MenuItem.displayName = "MenuItem";

// Menu item skeleton for loading states
const MenuItemSkeleton = () => (
  <HStack
    width={"95%"}
    borderRadius={"12px"}
    p={"4px 8px"}
    mt={"8px"}
    px={"20px"}
    spacing={"4px"}
  >
    <Skeleton width="24px" height="24px" borderRadius="md" />
    <Skeleton width="120px" height="20px" />
  </HStack>
);

const DoctorSideMenu = memo(() => {
  const [activeIndex, setActiveIndex] = useState(1); // Default active item
  const [isLoading, setIsLoading] = useState(true);
  const [showTimeline, setShowTimeline] = useState(false);
  const { i18n } = useTranslation();

  // Fetch menu items based on language
  const localdoctorSideMenu = useMemo(() => {
    return i18n.language === "en" ? doctorSideMenuEn : doctorSideMenu;
  }, [i18n.language]);

  const handleMenuClick = (index: number) => {
    setActiveIndex(index);

    // Special handling for timeline menu item (assuming index 2 is timeline)
    if (index === 2 && !showTimeline) {
      setShowTimeline(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <VStack spacing={"0"} alignItems={"start"} flex={"2"}>
        {Array.from({ length: 5 }).map((_, index) => (
          <MenuItemSkeleton key={index} />
        ))}
      </VStack>
    );
  }

  return (
    <VStack
      spacing={"0"}
      alignItems={"start"}
      flex={"2"}
      role="menu"
      aria-label="Doctor navigation menu"
    >
      {localdoctorSideMenu.map((item, index) => (
        <MenuItem
          key={index}
          icon={item.icon}
          title={item.title}
          isActive={index === activeIndex}
          onClick={() => handleMenuClick(index)}
        />
      ))}
    </VStack>
  );
});

DoctorSideMenu.displayName = "DoctorSideMenu";

export default DoctorSideMenu;
