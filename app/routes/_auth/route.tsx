import { Outlet } from "@remix-run/react";
import { Card } from "~/components/ui/card";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="max-w-md w-full space-y-8 p-8">
        <Outlet />
        <div className="mt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </Card>
    </div>
  );
}
