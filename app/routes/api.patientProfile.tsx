import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") ?? "0";
  const lang = url.searchParams.get("lang") ?? "fa";
  let patient: any = undefined;
  if (id) {
    patient = (
      lang === "en" ? patientInformationsEn : patientInformations
    ).find((patient) => patient.id === id);
  }
  return json(patient);
}

const patientInformations = [
  {
    id: "123456",
    full_name: "مهدی غفاری",
    profile_picture:
      "https://images.generated.photos/ETvAVQ7nhh8-43EetE3eH6dMvjwD6w_Mm2biNL8L7zg/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MjYxNDI5LmpwZw.jpg",
    birthday_date: "۱۳۷۱",
    age: "۳۲",
    gender: "مرد",
    national_id: "۰۰۱۲۳۴۵۶۷۸",
    phone_number: "۰۹۱۲۳۴۵۶۷۸۹",
    insurance: {
      type: "تأمین اجتماعی",
      id: "INS-۹۸۷۶۵۴",
      expiration_date: "۱۴۱۰/۰۱/۰۱",
    },
    supplementary_insurance: {
      name: "دانا",
    },
    considerations: ["به بیمار نوبت درمانگاه قرنیه داده نشود", "پرخاشگر"],
    is_new_patient: false,
  },
  {
    id: "234567",
    full_name: "علی احمدی",
    profile_picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIdoay7VbsVZzZ1bZkX4k0T77hp5sb_ciXdQ&s",
    birthday_date: "۱۳۶۵",
    age: "۳۸",
    gender: "مرد",
    national_id: "۰۰۲۳۴۵۶۷۸۹",
    phone_number: "۰۹۱۳۴۵۶۷۸۹۰",
    insurance: {
      type: "سلامت",
      id: "INS-۱۲۳۴۵۶",
      expiration_date: "۱۴۰۹/۱۲/۲۹",
    },
    supplementary_insurance: {
      name: "آتیه",
    },
    considerations: ["دارای سابقه آلرژی شدید", "نیاز به مراقبت ویژه"],
    is_new_patient: false,
  },
  {
    id: "345678",
    full_name: "زهرا نیکو",
    profile_picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuNztRO-WJKxSshp62w3hrDU26p98kRCdHiw&s",
    birthday_date: "۱۳۷۹",
    age: "۲۴",
    gender: "زن",
    national_id: "۰۰۳۴۵۶۷۸۹۰",
    phone_number: "۰۹۱۴۵۶۷۸۹۰۱",
    insurance: {
      type: "نیروهای مسلح",
      id: "INS-۷۶۵۴۳۲",
      expiration_date: "۱۴۱۲/۰۳/۱۵",
    },
    supplementary_insurance: {
      name: "ماهان",
    },
    considerations: ["حساسیت دارویی به پنی‌سیلین", "نیاز به مشاوره روانشناسی"],
    is_new_patient: false,
  },
];
const patientInformationsEn = [
  {
    id: "123456",
    full_name: "Mehdi Ghaffari",
    profile_picture:
      "https://images.generated.photos/ETvAVQ7nhh8-43EetE3eH6dMvjwD6w_Mm2biNL8L7zg/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MjYxNDI5LmpwZw.jpg",
    birthday_date: "1971",
    age: "32",
    gender: "Male",
    national_id: "0012345678",
    phone_number: "09123456789",
    insurance: {
      type: "Social Security",
      id: "INS-987654",
      expiration_date: "1410/01/01",
    },
    supplementary_insurance: {
      name: "Dana",
    },
    considerations: [
      "Do not schedule an appointment at the Cornea Clinic",
      "Aggressive behavior",
    ],
    is_new_patient: false,
  },
  {
    id: "234567",
    full_name: "Ali Ahmadi",
    profile_picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIdoay7VbsVZzZ1bZkX4k0T77hp5sb_ciXdQ&s",
    birthday_date: "1965",
    age: "38",
    gender: "Male",
    national_id: "0023456789",
    phone_number: "09134567890",
    insurance: {
      type: "Health Insurance",
      id: "INS-123456",
      expiration_date: "1409/12/29",
    },
    supplementary_insurance: {
      name: "Atieh",
    },
    considerations: ["History of severe allergy", "Requires special care"],
    is_new_patient: true,
  },
  {
    id: "345678",
    full_name: "Zahra Nikoo",
    profile_picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuNztRO-WJKxSshp62w3hrDU26p98kRCdHiw&s",
    birthday_date: "1979",
    age: "24",
    gender: "Female",
    national_id: "0034567890",
    phone_number: "09145678901",
    insurance: {
      type: "Armed Forces Insurance",
      id: "INS-765432",
      expiration_date: "1412/03/15",
    },
    supplementary_insurance: {
      name: "Mahan",
    },
    considerations: [
      "Drug allergy to penicillin",
      "Needs psychological consultation",
    ],
    is_new_patient: false,
  },
];
