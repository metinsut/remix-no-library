// import { useFetcher, useNavigation } from "@remix-run/react";
// import { useTranslation } from "react-i18next";
import { Card } from "~/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "~/components/ui/select";
// import { languageEnums } from "~/core/language/i18n-config";

export function Language() {
  // const { t, i18n } = useTranslation();
  // const navigation = useNavigation();
  // const fetch = useFetcher();

  // const items = [
  //   { id: "lang-tr", value: languageEnums.TR, label: t(`language_${languageEnums.TR}`) },
  //   { id: "lang-en", value: languageEnums.EN, label: t(`language_${languageEnums.EN}`) },
  // ];

  // const isChanging = navigation.state === "submitting";

  // const handleChange = (value: string) => {
  //   fetch.submit({ lang: value }, { method: "post" });
  // };

  return (
    <Card className="grid items-start justify-start gap-2 p-4">
      {/* <fieldset className="space-y-4" disabled={isChanging}>
        <legend className="text-sm font-medium leading-none text-foreground">
          {t("current_language")}: {i18n.language}
        </legend>
        <Select defaultValue={i18n.language} name="lang" onValueChange={handleChange}>
          <SelectTrigger>
            <SelectValue placeholder={t("select_language")} />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.id} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </fieldset> */}
    </Card>
  );
}
