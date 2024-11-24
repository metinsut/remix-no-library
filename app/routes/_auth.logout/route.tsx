import { redirect } from "@remix-run/node";
import { authCookie } from "~/services/auth.server";
import { RoutePaths } from "../route-path";

export async function loader() {
  const headers = new Headers();
  headers.append("Set-Cookie", await authCookie.serialize("", { maxAge: 0 }));

  throw redirect(RoutePaths.login, { headers });
}
