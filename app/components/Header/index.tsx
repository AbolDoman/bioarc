import { HStack, Image, Button } from "@chakra-ui/react";
import bioarcLogoDesktop from "app/assets/bioarcLogoDesktop.svg";
import { useTranslation } from "react-i18next";
import { saveSession } from "~/cookie";
import { MessageSquarePlus, Settings2, Bell } from "lucide-react";
import { useCallback, useMemo, useState, memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@remix-run/react";
import CustomChip from "./CustomChip";
import CustomMenuForIcons from "./CustomMenuForIcons";
import HeaderMenu from "./HeaderMenu";
import DoctorProfileMenu from "./DoctorProfileMenu";
import {
  clinics,
  clinicsEn,
  doctors,
  doctorsEn,
  medicineType,
  medicineTypeEn,
} from "~/assets/data/consts";

const fetchUser = async (lang: string) => {
  try {
    const response = await fetch(`/api/doctorProfile?lang=${lang}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};

const Logo = memo(() => (
  <Link to={"/"}>
    <Image src={bioarcLogoDesktop} width={"117px"} height={"25px"} />
  </Link>
));
Logo.displayName = "Logo";

const LanguageToggle = memo(
  ({
    onToggle,
    currentLanguage,
  }: {
    onToggle: () => Promise<void>;
    currentLanguage: string;
  }) => (
    <Button onClick={onToggle} color={"#DAE0F4"} _hover={{ color: "white" }}>
      {currentLanguage === "fa" ? "En" : "فا"}
    </Button>
  )
);
LanguageToggle.displayName = "LanguageToggle";

// Notifications area component
const NotificationsArea = memo(
  ({
    data,
    messageLabel,
    settingLabel,
    notificationsLabel,
  }: {
    data: any;
    messageLabel: string;
    settingLabel: string;
    notificationsLabel: string;
  }) => (
    <HStack
      _hover={{ border: "1px solid white" }}
      border={"1px solid #DAE0F4"}
      borderRadius={"4px"}
      spacing={"16px"}
      p={"8px 16px"}
    >
      <CustomMenuForIcons
        sampleText={messageLabel}
        icon={
          data?.newMessagesCount ? (
            <CustomChip label={data?.newMessagesCount}>
              <MessageSquarePlus
                cursor={"pointer"}
                color="#FFFFFF"
                size={"18px"}
              />
            </CustomChip>
          ) : (
            <MessageSquarePlus
              cursor={"pointer"}
              color="#FFFFFF"
              size={"18px"}
            />
          )
        }
      />
      <CustomMenuForIcons
        sampleText={settingLabel}
        icon={<Settings2 cursor={"pointer"} color="#FFFFFF" size={"18px"} />}
      />
      <CustomMenuForIcons
        sampleText={notificationsLabel}
        icon={<Bell cursor={"pointer"} color="#FFFFFF" size={"18px"} />}
      />
    </HStack>
  )
);
NotificationsArea.displayName = "NotificationsArea";

const ClinicalOptions = memo(
  ({
    clinics,
    medicineTypes,
    doctors,
    clinicIndex,
    medicineTypeIndex,
    doctorIndex,
    setClinicIndex,
    setMedicineTypeIndex,
    setDoctorIndex,
    polyclinicLabel,
    fromLabel,
  }: {
    clinics: string[];
    medicineTypes: string[];
    doctors: string[];
    clinicIndex: number;
    medicineTypeIndex: number;
    doctorIndex: number;
    setClinicIndex: (idx: number) => void;
    setMedicineTypeIndex: (idx: number) => void;
    setDoctorIndex: (idx: number) => void;
    polyclinicLabel: string;
    fromLabel: string;
  }) => (
    <HStack
      spacing={"16px"}
      bgColor={"#F0F0EE"}
      p={"4px 16px"}
      borderRadius={"8px"}
      boxShadow={"inset 0 0 20px 0 #C7D3F7, inset 0 0 5px 0 white"}
    >
      <HeaderMenu
        setSelectedItem={setClinicIndex}
        title={`${polyclinicLabel} ${clinics[clinicIndex]}`}
        items={clinics}
      />
      <HeaderMenu
        setSelectedItem={setMedicineTypeIndex}
        title={`${medicineTypes[medicineTypeIndex]}`}
        items={medicineTypes}
      />
      <HeaderMenu
        setSelectedItem={setDoctorIndex}
        title={`${fromLabel} ${doctors[doctorIndex]}`}
        items={doctors}
      />
    </HStack>
  )
);
ClinicalOptions.displayName = "ClinicalOptions";

const LoginButton = memo(({ label }: { label: string }) => (
  <Link to={"/login"}>
    <Button
      bgColor={"white"}
      p={"4px 8px"}
      borderRadius={"8px"}
      _hover={{ bgColor: "gainsboro" }}
    >
      {label}
    </Button>
  </Link>
));
LoginButton.displayName = "LoginButton";

// Main header component
const Header = memo(({ user }: { user: any }) => {
  const [selectedClinic, setSelectedClinic] = useState(0);
  const [selectedDoctors, setSelectedDoctors] = useState(0);
  const [selectedMedicineType, setSelectedMedicineType] = useState(0);

  const { t, i18n } = useTranslation();

  const changeLang = useCallback(async () => {
    await saveSession("lang", i18n.language === "en" ? "fa" : "en");
    window.location.reload();
  }, [i18n.language]);

  const { data } = useQuery({
    enabled: Boolean(user?.token),
    queryKey: ["doctorProfile", i18n.language, user?.id],
    queryFn: () => fetchUser(i18n.language),
    staleTime: 60000, // Cache valid for 1 minute
    cacheTime: 300000, // Keep in cache for 5 minutes
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

  // Check if user is authenticated for conditional rendering
  const isAuthenticated = Boolean(user?.token);

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
      <Logo />
      <HStack spacing={"16px"}>
        <LanguageToggle onToggle={changeLang} currentLanguage={i18n.language} />

        {isAuthenticated ? (
          <>
            <NotificationsArea
              data={data}
              messageLabel={t("new_messages")}
              settingLabel={t("setting")}
              notificationsLabel={t("notifications")}
            />

            <ClinicalOptions
              clinics={localClinics}
              medicineTypes={localMedicineType}
              doctors={localDoctors}
              clinicIndex={selectedClinic}
              medicineTypeIndex={selectedMedicineType}
              doctorIndex={selectedDoctors}
              setClinicIndex={setSelectedClinic}
              setMedicineTypeIndex={setSelectedMedicineType}
              setDoctorIndex={setSelectedDoctors}
              polyclinicLabel={t("polyclinic")}
              fromLabel={t("from")}
            />

            <DoctorProfileMenu data={data} />
          </>
        ) : (
          <LoginButton label={t("doctorLogin")} />
        )}
      </HStack>
    </HStack>
  );
});

Header.displayName = "Header";

export default Header;
