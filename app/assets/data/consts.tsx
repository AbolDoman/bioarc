import { PhoneOutgoing, SquareRadical } from "lucide-react";

export const patientsName = [
  { name: "مهدی غفاری", id: "123456" },
  { name: "علی احمدی", id: "234567" },
  { name: "زهرا نیکو", id: "345678" },
];
export const doctorTopMenuItems = [
  "پنل من ",
  "سرویس‌ها",
  "درمان",
  "مالی",
  "مدیریت",
];
export const doctorSideMenu = [
  { title: "داشبورد", icon: <SquareRadical size={"18px"} /> },
  {
    title: "تماس خروجی",
    icon: <PhoneOutgoing size={"18px"} color={"#5178F5"} />,
  },
  { title: "افزودن نوبت", icon: <SquareRadical size={"18px"} /> },
  { title: "وظایف", icon: <SquareRadical size={"18px"} /> },
  { title: "بیماران", icon: <SquareRadical size={"18px"} /> },
  { title: "کارمندان", icon: <SquareRadical size={"18px"} /> },
  { title: "تاریخچه تماس‌ها", icon: <SquareRadical size={"18px"} /> },
];
export const patientsNameEn = [
  { name: "Mehdi Ghaffari", id: "123456" },
  { name: "Ali Ahmadi", id: "234567" },
  { name: "Zahra Nikoo", id: "345678" },
];
export const doctorTopMenuItemsEn = [
  "My Panel",
  "Services",
  "Treatment",
  "Finance",
  "Management",
];
export const doctorSideMenuEn = [
  { title: "Dashboard", icon: "<SquareRadical size={'18px'} />" },
  {
    title: "Outgoing Calls",
    icon: "<PhoneOutgoing size={'18px'} color={'#5178F5'} />",
  },
  { title: "Add Appointment", icon: "<SquareRadical size={'18px'} />" },
  { title: "Tasks", icon: "<SquareRadical size={'18px'} />" },
  { title: "Patients", icon: "<SquareRadical size={'18px'} />" },
  { title: "Staff", icon: "<SquareRadical size={'18px'} />" },
  { title: "Call History", icon: "<SquareRadical size={'18px'} />" },
];
export const DEFAULT_PATIENT_INDEX = 0;
export const clinics = [
  "بیمارستان شریعتی",
  "بیمارستان امدادی",
  "بیمارستان امید",
  "بیمارستان الغدیر",
];
export const doctors = [
  "محمود اکبریان",
  "اکبر محمودیان",
  "ابوالفضل کبیری",
  "کبیر ابوالفضلی",
];
export const medicineType = ["روماتولوژی", "نوع 2 ", "نوع 3"];
export const clinicsEn = [
  "Shariati Hospital",
  "Emdadi Hospital",
  "Omid Hospital",
  "Al-Ghadir Hospital",
];
export const doctorsEn = [
  "Mahmoud Akbariyan",
  "Akbar Mahmoudian",
  "Abolfazl Kabiri",
  "Kabir Abolfazli",
];
export const medicineTypeEn = ["Rheumatology", "Type 2", "Type 3"];
export enum AppointmentTyps {
  RESERVED,
  CANCELD,
  HELD,
  MOVED,
}
export const patientHistoryMenu = [
  {
    label: "تاریخچه نوبت‌های بیمار",
    type: "Appointment",
    items: [
      {
        doctorName: "دکتر مهدی هاشمی راد",
        DoctorSpecialty: "متخصص گلوگوم",
        status: AppointmentTyps.RESERVED,
        date: "۱۴۰۲/۰۸/۱۶",
      },
      {
        doctorName: "دکتر مهدی هاشمی راد",
        DoctorSpecialty: "متخصص گلوگوم",
        status: AppointmentTyps.CANCELD,
        date: "۱۴۰۲/۵/۱۲",
      },
      {
        doctorName: "دکتر مهدی هاشمی راد",
        DoctorSpecialty: "متخصص گلوگوم",
        status: AppointmentTyps.HELD,
        date: "سه ماه پیش",
      },
      {
        doctorName: "دکتر مهدی هاشمی راد",
        DoctorSpecialty: "متخصص گلوگوم",
        status: AppointmentTyps.MOVED,
        date: "یک سال پیش",
      },
      {
        doctorName: "دکتر مهدی هاشمی راد",
        DoctorSpecialty: "متخصص گلوگوم",
        status: AppointmentTyps.HELD,
        date: "یک سال پیش",
      },
    ],
  },
  { label: "تاریخچه تماس‌های بیمار", type: "Call", items: undefined },
  { label: "اطلاعات تکمیلی بیمار", type: "Information", items: undefined },
];
export const patientHistoryMenuEn = [
  {
    label: "Patient Appointment History",
    type: "Appointment",
    items: [
      {
        doctorName: "Dr. Mehdi Hashemi Rad",
        DoctorSpecialty: "Glaucoma Specialist",
        status: AppointmentTyps.RESERVED,
        date: "1402/08/16",
      },
      {
        doctorName: "Dr. Mehdi Hashemi Rad",
        DoctorSpecialty: "Glaucoma Specialist",
        status: AppointmentTyps.CANCELD,
        date: "1402/05/12",
      },
      {
        doctorName: "Dr. Mehdi Hashemi Rad",
        DoctorSpecialty: "Glaucoma Specialist",
        status: AppointmentTyps.HELD,
        date: "Three months ago",
      },
      {
        doctorName: "Dr. Mehdi Hashemi Rad",
        DoctorSpecialty: "Glaucoma Specialist",
        status: AppointmentTyps.MOVED,
        date: "One year ago",
      },
      {
        doctorName: "Dr. Mehdi Hashemi Rad",
        DoctorSpecialty: "Glaucoma Specialist",
        status: AppointmentTyps.HELD,
        date: "One year ago",
      },
    ],
  },
  { label: "Patient Call History", type: "Call", items: null },
  { label: "Additional Patient Information", type: "Information", items: null },
];
