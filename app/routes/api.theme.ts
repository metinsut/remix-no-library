import type { ActionFunctionArgs } from "@remix-run/node";
import { setTheme } from "~/services/theme.server";
import { data } from "@remix-run/react";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const theme = formData.get("theme") as "light" | "dark";

  if (theme !== "light" && theme !== "dark") {
    return data({ error: "Invalid theme" }, { status: 400 });
  }

  return data(
    { success: true },
    {
      headers: {
        "Set-Cookie": await setTheme(request, theme),
      },
    },
  );
}
