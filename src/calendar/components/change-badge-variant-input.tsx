import { useTranslation } from "react-i18next";
import { useCalendarPreferences } from "@/stores/calendar-store";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ChangeBadgeVariantInput() {
  const { t } = useTranslation('calendar');
  const { badgeVariant, setBadgeVariant } = useCalendarPreferences();

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold">Change badge variant</p>

      <Select value={badgeVariant} onValueChange={setBadgeVariant}>
        <SelectTrigger className="w-48" aria-label={t("accessibility.selectBadgeVariant")}>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="dot">Dot</SelectItem>
          <SelectItem value="colored">Colored</SelectItem>
          <SelectItem value="mixed">Mixed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
