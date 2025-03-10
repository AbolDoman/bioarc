import { Button, HStack, Skeleton, Text, VStack } from "@chakra-ui/react";
import { memo, useMemo, useState, useEffect, useCallback } from "react";
import {
  AppointmentTyps,
  patientHistoryMenu,
  patientHistoryMenuEn,
} from "../../assets/data/consts";
import { useTranslation } from "react-i18next";

const ActionButton = memo(
  ({ label, isMobile }: { label: string; isMobile: boolean }) => (
    <Button
      bgColor={"white"}
      transition={"all 200ms"}
      borderRadius={"6px"}
      color={"#5178F5"}
      border={"1px solid #5178F5"}
      fontWeight={"600"}
      p={isMobile ? "4px 8px" : "8px 16px"}
      _hover={{ bgColor: "#5178F5", color: "white" }}
      fontSize={"13px"}
    >
      {label}
    </Button>
  )
);
ActionButton.displayName = "ActionButton";

const StatusBadge = memo(
  ({ status, isMobile }: { status: string; isMobile: boolean }) => {
    const { t } = useTranslation();

    // Determine color and label based on status
    const statusConfig = useMemo(() => {
      const config = {
        [AppointmentTyps.RESERVED]: {
          color: "#95C5E1",
          label: t("reserved"),
        },
        [AppointmentTyps.CANCELD]: {
          color: "#E1797D",
          label: t("canceled"),
        },
        [AppointmentTyps.MOVED]: {
          color: "#F3A691",
          label: t("moved"),
        },
        [AppointmentTyps.HELD]: {
          color: "#8BC5A2",
          label: t("held"),
        },
      };

      return config[status] || { color: "#95C5E1", label: t("unknown") };
    }, [status, t]);

    return (
      <Button
        bgColor={statusConfig.color}
        transition={"all 100ms"}
        borderRadius={"6px"}
        color={"white"}
        fontWeight={"600"}
        p={isMobile ? "4px 8px" : "8px 20px"}
        _hover={{ opacity: "80%" }}
        fontSize={"13px"}
        alignSelf={isMobile ? "center" : "end"}
      >
        {statusConfig.label}
      </Button>
    );
  }
);
StatusBadge.displayName = "StatusBadge";

// Doctor information component
const DoctorInfo = memo(
  ({ doctorName, specialty }: { doctorName: string; specialty: string }) => (
    <VStack spacing={"8px"} align="start">
      <Text fontSize={"12px"} fontWeight={"500"} color={"#424242"}>
        {doctorName}
      </Text>
      <Text fontSize={"10px"} fontWeight={"400"} color={"#8C8C8C"}>
        {specialty}
      </Text>
    </VStack>
  )
);
DoctorInfo.displayName = "DoctorInfo";

// Appointment action buttons for reserved appointments
const AppointmentActions = memo(
  ({ isMobile, i18nLanguage }: { isMobile: boolean; i18nLanguage: string }) => {
    const { t } = useTranslation();

    return (
      <HStack
        flexDirection={i18nLanguage === "en" ? "column" : "row"}
        spacing={"16px"}
      >
        <ActionButton label={t("cancelAppointment")} isMobile={isMobile} />
        <ActionButton label={t("rescheduleAppointment")} isMobile={isMobile} />
      </HStack>
    );
  }
);
AppointmentActions.displayName = "AppointmentActions";

// History item skeleton for loading state
const HistoryItemSkeleton = memo(({ isMobile }: { isMobile: boolean }) => (
  <HStack
    flexDirection={isMobile ? "column" : "row"}
    border={"1px solid #E6ECF6"}
    p={"8px 16px"}
    borderRadius={"12px"}
    width={"100%"}
    justifyContent={"space-between"}
    spacing={4}
  >
    <VStack spacing={"8px"} align="start" width={isMobile ? "100%" : "auto"}>
      <Skeleton height="18px" width="120px" />
      <Skeleton height="14px" width="150px" />
    </VStack>

    <VStack
      spacing={"8px"}
      alignItems={isMobile ? "center" : "end"}
      width={isMobile ? "100%" : "auto"}
    >
      <HStack spacing={"16px"} width={isMobile ? "100%" : "auto"}>
        <Skeleton height="32px" width="100px" borderRadius="6px" />
      </HStack>
      <Skeleton height="14px" width="80px" />
    </VStack>
  </HStack>
));
HistoryItemSkeleton.displayName = "HistoryItemSkeleton";

// History item component for each appointment
const HistoryItem = memo(
  ({
    history,
    isMobile,
    ind,
  }: {
    history: any;
    isMobile: boolean;
    ind: number;
  }) => {
    const { i18n } = useTranslation();

    return (
      <HStack
        flexDirection={isMobile ? "column" : "row"}
        border={"1px solid #E6ECF6"}
        p={"8px 16px"}
        borderRadius={"12px"}
        key={ind}
        width={"100%"}
        justifyContent={"space-between"}
      >
        <DoctorInfo
          doctorName={history.doctorName}
          specialty={history.DoctorSpecialty}
        />

        <VStack spacing={"8px"} alignItems={isMobile ? "center" : "end"}>
          <HStack
            flexDirection={i18n.language === "en" ? "column" : "row"}
            spacing={"16px"}
          >
            {history.status === AppointmentTyps.RESERVED && (
              <AppointmentActions
                isMobile={isMobile}
                i18nLanguage={i18n.language}
              />
            )}

            <StatusBadge status={history.status} isMobile={isMobile} />
          </HStack>

          <Text fontSize={"12px"} fontWeight={"400"} color={"#8C8C8C"}>
            {history.date}
          </Text>
        </VStack>
      </HStack>
    );
  }
);
HistoryItem.displayName = "HistoryItem";

