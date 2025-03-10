import { Button, HStack, Text, useDisclosure } from "@chakra-ui/react";
import AppModal from "../AppModal";
import { Pencil, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { memo } from "react";

// Button component with icon for appointment actions
const ActionButton = memo(
  ({
    onClick,
    icon,
    label,
    isPrimary = false,
  }: {
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
    isPrimary?: boolean;
  }) => {
    // Base styles for both primary and secondary buttons
    const baseStyles = {
      borderRadius: "10px",
      transition: "all 200ms",
    };

    // Primary button styles (blue background)
    const primaryStyles = {
      ...baseStyles,
      bgColor: "#5178F5",
      _hover: { bgColor: "blue" },
      color: "white",
      p: "8px 16px",
    };

    // Secondary button styles (outline style)
    const secondaryStyles = {
      ...baseStyles,
      p: "4px 8px",
      fontSize: "14px",
      fontWeight: "600",
      color: "#36459B",
      _hover: { bgColor: "#e0e5f1" },
    };

    // Select appropriate style based on button type
    const buttonStyles = isPrimary ? primaryStyles : secondaryStyles;

    return (
      <Button {...buttonStyles} onClick={onClick} leftIcon={icon}>
        {label}
      </Button>
    );
  }
);
ActionButton.displayName = "ActionButton";

// Modal component for editing appointments
const EditAppointmentModal = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();

  return (
    <>
      <ActionButton
        onClick={onOpen}
        icon={<Pencil color="#36459B" size="16px" />}
        label={t("editAppointment")}
      />
      <AppModal isOpen={isOpen} onClose={onClose}>
        <Text>{t("editAppointmentDescription")}</Text>
      </AppModal>
    </>
  );
});
EditAppointmentModal.displayName = "EditAppointmentModal";

// Modal component for creating new appointments
const NewAppointmentModal = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();

  return (
    <>
      <ActionButton
        onClick={onOpen}
        icon={<Plus color="white" size="18px" />}
        label={t("newAppointment")}
        isPrimary
      />
      <AppModal isOpen={isOpen} onClose={onClose}>
        <Text>{t("newAppointmentDescription")}</Text>
      </AppModal>
    </>
  );
});
NewAppointmentModal.displayName = "NewAppointmentModal";

// Information display component showing appointment details
const AppointmentInfoDisplay = memo(({ isMobile }: { isMobile: boolean }) => {
  const { t } = useTranslation();

  return (
    <HStack
      alignItems={isMobile ? "start" : "center"}
      flexDirection={isMobile ? "column" : "row"}
      width="100%"
      bgColor="#F4F6FB"
      borderRadius="8px"
      justifyContent="space-between"
      p="8px 16px"
    >
      <Text color="#858588" fontSize="14px">
        {t("appointmentInfo")}
      </Text>
      <Text color="#36459B" fontSize="14px">
        {t("doctorName")}
      </Text>
      <Text color="#36459B" fontSize="14px">
        {t("appointmentDate")}
      </Text>
      <EditAppointmentModal />
    </HStack>
  );
});
AppointmentInfoDisplay.displayName = "AppointmentInfoDisplay";

// Main component that handles the appointment information display
const AppointmentInformation = memo(({ isMobile }: { isMobile: boolean }) => {
  return (
    <HStack
      flexDirection={isMobile ? "column" : "row"}
      width="100%"
      spacing="16px"
      justifyContent="space-between"
    >
      <AppointmentInfoDisplay isMobile={isMobile} />
      <NewAppointmentModal />
    </HStack>
  );
});

AppointmentInformation.displayName = "AppointmentInformation";

export default AppointmentInformation;
