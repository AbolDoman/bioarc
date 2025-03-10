import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
async function login(email: unknown, password: unknown) {
  let response = null;
  response = await fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response || !response.ok) {
    return { email: "", token: "" };
  }
  const data = await response.json();
  return { email: JSON.stringify(email), token: data.token };
}

interface User {
  email: string;
  token: string;
}
export const authenticator = new Authenticator<User>();
authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");
    const data = await login(email, password);
    console.log("data", data);
    return data;
  }),
  "user-pass"
);
