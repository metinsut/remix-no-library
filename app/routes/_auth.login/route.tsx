import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { z } from "zod";
import { InputForm } from "~/components/form";
import { Button } from "~/components/ui";
import { authCookie } from "~/services/auth.server";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await new Promise<{ accessToken: string; userId: number; message?: string }>(
    (resolve) => {
      setTimeout(() => {
        resolve({ accessToken: "token", userId: 1 });
      }, 1000);
    },
  );

  if (data.accessToken) {
    const cookie = await authCookie.serialize(data.accessToken);

    const headers = new Headers();
    headers.append("Set-Cookie", cookie);

    return redirect("/", { headers });
  }

  return submission.reply({
    formErrors: [data?.message ?? "Invalid email or password"],
  });
}

export default function Login() {
  const navigation = useNavigation();
  const loginAction = useActionData<typeof action>();

  const [form, fields] = useForm({
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    lastResult: loginAction,
    onValidate: ({ formData }) => parseWithZod(formData, { schema }),
  });

  const isLoading = navigation.state === "loading" || navigation.state === "submitting";

  return (
    <>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">Login to your account</h2>

      <Form method="post" className="mt-8 space-y-6" id={form.id} onSubmit={form.onSubmit}>
        {form.errors && <div className="text-sm text-error">{form.errors.join(", ")}</div>}

        <div className="space-y-4">
          <InputForm
            meta={fields.email}
            type="email"
            label="Email"
            placeholder="Enter your email"
            autoComplete="email"
          />

          <InputForm
            meta={fields.password}
            type="password"
            label="Password"
            placeholder="Enter your password"
            autoComplete="current-password"
          />

          <div className="flex items-center justify-between">
            <Link
              to="/forgot-password"
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        <Button variant="outline" type="submit" isLoading={isLoading} className="w-full">
          Login
        </Button>
      </Form>
    </>
  );
}
