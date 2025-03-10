import {
  HStack,
  Image,
  Button,
  useDisclosure,
  VStack,
  Box,
  Text,
} from "@chakra-ui/react";
import bioarcLogoDesktop from "app/assets/bioarcLogoDesktop.svg";
import { useTranslation } from "react-i18next";
import { saveSession } from "~/cookie";
import { MessageSquarePlus, Settings2, Bell, Menu } from "lucide-react";
import { useCallback, useEffect, useMemo, useState, memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@remix-run/react";
import CustomChip from "./CustomChip";
import CustomMenuForIcons from "./CustomMenuForIcons";
import HeaderMenu from "./HeaderMenu";
import DoctorProfileMenu from "./DoctorProfileMenu";
import {
  clinics,
  clinicsEn,
  DEFAULT_PATIENT_INDEX,
  doctors,
  doctorsEn,
  doctorTopMenuItems,
  doctorTopMenuItemsEn,
  medicineType,
  medicineTypeEn,
  patientsName,
} from "~/assets/data/consts";
import { AppDrawer } from "../AppDrawer";
import MyPatients from "../doctor/MyPatients";
import { useShallow } from "zustand/react/shallow";
import useBearStore from "~/myStore";

const fetchUser = async (lang: string) => {
  try {
    const response = await fetch(`/api/doctorProfile?lang=${lang}`);
    if (!response.ok) {
      throw new Error("API request failed");
    }
    return response.json();
  } catch (error) {
    console.error("Doctor profile fetch error:", error);
    return null;
  }
};

const MenuIcon = memo(({ onClick }: { onClick: () => void }) => (
  <Menu color="white" onClick={onClick} cursor="pointer" />
));
MenuIcon.displayName = "MenuIcon";

const LogoImage = memo(() => (
  <Link to={"/"}>
    <Image src={bioarcLogoDesktop} width={"117px"} height={"25px"} />
  </Link>
));
LogoImage.displayName = "LogoImage";

const MenuItem = memo(({ item }: { item: string }) => (
  <Text
    px={"8px"}
    _hover={{ borderBottom: "2px solid #B2C6E354" }}
    cursor={"pointer"}
    borderBottom="2px solid white"
  >
    {item}
  </Text>
));
MenuItem.displayName = "MenuItem";

const LoginButton = memo(({ t }: { t: (key: string) => string }) => (
  <Link to={"/login"}>
    <Button
      bgColor={"gray"}
      color={"white"}
      p={"4px 8px"}
      borderRadius={"8px"}
      _hover={{ bgColor: "gainsboro" }}
    >
      {t("doctorLogin")}
    </Button>
  </Link>
));
LoginButton.displayName = "LoginButton";

const MobileHeader = memo(({ user }: { user: any }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack
      spacing={"32px"}
      p={"12px 32px"}
      height={"60px"}
      bgColor={"#5178F5"}
      width={"100%"}
      justifyContent={"space-between"}
      overflow={"hidden"}
    >
      <>
        <MenuIcon onClick={onOpen} />
        <AppDrawer
          drawerId="mobile-header-drawer"
          realPos={"0"}
          secondPos={"100%"}
          onClose={onClose}
          onOverlayClick={onClose}
          in={isOpen}
          pt="0"
          height={"90vh"}
        >
          <MobileHeaderContent onClose={onClose} user={user} />
        </AppDrawer>
      </>
      <LogoImage />
    </HStack>
  );
});
MobileHeader.displayName = "MobileHeader";

