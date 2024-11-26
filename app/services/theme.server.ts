import { createCookieSessionStorage } from "@remix-run/node";

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    secure: import.meta.env.PROD,
    secrets: [import.meta.env.COOKIE_SECRET ?? ""],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

export async function getTheme(request: Request) {
  const session = await themeStorage.getSession(request.headers.get("Cookie"));
  const theme = session.get("theme");
  return theme || "light";
}

export async function setTheme(request: Request, theme: "dark" | "light") {
  const session = await themeStorage.getSession(request.headers.get("Cookie"));
  session.set("theme", theme);
  return themeStorage.commitSession(session);
}
