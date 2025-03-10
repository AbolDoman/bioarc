import { createCookieSessionStorage } from "@remix-run/node";

// Create a session storage system
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session", // Cookie name
    secrets: ["your-secret-key"], // Change this to a strong secret
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  },
});

// Helper functions
export const getSession = (request: Request) => {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
};

export const commitSession = (session: any) => {
  return sessionStorage.commitSession(session);
};

export const destroySession = (session: any) => {
  return sessionStorage.destroySession(session);
};