const MobileHeaderContent = memo(
  ({ user, onClose }: { user: any; onClose: () => void }) => {
    const [selectedClinic, setSelectedClinic] = useState(0);
    const [selectedDoctors, setSelectedDoctors] = useState(0);
    const [selectedMedicineType, setSelectedMedicineType] = useState(0);
    const [selectedPatient, setSelectedPatient] = useState(
      DEFAULT_PATIENT_INDEX
    );

    const { t, i18n } = useTranslation();
    const { setSelectedPatientId } = useBearStore(
      useShallow((state) => ({
        setSelectedPatientId: state.setSelectedPatientId,
      }))
    );

    const changeLang = useCallback(async () => {
      await saveSession("lang", i18n.language === "en" ? "fa" : "en");
      window.location.reload();
    }, [i18n.language]);

    const { data } = useQuery({
      enabled: Boolean(user?.token),
      queryKey: ["doctorProfile", i18n.language, user?.id],
      queryFn: () => fetchUser(i18n.language),
      staleTime: 2 * 60 * 1000, // 2 minutes
      cacheTime: 5 * 60 * 1000, // 5 minutes
    });

    const localClinics = useMemo(
      () => (i18n.language === "en" ? clinicsEn : clinics),
      [i18n.language]
    );

    const localMedicineType = useMemo(
      () => (i18n.language === "en" ? medicineTypeEn : medicineType),
      [i18n.language]
    );

    const localDoctors = useMemo(
      () => (i18n.language === "en" ? doctorsEn : doctors),
      [i18n.language]
    );

    const localdoctorTopMenuItems = useMemo(
      () =>
        i18n.language === "en" ? doctorTopMenuItemsEn : doctorTopMenuItems,
      [i18n.language]
    );

    const handlePatientSelect = useCallback((index: number) => {
      setSelectedPatient(index);
    }, []);

    useEffect(() => {
      if (selectedPatient >= 0 && patientsName[selectedPatient]) {
        setSelectedPatientId(patientsName[selectedPatient].id);
        onClose();
      }
    }, [selectedPatient, setSelectedPatientId, onClose]);

    if (!user || !user.token) {
      return (
        <VStack spacing={"16px"} mt={"16px"} overflow={"hidden"}>
          <LoginButton t={t} />
        </VStack>
      );
    }

    return (
      <VStack spacing={"16px"} mt={"16px"} overflow={"hidden"}>
        <HStack
          spacing={"16px"}
          width={"100%"}
          justifyContent={"space-between"}
        >
          <Button
            onClick={changeLang}
            color={"#DAE0F4"}
            _hover={{ color: "white" }}
          >
            {i18n.language === "fa" ? "En" : "فا"}
          </Button>
          <HStack
            _hover={{ border: "1px solid white" }}
            border={"1px solid #DAE0F4"}
            borderRadius={"4px"}
            spacing={"16px"}
            p={"8px 16px"}
          >
            <CustomMenuForIcons
              sampleText={t("new_messages")}
              icon={
                data?.newMessagesCount ? (
                  <CustomChip label={data.newMessagesCount}>
                    <MessageSquarePlus
                      cursor={"pointer"}
                      color="#000000"
                      size={"18px"}
                    />
                  </CustomChip>
                ) : (
                  <MessageSquarePlus
                    cursor={"pointer"}
                    color="#000000"
                    size={"18px"}
                  />
                )
              }
            />
            <CustomMenuForIcons
              sampleText={t("setting")}
              icon={
                <Settings2 cursor={"pointer"} color="#000000" size={"18px"} />
              }
            />
            <CustomMenuForIcons
              sampleText={t("notifications")}
              icon={<Bell cursor={"pointer"} color="#000000" size={"18px"} />}
            />
          </HStack>

          <DoctorProfileMenu data={data} />
        </HStack>

        {/* Clinical information selection area */}
        <VStack
          spacing={"16px"}
          bgColor={"#F0F0EE"}
          width={"100%"}
          p={"4px 16px"}
          borderRadius={"8px"}
          boxShadow={"inset 0 0 20px 0 #C7D3F7, inset 0 0 5px 0 white"}
        >
          <HeaderMenu
            setSelectedItem={setSelectedClinic}
            title={`${t("polyclinic")} ${localClinics[selectedClinic]}`}
            items={localClinics}
          />
          <HeaderMenu
            setSelectedItem={setSelectedMedicineType}
            title={`${localMedicineType[selectedMedicineType]}`}
            items={localMedicineType}
          />
          <HeaderMenu
            setSelectedItem={setSelectedDoctors}
            title={`${t("from")} ${localDoctors[selectedDoctors]}`}
            items={localDoctors}
          />
        </VStack>

        <Box borderBottom={"1px solid gainsboro"} width={"100%"} />

        {/* Patient selection and navigation section */}
        <VStack
          alignItems={"start"}
          spacing={"32px"}
          width={"100%"}
          borderBottom={"1px solid #DDF1F7"}
        >
          <HStack spacing={"20px"}>
            <Text color={"gray"} fontSize={"12px"}>
              {t("selectPatient")}:
            </Text>
            <MyPatients
              selectedPatient={selectedPatient}
              setSelectedPatient={handlePatientSelect}
            />
          </HStack>

          <VStack alignItems={"start"} spacing={"0"}>
            {localdoctorTopMenuItems.map((item, index) => (
              <MenuItem key={index} item={item} />
            ))}
          </VStack>
        </VStack>
      </VStack>
    );
  }
);
MobileHeaderContent.displayName = "MobileHeaderContent";

export default MobileHeader;
