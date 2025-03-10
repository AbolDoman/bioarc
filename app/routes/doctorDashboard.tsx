export async function loader({ request }: LoaderFunctionArgs) {
  const session = await sessionStorage.getSession(
    request.headers.get("cookie")
  );
  const user = session.get("user");
  if (!user || !user.token) throw redirect("/login");
  const userAgent = request.headers.get("user-agent");
  let isMobilejs = undefined;
  let isMobile = undefined;
  try {
    isMobilejs = await import("ismobilejs");
    isMobile = isMobilejs.default.default(userAgent ?? "");
  } catch (error) {
    console.log("error in root loader", error);
  }
  return json({
    isMobile: isMobile.any,
  });
}

import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState, useCallback } from "react";
import { sessionStorage } from "../sessions.server";
import { HStack, Text, VStack } from "@chakra-ui/react";
import {
  DEFAULT_PATIENT_INDEX,
  doctorTopMenuItems,
  doctorTopMenuItemsEn,
  patientsName,
} from "~/assets/data/consts";
import React from "react";
import useBearStore from "~/myStore";
import { useShallow } from "zustand/react/shallow";
import { fetchPatient } from "~/helper";
import PatientHistory from "~/components/doctor/PatientHistory";
import AppointmentDetail from "~/components/doctor/AppointmentDetail";
import InsuranceInformation from "~/components/doctor/InsuranceInformation";
import PatientInformation from "~/components/doctor/PatientInformation";
import DoctorTopHeader from "~/components/doctor/DoctorTopHeader";
import DoctorSideMenu from "~/components/doctor/DoctorSideMenu";
import AppointmentInformation from "~/components/doctor/AppointmentInformation";
import CallInformation from "~/components/doctor/CallInformation";
import MyPatients from "~/components/doctor/MyPatients";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "@remix-run/react";

const MenuItem = React.memo(({ item }: { item: string }) => (
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

const TopMenuBar = React.memo(
  ({
    isMobile,
    selectedPatient,
    setSelectedPatient,
    menuItems,
  }: {
    isMobile: boolean;
    selectedPatient: number;
    setSelectedPatient: (index: number) => void;
    menuItems: string[];
  }) => {
    if (isMobile) return null;

    return (
      <HStack
        spacing={"32px"}
        p={"4px 32px"}
        width={"100%"}
        borderBottom={"1px solid #DDF1F7"}
      >
        <MyPatients
          selectedPatient={selectedPatient}
          setSelectedPatient={setSelectedPatient}
        />
        <HStack spacing={"0"}>
          {menuItems.map((item, index) => (
            <MenuItem key={index} item={item} />
          ))}
        </HStack>
      </HStack>
    );
  }
);
TopMenuBar.displayName = "TopMenuBar";

const PatientDetailSection = React.memo(
  ({ isMobile, data }: { isMobile: boolean; data: any }) => (
    <VStack width={"100%"} flex={"2"}>
      <PatientInformation isMobile={isMobile} data={data} />
      <InsuranceInformation data={data} isMobile={isMobile} />
      <AppointmentDetail isMobile={isMobile} />
    </VStack>
  )
);
PatientDetailSection.displayName = "PatientDetailSection";

export default function DoctorsDashboard() {
  const { isMobile } = useLoaderData<typeof loader>();
  const [selectedPatient, setSelectedPatient] = useState(DEFAULT_PATIENT_INDEX);
  const { selectedPatientId, setSelectedPatientId } = useBearStore(
    useShallow((state) => ({
      selectedPatientId: state.selectedPatientId,
      setSelectedPatientId: state.setSelectedPatientId,
    }))
  );

  const handlePatientChange = useCallback((index: number) => {
    setSelectedPatient(index);
  }, []);

  useEffect(() => {
    if (selectedPatient >= 0 && patientsName[selectedPatient]) {
      setSelectedPatientId(patientsName[selectedPatient].id);
    }
  }, [selectedPatient]);

  const { i18n } = useTranslation();

  const localdoctorTopMenuItems = useMemo(() => {
    return i18n.language === "en" ? doctorTopMenuItemsEn : doctorTopMenuItems;
  }, [i18n.language]);

  // Use query with proper caching strategies
  const { data } = useQuery({
    enabled: !!selectedPatientId,
    queryKey: ["patientProfile", selectedPatientId, i18n.language],
    queryFn: () => fetchPatient(selectedPatientId, i18n.language),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  const borderStyles = useMemo(
    () => ({
      borderRight: i18n.language === "en" ? "none" : "1px solid #DDF1F7",
      borderLeft: i18n.language === "en" ? "1px solid #DDF1F7" : "none",
    }),
    [i18n.language]
  );

  return (
    <VStack pb={"32px"} alignItems={"start"} width={"100%"} spacing={"0"}>
      <TopMenuBar
        isMobile={isMobile}
        selectedPatient={selectedPatient}
        setSelectedPatient={handlePatientChange}
        menuItems={localdoctorTopMenuItems}
      />

      <DoctorTopHeader isMobile={isMobile} />

      <HStack alignItems={"start"} width={"100%"} spacing={"0"}>
        {!isMobile && <DoctorSideMenu />}

        <VStack
          p={"8px 20px"}
          spacing={"16px"}
          {...borderStyles}
          flex={"6"}
          width={"100%"}
        >
          <AppointmentInformation isMobile={isMobile} />

          <HStack flexDirection={isMobile ? "column" : "row"} width={"100%"}>
            <CallInformation data={data} />
            <PatientDetailSection isMobile={isMobile} data={data} />
          </HStack>

          <PatientHistory isMobile={isMobile} />
        </VStack>
      </HStack>
    </VStack>
  );
}

export const meta: MetaFunction = () => {
  const title = "داشبورد پزشکان | بایوآرک";
  const description =
    "با بایوآرک پزشکان و بیماران به راحتی با هم ارتباط برقرار کنند.";
  return [
    {
      title: title,
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "description",
      content: description,
    },
  ];
};
