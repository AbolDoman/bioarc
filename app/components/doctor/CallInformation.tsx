import {
  Box,
  Button,
  HStack,
  Image,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MicOff, Pause, Phone, PhoneForwarded } from "lucide-react";
import { useEffect, useState, memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

const CallOption = memo(
  ({
    index,
    activeSection,
    setActiveSection,
    icon,
    label,
  }: {
    index: number;
    activeSection: number;
    setActiveSection: (index: number) => void;
    icon: React.ReactNode;
    label: string;
  }) => {
    const handleMouseOver = useCallback(() => {
      setActiveSection(index);
    }, [index, setActiveSection]);

    const handleMouseLeave = useCallback(() => {
      setActiveSection(-1);
    }, [setActiveSection]);

    const isActive = activeSection === index;

    const borderStyle = useMemo(
      () => `1px solid ${isActive ? "black" : "#B2C6E3"}`,
      [isActive]
    );

    const textColor = useMemo(
      () => (isActive ? "black" : "#B2C6E3"),
      [isActive]
    );

    return (
      <VStack
        borderRadius={"4px"}
        border={borderStyle}
        spacing={"4px"}
        p={"4px"}
        cursor={"pointer"}
        transition={"all 100ms"}
        width={"100%"}
        flex={"1"}
        overflow={"hidden"}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        role="button"
        aria-pressed={isActive}
      >
        {icon}
        <Text color={textColor} fontSize={"12px"}>
          {label}
        </Text>
      </VStack>
    );
  }
);
CallOption.displayName = "CallOption";

const CallTimer = memo(({ counter }: { counter: number }) => {
  const formattedTime = useMemo(() => {
    const minutes = Math.floor(counter / 60);
    const seconds = counter % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();

    return `${formattedMinutes}:${formattedSeconds}`;
  }, [counter]);

  return (
    <Text fontSize={"30px"} color={"#636366"} fontWeight={"700"}>
      {formattedTime}
    </Text>
  );
});
CallTimer.displayName = "CallTimer";

const ProfileImage = memo(({ src }: { src: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <Box
      width={"126px"}
      height={"126px"}
      borderRadius={"100%"}
      bgColor={"white"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      position="relative"
    >
      {!isLoaded && !hasError && (
        <Skeleton
          width={"110px"}
          height={"110px"}
          borderRadius={"100%"}
          position="absolute"
          startColor="#e2e8f0"
          endColor="#f7fafc"
        />
      )}
      <Image
        src={src}
        width={"110px"}
        height={"110px"}
        borderRadius={"100%"}
        objectFit={"cover"}
        alt="Patient profile"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </Box>
  );
});
ProfileImage.displayName = "ProfileImage";

const CallControls = memo(
  ({
    isCalled,
    setIsCalled,
  }: {
    isCalled: boolean;
    setIsCalled: (value: boolean) => void;
  }) => {
    const { t } = useTranslation();

    // Single handler for toggling call state
    const toggleCall = useCallback(() => {
      setIsCalled((prev) => !prev);
    }, [setIsCalled]);

    const buttonProps = useMemo(
      () => ({
        width: "100%",
        transition: "all 100ms",
        _hover: { opacity: "90%" },
        borderRadius: "10px",
        p: "12px 8px",
        color: "white",
        onClick: toggleCall,
        ...(isCalled
          ? {
              bgColor: "#F04242",
              leftIcon: <Phone size={"18px"} color="white" />,
              children: t("endCall"),
            }
          : {
              bgColor: "green",
              leftIcon: (
                <Phone className="vibrate" size={"18px"} color="white" />
              ),
              children: t("startCall"),
            }),
      }),
      [isCalled, toggleCall, t]
    );

    return (
      <HStack width={"100%"} px={"20px"} mt={"16px"} spacing={"16px"}>
        <Button {...buttonProps} />
      </HStack>
    );
  }
);
CallControls.displayName = "CallControls";

const CallOptions = memo(
  ({
    isCalled,
    activeSection,
    setActiveSection,
  }: {
    isCalled: boolean;
    activeSection: number;
    setActiveSection: (index: number) => void;
  }) => {
    const { t } = useTranslation();

    if (!isCalled) return null;

    const options = [
      {
        index: 0,
        label: t("hold"),
        icon: (active: boolean) => (
          <Pause color={active ? "black" : "#B2C6E3"} size={"20px"} />
        ),
      },
      {
        index: 1,
        label: t("transfer"),
        icon: (active: boolean) => (
          <PhoneForwarded color={active ? "black" : "#B2C6E3"} size={"20px"} />
        ),
      },
      {
        index: 2,
        label: t("mute"),
        icon: (active: boolean) => (
          <MicOff color={active ? "black" : "#B2C6E3"} size={"20px"} />
        ),
      },
    ];

    return (
      <HStack width={"100%"} px={"20px"} mt={"16px"} spacing={"16px"}>
        {options.map((option) => (
          <CallOption
            key={option.index}
            index={option.index}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            label={option.label}
            icon={option.icon(activeSection === option.index)}
          />
        ))}
      </HStack>
    );
  }
);
CallOptions.displayName = "CallOptions";

const CallInformation = memo(({ data }: { data: any }) => {
  const [activeSection, setActiveSection] = useState(-1);
  const [counter, setCounter] = useState(0);
  const [isCalled, setIsCalled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isCalled) {
      setCounter(1);
    } else {
      setCounter(0);
    }
  }, [isCalled]);

  useEffect(() => {
    if (!isCalled) return;

    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isCalled]);

  // Dedicated return for loading state
  if (isLoading) {
    return (
      <VStack
        borderRadius={"12px"}
        overflow={"hidden"}
        bgColor={"white"}
        boxShadow={"0 10px 60px #E2ECF980"}
        width={"100%"}
        flex={"1"}
        spacing={"0"}
        p={4}
      >
        <Skeleton height="80px" width="100%" />
        <VStack width={"100%"} spacing={4} p={4}>
          <Skeleton height="126px" width="126px" borderRadius="100%" />
          <Skeleton height="30px" width="180px" />
          <Skeleton height="30px" width="80px" />
          <Skeleton height="20px" width="140px" />
          <Skeleton height="40px" width="100%" />
        </VStack>
      </VStack>
    );
  }

  // Check if this is a returning patient
  const isReturningPatient = data && !data.is_new_patient;

  return (
    <VStack
      borderRadius={"12px"}
      overflow={"hidden"}
      bgColor={"white"}
      boxShadow={"0 10px 60px #E2ECF980"}
      width={"100%"}
      flex={"1"}
      spacing={"0"}
    >
      {isReturningPatient && (
        <Box width={"100%"} height={"99px"} bgColor={"#F4F6FB"} p={"20px"}>
          <Text lineHeight={"20px"} color={"#5178F5"} fontSize={"12px"}>
            {t("oldPatient")}
          </Text>
        </Box>
      )}

      <VStack width={"100%"} spacing={"0"} pos={"relative"} top={"-50px"}>
        {data?.profile_picture && <ProfileImage src={data.profile_picture} />}

        <VStack spacing={"8px"}>
          <Text fontSize={"25px"} fontWeight={"700"}>
            {data?.full_name || t("unknownPatient")}
          </Text>

          <CallTimer counter={counter} />

          <Text fontSize={"12px"} color={"#ACACAC"} fontWeight={"400"}>
            {isCalled ? t("callStatusRecording") : t("callStatusReady")}
          </Text>
        </VStack>

        <CallOptions
          isCalled={isCalled}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        <CallControls isCalled={isCalled} setIsCalled={setIsCalled} />
      </VStack>
    </VStack>
  );
});

CallInformation.displayName = "CallInformation";

export default CallInformation;
