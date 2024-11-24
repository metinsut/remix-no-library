import { createCookie, redirect } from "@remix-run/node";

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
  const token = await authCookie.parse(request.headers.get("Cookie"));

  if (!token) {
    return redirectToLogin();
  }

  const user = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "John Doe", email: "john.doe@example.com", token: "token" });
    }, 1000);
  });

  if (!user) {
    return redirectToLogin();
  }

  return user;
}
