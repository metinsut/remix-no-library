import type { ActionFunctionArgs } from "@remix-run/node";
import { data } from "@remix-run/react";
// import { setLanguageCookie } from "~/services/i18n.server";
import { Language } from "./language";
import { Theme } from "./theme";

export const handle = {
  crumb: () => "Settings",
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const lang = formData.get("lang");

  if (typeof lang !== "string") {
    return data({ success: false }, { status: 400 });
  }

  // const cookie = await setLanguageCookie(lang);

  return data(
    { success: true },
    // {
    //   headers: {
    //     "Set-Cookie": cookie,
    //   },
    // },
  );
}

export default function Settings() {
  return (
    <div className="grid gap-4 justify-start" data-q="settings-page">
      <Theme />
      <Language />
    </div>
  );
}
