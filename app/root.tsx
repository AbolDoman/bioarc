import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { sessionStorage } from "./sessions.server";
import MyLayout from "./components/MyLayout";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Cookies from "universal-cookie";
import { useMemo, lazy, Suspense } from "react";
import "./tailwind.css";

// Create a singleton QueryClient instance to prevent unnecessary re-creations
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute cache
      refetchOnWindowFocus: false, // Prevent refetches on window focus
      retry: 1, // Limit retry attempts
    },
  },
});

const ReactQueryDevtoolsLazy = lazy(() =>
  import("@tanstack/react-query-devtools").then(({ ReactQueryDevtools }) => ({
    default: ReactQueryDevtools,
  }))
);

import font from "public/fonts/IRANsans.ttf?url";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: "/fonts/style.css" },
  {
    rel: "preload",
    href: font,
    as: "font",
    type: "font/ttf",
    crossOrigin: "anonymous",
  },
];

// Detect mobile devices server-side to prevent layout shifts
export async function loader({ request }: LoaderFunctionArgs) {
  // Fetch user session data
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const user = session.get("user");

  // Get language preference from cookies
  const cookies = new Cookies(request.headers.get("Cookie"), { path: "/" });
  const language = cookies?.get("lang") || "fa"; // Default to Farsi if not set

  // Detect mobile devices using user agent
  const userAgent = request.headers.get("user-agent");
  let isMobile = false;

  try {
    // Dynamic import to avoid loading the module unnecessarily
    const isMobilejs = await import("ismobilejs");
    const mobileDetect = isMobilejs.default.default(userAgent ?? "");
    isMobile = mobileDetect.any;
  } catch (error) {
    console.error("Mobile detection failed:", error);
    // Fallback to basic detection if module fails
    isMobile = Boolean(
      userAgent && /Android|iPhone|iPad|iPod|Mobile/i.test(userAgent)
    );
  }

  return json(
    {
      user: user,
      isMobile: isMobile,
      lang: language,
    },
    {
      // Set cache headers for better performance
      headers: {
        "Cache-Control": "private, max-age=5",
      },
    }
  );
}

// Loading fallback for lazy-loaded components
const DevToolsLoadingFallback = () => null; // Empty fallback for devtools

// Document layout component
export function Layout({ children }: { children: React.ReactNode }) {
  const { user, lang, isMobile } = useLoaderData<typeof loader>();

  // Set language once on load
  useMemo(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  // Determine text direction based on language
  const textDirection = useMemo(
    () => (i18n.language === "en" ? "ltr" : "rtl"),
    [i18n.language]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <html lang={i18n.language} dir={textDirection}>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="color-scheme" content="light" />
          <Meta />
          <Links />
        </head>
        <body
          style={{
            fontFamily: "IRANsans",
            margin: 0,
            backgroundColor: "white",
            color: "#424242",
          }}
          dir={textDirection}
        >
          <I18nextProvider i18n={i18n}>
            <Suspense fallback={<div className="app-loading-container"></div>}>
              <MyLayout isMobile={isMobile} user={user}>
                {children}
              </MyLayout>
            </Suspense>
          </I18nextProvider>
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" && (
            <Suspense fallback={<DevToolsLoadingFallback />}>
              <ReactQueryDevtoolsLazy initialIsOpen={false} />
            </Suspense>
          )}
        </body>
      </html>
    </QueryClientProvider>
  );
}

// Root App component
export default function App() {
  return <Outlet />;
}
