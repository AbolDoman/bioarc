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
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";
import { patientsName, patientsNameEn } from "../../assets/data/consts";
import arrowDown from "app/assets/arrowDown.svg";
import { useTranslation } from "react-i18next";
import { useMemo, memo, useState, useEffect, useCallback } from "react";

const PatientMenuItem = memo(
  ({
    patient,
    index,
    onSelect,
  }: {
    patient: { name: string; id: string };
    index: number;
    onSelect: (index: number) => void;
  }) => (
    <MenuItem
      bgColor={"white"}
      _hover={{ bgColor: "#C7D3F7" }}
      cursor={"pointer"}
      borderRadius={"4px"}
      transition={"all 200ms"}
      px={"8px"}
      onClick={() => onSelect(index)}
    >
      <Text>{patient?.name}</Text>
    </MenuItem>
  )
);
PatientMenuItem.displayName = "PatientMenuItem";

// Dropdown button component with rotation animation
const DropdownButton = memo(
  ({ patientName, isOpen }: { patientName: string; isOpen: boolean }) => (
    <HStack spacing={"4px"} justifyContent={"center"} alignItems={"center"}>
      <Text>{patientName}</Text>
      <Box
        transform={`rotate(${isOpen ? "180deg" : "0"})`}
        transition={"all 200ms"}
      >
        <Image
          width={"16px"}
          height={"16px"}
          src={arrowDown}
          alt="Toggle dropdown"
        />
      </Box>
    </HStack>
  )
);
DropdownButton.displayName = "DropdownButton";

const PatientsSkeleton = memo(() => (
  <Skeleton height="36px" width="150px" borderRadius="md" />
));
PatientsSkeleton.displayName = "PatientsSkeleton";

const MyPatients = memo(
  ({
    selectedPatient,
    setSelectedPatient,
  }: {
    selectedPatient: number;
    setSelectedPatient: (index: number) => void;
  }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);

    const localpatientsName = useMemo(() => {
      return i18n.language === "en" ? patientsNameEn : patientsName;
    }, [i18n.language]);

    const currentPatientName = useMemo(() => {
      return localpatientsName[selectedPatient]?.name || "";
    }, [localpatientsName, selectedPatient]);

    const handleSelectPatient = useCallback(
      (index: number) => {
        setSelectedPatient(index);
        onClose(); // Close menu after selection
      },
      [setSelectedPatient, onClose]
    );

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 600);

      return () => clearTimeout(timer);
    }, []);

    // Show skeleton while loading
    if (isLoading) {
      return <PatientsSkeleton />;
    }

    return (
      <Menu onOpen={onOpen} onClose={onClose} placement="bottom-start">
        <MenuButton
          as={Button}
          isLoading={isLoading}
          minW="150px"
          aria-label="Select patient"
        >
          <DropdownButton patientName={currentPatientName} isOpen={isOpen} />
        </MenuButton>

        <MenuList
          bgColor={"white"}
          border={"1px solid gainsboro"}
          p={"4px"}
          borderRadius={"8px"}
          shadow="md"
          zIndex={10}
          maxH="300px"
          overflowY="auto"
        >
          {localpatientsName.map((patient, index) => (
            <PatientMenuItem
              key={patient.id || index}
              patient={patient}
              index={index}
              onSelect={handleSelectPatient}
            />
          ))}
        </MenuList>
      </Menu>
    );
  }
);

MyPatients.displayName = "MyPatients";

export default MyPatients;
