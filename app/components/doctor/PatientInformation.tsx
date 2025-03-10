import {
  HStack,
  Text,
  useDisclosure,
  VStack,
  Skeleton,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import AppModal from "../AppModal";
import { memo, useState, useEffect, useMemo } from "react";

const InfoField = memo(
  ({
    label,
    value,
    suffix,
  }: {
    label: string;
    value?: string;
    suffix?: string;
  }) => {
    if (!value) return null;

    return (
      <HStack spacing={"4px"} flexWrap="wrap">
        <Text fontSize={"14px"} color={"#858588"} fontWeight={"400"}>
          {label}:
        </Text>
        <Text fontSize={"14px"} color={"#424242"} fontWeight={"700"}>
          {value}
        </Text>
        {suffix && (
          <Text fontSize={"14px"} color={"#858588"} fontWeight={"400"}>
            {suffix}
          </Text>
        )}
      </HStack>
    );
  }
);
InfoField.displayName = "InfoField";

const EditPatientInformationModal = memo(({ data }: { data: any }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();

  return (
    <>
      <Text
        _hover={{ textDecoration: "underline" }}
        fontSize={"12px"}
        color={"#5178F5"}
        cursor={"pointer"}
        fontWeight={"400"}
        onClick={onOpen}
      >
        {t("viewAndEdit")}
      </Text>
      <AppModal isOpen={isOpen} onClose={onClose}>
        <Text>
          {t("editPatientInfo")} {data?.full_name}.
        </Text>
      </AppModal>
    </>
  );
});
EditPatientInformationModal.displayName = "EditPatientInformationModal";

const PatientInfoSkeleton = ({ isMobile }: { isMobile: boolean }) => (
  <VStack
    borderRadius={"12px"}
    overflow={"hidden"}
    bgColor={"white"}
    boxShadow={"0 10px 30px #CFDDF080"}
    p={"16px"}
    width={"100%"}
    spacing={"8px"}
  >
    <HStack
      alignItems={isMobile ? "start" : "center"}
      flexDirection={isMobile ? "column" : "row"}
      justifyContent={"space-between"}
      width={"100%"}
      spacing={4}
    >
      <Skeleton height="20px" width="150px" />
      <Skeleton height="20px" width="120px" />
      <Skeleton height="20px" width="130px" />
    </HStack>
    <HStack
      alignItems={isMobile ? "start" : "center"}
      flexDirection={isMobile ? "column" : "row"}
      justifyContent={"space-between"}
      width={"100%"}
      spacing={4}
    >
      <Skeleton height="20px" width="180px" />
      <Skeleton height="20px" width="100px" />
      <Skeleton height="16px" width="80px" />
    </HStack>
  </VStack>
);

const PatientInformation = memo(
  ({ data, isMobile = false }: { data: any; isMobile?: boolean }) => {
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useTranslation();

    const layoutProps = useMemo(
      () => ({
        alignItems: isMobile ? "start" : "center",
        flexDirection: isMobile ? "column" : ("row" as "column" | "row"),
        justifyContent: "space-between",
        width: "100%",
        spacing: isMobile ? 2 : undefined,
      }),
      [isMobile]
    );

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
      return <PatientInfoSkeleton isMobile={isMobile} />;
    }

    return (
      <VStack
        borderRadius={"12px"}
        overflow={"hidden"}
        bgColor={"white"}
        boxShadow={"0 10px 30px #CFDDF080"}
        p={"16px"}
        width={"100%"}
        spacing={"8px"}
      >
        <HStack {...layoutProps}>
          <InfoField label={t("fullName")} value={data?.full_name} />
          <InfoField label={t("nationalId")} value={data?.national_id} />
          <InfoField label={t("mobile")} value={data?.phone_number} />
        </HStack>

        <HStack {...layoutProps}>
          <InfoField
            label={t("birthdate")}
            value={data?.birthday_date}
            suffix={data?.age ? `(${data.age} ${t("ageYears")})` : undefined}
          />
          <InfoField label={t("gender")} value={data?.gender} />
          <EditPatientInformationModal data={data} />
        </HStack>
      </VStack>
    );
  }
);

PatientInformation.displayName = "PatientInformation";

export default PatientInformation;
