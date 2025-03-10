export const fetchPatient = async (id: string, lang) => {
  const response = await fetch(`/api/patientProfile?id=${id}&lang=${lang}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  return response.json(); // Convert response to JSON
};
export const converting = (cDate: string) => {
  return cDate
    .replace("Friday", "جمعه")
    .replace("Saturday", "شنبه")
    .replace("Sunday", "یکشنبه")
    .replace("Monday", "دوشنبه")
    .replace("Tuesday", "سشنبه")
    .replace("Wednesday", "چهارشنبه")
    .replace("Thursday", "پنجشنبه")
    .replace("Esfand", "اسفند");
};
