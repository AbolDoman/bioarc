import { useState, useCallback, memo } from "react";
import { authenticator } from "~/auth.server";
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useSubmit } from "@remix-run/react";
import { sessionStorage } from "~/sessions.server";
import { useTranslation } from "react-i18next";

const LoginForm = memo(
  ({
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    error,
    t,
  }: {
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    error: string;
    t: (key: string) => string;
  }) => (
    <>
      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-600">{t("email")}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600">{t("password")}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        >
          {t("login")}
        </button>
      </form>
      {error && <p className="mt-2 text-red-500 text-center">{error}</p>}
    </>
  )
);

LoginForm.displayName = "LoginForm";

const LoginHints = memo(({ t }: { t: (key: string) => string }) => (
  <>
    <p className="mt-4 text-lg text-gray-600">{t("loginSubtitle")}</p>
    <p style={{ direction: "ltr" }} className="mt-4 text-lg text-gray-600">
      {t("hintEmail")}
    </p>
    <p style={{ direction: "ltr" }} className="mt-4 text-lg text-gray-600">
      {t("hintPassword")}
    </p>
  </>
));

LoginHints.displayName = "LoginHints";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const submit = useSubmit();
  const { t } = useTranslation();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // Validation check
      if (email !== "eve.holt@reqres.in" || password !== "cityslicka") {
        setError(t("errorMessage"));
        return;
      }

      submit(
        {
          email: email,
          password: password,
        },
        {
          action: "/login",
          method: "post",
          encType: "application/x-www-form-urlencoded",
        }
      );
    },
    [email, password, t, submit]
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          {t("loginTitle")}
        </h2>

        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          error={error}
          t={t}
        />

        <LoginHints t={t} />
      </div>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  // Extract form data before authentication
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Basic validation before authentication to reduce server load
  if (!email || !password) {
    return json({ error: "Email and password are required" }, { status: 400 });
  }

  try {
    const user = await authenticator.authenticate("user-pass", request);

    if (!user.token) {
      return redirect("/login");
    }

    const session = await sessionStorage.getSession(
      request.headers.get("cookie")
    );

    // Only store necessary user data in session
    session.set("user", {
      token: user.token,
      id: user.id,
      role: user.role,
    });

    return redirect("/doctorDashboard", {
      headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
    });
  } catch (error) {
    return json({ error: "Authentication failed" }, { status: 401 });
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await sessionStorage.getSession(
    request.headers.get("cookie")
  );

  const userToken = session.get("user")?.token;

  if (userToken) {
    return redirect("/doctorDashboard");
  }

  return json(null);
}
