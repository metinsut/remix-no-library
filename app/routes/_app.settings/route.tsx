import { Language } from "./language";
import { Theme } from "./theme";

export const handle = {
  crumb: () => "Settings",
};

export default function Settings() {
  return (
    <div className="grid gap-4 justify-start" data-q="settings-page">
      <Theme />
      <Language />
    </div>
  );
}
