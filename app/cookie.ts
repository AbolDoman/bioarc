import Cookies from "universal-cookie";

const cookies = new Cookies();
export async function saveSession(key: any, value: any) {
  const expirationDate = new Date();
  expirationDate.setMonth(expirationDate.getMonth() + 1); // 1 month expiration
  cookies.set(key, value, {
    path: "/",
    expires: expirationDate,
  });
}
