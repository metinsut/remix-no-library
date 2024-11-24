import { createCookie, redirect } from "@remix-run/node";

export const userIdCookie = createCookie("userId", {
  httpOnly: true,
  path: "/",
  sameSite: "lax",
  secure: import.meta.env.PROD,
  secrets: [import.meta.env.COOKIE_SECRET ?? ""],
  maxAge: 60 * 60 * 24 * 30,
});

export const authCookie = createCookie("auth", {
  httpOnly: true,
  path: "/",
  sameSite: "lax",
  secure: import.meta.env.PROD,
  secrets: [import.meta.env.COOKIE_SECRET ?? ""],
  maxAge: 60 * 60 * 24 * 30,
});

export async function redirectToLogin() {
  throw redirect("/login", {
    headers: {
      "Set-Cookie": await authCookie.serialize("", { maxAge: 0 }),
    },
  });
}

export async function requireAuthCookie(request: Request) {
  const userId = await userIdCookie.parse(request.headers.get("Cookie"));

  if (!userId) {
    return redirectToLogin();
  }

  // const user = await api.get(`api/user/${userId}`, request);
  const user = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId });
    }, 1000);
  });

  if (!user) {
    return redirectToLogin();
  }

  return user;
}
