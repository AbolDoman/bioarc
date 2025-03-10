import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { sessionStorage } from "~/sessions.server";

export async function action({ request }: ActionFunctionArgs) {
  const session = await sessionStorage.getSession(
    request.headers.get("cookie")
  );
  return redirect("/login", {
    headers: { "Set-Cookie": await sessionStorage.destroySession(session) },
  });
}
