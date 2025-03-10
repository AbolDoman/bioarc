import { Button, HStack, Text, VStack, Skeleton } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Pencil } from "lucide-react";
import { memo, useState, useEffect, useMemo } from "react";

// Insurance field with label and value
const InsuranceField = memo(
  ({
    label,
    value,
    valueColor = "#424242",
    fontWeight = "700",
  }: {
    label: string;
    value?: string;
    valueColor?: string;
    fontWeight?: string;
  }) => {
    if (!value) return null;

    return (
      <HStack spacing={"4px"}>
        <Text fontSize={"14px"} color={"#858588"} fontWeight={"400"}>
          {label}
        </Text>
        <Text fontSize={"14px"} color={valueColor} fontWeight={fontWeight}>
          {value}
        </Text>
      </HStack>
    );
  }
);
InsuranceField.displayName = "InsuranceField";

// Eligibility check button
const EligibilityButton = memo(({ label }: { label: string }) => (
  <Button
    bgColor={"#DEF5FE"}
    transition={"all 100ms"}
    _active={{ bgColor: "aqua" }}
    borderRadius={"6px"}
    color={"#2F3E63"}
    fontWeight={"600"}
    p={"8px 16px"}
    _hover={{ opacity: "80%" }}
    size="sm"
  >
    {label}
  </Button>
));
EligibilityButton.displayName = "EligibilityButton";

const InsuranceSkeleton = memo(({ isMobile }: { isMobile: boolean }) => (
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
      spacing={isMobile ? 4 : 8}
    >
      <Skeleton height="20px" width="150px" />
      <HStack spacing={4}>
        <Skeleton height="20px" width="180px" />
        <Skeleton height="32px" width="100px" borderRadius="6px" />
      </HStack>
      <Skeleton height="20px" width="200px" />
    </HStack>
  </VStack>
));
InsuranceSkeleton.displayName = "InsuranceSkeleton";

// Supplementary insurance section with edit icon
const SupplementaryInsurance = memo(
  ({ label, value }: { label: string; value?: string }) => {
    // Don't render if value is missing
    if (!value) return null;

    return (
      <HStack spacing={"4px"}>
        <Text fontSize={"14px"} color={"#858588"} fontWeight={"400"}>
          {label}
        </Text>
        <Text fontSize={"14px"} color={"#424242"} fontWeight={"700"}>
          {value}
        </Text>
        <Pencil cursor={"pointer"} color={"#5178F5"} size={"16px"} />
      </HStack>
    );
  }
);
SupplementaryInsurance.displayName = "SupplementaryInsurance";

const InsuranceInformation = memo(
  ({ data, isMobile }: { data: any; isMobile: boolean }) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);

    // Layout styles that depend on mobile state
    const layoutProps = useMemo(
      () => ({
        alignItems: isMobile ? "start" : "center",
        flexDirection: isMobile ? "column" : ("row" as "column" | "row"),
        justifyContent: "space-between",
        width: "100%",
        spacing: isMobile ? 4 : undefined,
      }),
      [isMobile]
    );

    // Simulate data loading - replace with actual data fetching
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }, []);

    // Show skeleton during loading
    if (isLoading) {
      return <InsuranceSkeleton isMobile={isMobile} />;
    }

    // Handle missing data case
    if (!data?.insurance) {
      return (
        <VStack
          borderRadius={"12px"}
          overflow={"hidden"}
          bgColor={"white"}
          boxShadow={"0 10px 30px #CFDDF080"}
          p={"16px"}
          width={"100%"}
          spacing={"8px"}
          align="center"
          justify="center"
        >
          <Text color="gray.500">{t("noInsuranceData")}</Text>
        </VStack>
      );
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
          <InsuranceField
            label={t("insurance")}
            value={data?.insurance?.type}
          />

          <HStack spacing={"4px"}>
            <InsuranceField
              label={t("insuranceValidity")}
              value={data?.insurance?.expiration_date}
              valueColor="#36459B"
              fontWeight="500"
            />
            <EligibilityButton label={t("eligibility")} />
          </HStack>

          <SupplementaryInsurance
            label={t("supplementaryInsurance")}
            value={data?.supplementary_insurance?.name}
          />
        </HStack>
      </VStack>
    );
  }
);

InsuranceInformation.displayName = "InsuranceInformation";

export default InsuranceInformation;