// Appointment history list with loading state
const AppointmentHistory = memo(
  ({
    patientHistoryMenu,
    selectedMenuItem,
    isMobile,
    isLoading,
  }: {
    patientHistoryMenu: any[];
    selectedMenuItem: number;
    isMobile: boolean;
    isLoading: boolean;
  }) => {
    // When loading, show skeletons
    if (isLoading) {
      return (
        <VStack width={"100%"} spacing={3}>
          {[1, 2, 3].map((_, index) => (
            <HistoryItemSkeleton
              key={`skeleton-${index}`}
              isMobile={isMobile}
            />
          ))}
        </VStack>
      );
    }

    const items = patientHistoryMenu[selectedMenuItem].items;
    if (!items || items.length === 0) {
      return (
        <VStack width={"100%"} py={6} justifyContent="center">
          <Text color="gray.500">No appointment history available</Text>
        </VStack>
      );
    }

    return (
      <VStack width={"100%"} spacing={3}>
        {items.map((history: any, ind: number) => (
          <HistoryItem
            key={`history-${ind}`}
            history={history}
            isMobile={isMobile}
            ind={ind}
          />
        ))}
      </VStack>
    );
  }
);
AppointmentHistory.displayName = "AppointmentHistory";

const BasicHistory = memo(({ title }: { title: string }) => {
  const { t } = useTranslation();

  return (
    <VStack minH={"300px"} width={"100%"} justifyContent="center">
      <Text>{t(title)}</Text>
    </VStack>
  );
});
BasicHistory.displayName = "BasicHistory";

const HistoryTabs = memo(
  ({
    menuItems,
    selectedMenuItem,
    setSelectedMenuItem,
    isMobile,
    isLoading,
  }: {
    menuItems: any[];
    selectedMenuItem: number;
    setSelectedMenuItem: (index: number) => void;
    isMobile: boolean;
    isLoading: boolean;
  }) => {
    const handleTabClick = useCallback(
      (index: number) => {
        setSelectedMenuItem(index);
      },
      [setSelectedMenuItem]
    );

    if (isLoading) {
      return (
        <HStack spacing={"32px"}>
          {[1, 2, 3].map((_, index) => (
            <Skeleton
              key={`tab-skeleton-${index}`}
              width={isMobile ? "60px" : "80px"}
              height={isMobile ? "20px" : "24px"}
            />
          ))}
        </HStack>
      );
    }

    return (
      <HStack spacing={"32px"}>
        {menuItems.map((item: any, index: number) => (
          <Text
            onClick={() => handleTabClick(index)}
            key={`tab-${index}`}
            cursor={"pointer"}
            borderBottom={`2px solid ${selectedMenuItem === index ? "#466EA6" : "#FFFFFF"}`}
            fontSize={isMobile ? "10px" : "14px"}
            color={selectedMenuItem === index ? "#466EA6" : "#858588"}
            fontWeight={selectedMenuItem === index ? "700" : "400"}
            pb={1}
            transition="all 0.2s ease"
          >
            {item.label}
          </Text>
        ))}
      </HStack>
    );
  }
);
HistoryTabs.displayName = "HistoryTabs";

const PatientHistory = memo(({ isMobile = false }: { isMobile?: boolean }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { i18n } = useTranslation();

  const localpatientHistoryMenu = useMemo(() => {
    return i18n.language === "en" ? patientHistoryMenuEn : patientHistoryMenu;
  }, [i18n.language]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [selectedMenuItem]);

  return (
    <VStack
      borderRadius={"12px"}
      overflow={"hidden"}
      bgColor={"white"}
      boxShadow={"0 10px 60px #E2ECF980"}
      width={"100%"}
      spacing={"16px"}
      p={"16px"}
      alignItems={"start"}
    >
      <HistoryTabs
        menuItems={localpatientHistoryMenu}
        selectedMenuItem={selectedMenuItem}
        setSelectedMenuItem={setSelectedMenuItem}
        isMobile={isMobile}
        isLoading={isLoading}
      />

      {!isLoading &&
        localpatientHistoryMenu[selectedMenuItem].type === "Appointment" && (
          <AppointmentHistory
            isMobile={isMobile}
            patientHistoryMenu={localpatientHistoryMenu}
            selectedMenuItem={selectedMenuItem}
            isLoading={isLoading}
          />
        )}

      {!isLoading &&
        localpatientHistoryMenu[selectedMenuItem].type === "Call" && (
          <BasicHistory title="callInfo" />
        )}

      {!isLoading &&
        localpatientHistoryMenu[selectedMenuItem].type === "Information" && (
          <BasicHistory title="patientInfo" />
        )}

      {isLoading && selectedMenuItem !== undefined && (
        <AppointmentHistory
          isMobile={isMobile}
          patientHistoryMenu={localpatientHistoryMenu}
          selectedMenuItem={selectedMenuItem}
          isLoading={isLoading}
        />
      )}
    </VStack>
  );
});

PatientHistory.displayName = "PatientHistory";

export default PatientHistory;
