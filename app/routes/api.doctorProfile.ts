import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";

// 📌 Handle GET requests
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const lang = url.searchParams.get("lang") ?? "fa";
  if (lang === "en") {
    return json({
      name: "dr mehdi vojdanian",
      newMessagesCount: "3",
      image:
        "https://bioarc.ir/uploads/Landing/clientfeedb/xclientfeedb_1632686700_vojdanian.jpg.pagespeed.ic.6IqWR_DnTX.webp",
      success: true,
    });
  } else {
    return json({
      name: "دکتر مهدی وجدانیان",
      newMessagesCount: "3",
      image:
        "https://bioarc.ir/uploads/Landing/clientfeedb/xclientfeedb_1632686700_vojdanian.jpg.pagespeed.ic.6IqWR_DnTX.webp",
      success: true,
    });
  }
}
