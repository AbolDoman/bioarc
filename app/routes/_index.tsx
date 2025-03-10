import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { memo } from "react";

const DashboardLink = memo(({ to, label }: { to: string; label: string }) => (
  <Link
    to={to}
    className="bg-green-500 text-white px-6 py-2 rounded-lg text-lg font-medium hover:bg-green-600 transition"
    prefetch="intent"
  >
    {label}
  </Link>
));

DashboardLink.displayName = "DashboardLink";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-100 px-8">
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center mt-20 px-4">
        <p className="mt-4 text-lg text-gray-600">{t("gotoDashboard")}</p>

        <div className="mt-6 gap-4 flex">
          <DashboardLink to="/doctorDashboard" label={t("doctorDashbord")} />
        </div>
      </main>
    </div>
  );
}

export const meta: MetaFunction = () => {
  const title = "بایوآرک | همراه هوشمند بیماران";
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
