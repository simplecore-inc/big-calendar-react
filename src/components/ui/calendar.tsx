"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { getDateLocale } from "@/lib/date-locale";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, locale: propsLocale, ...props }: CalendarProps) {
  const { i18n } = useTranslation();
  const locale = propsLocale || getDateLocale(i18n.language);

  // Custom formatters for different language date formats
  const formatters = {
    formatCaption: (date: Date) => {
      // East Asian languages (Year first)
      if (i18n.language === "ko") {
        return format(date, "yyyy년 M월", { locale });
      }
      if (i18n.language === "ja") {
        return format(date, "yyyy年M月", { locale });
      }
      if (i18n.language === "zh" || i18n.language === "zh-CN" || i18n.language === "zh-TW") {
        return format(date, "yyyy年M月", { locale });
      }

      // European languages (various formats)
      if (i18n.language === "de") {
        return format(date, "MMMM yyyy", { locale });
      }
      if (i18n.language === "fr") {
        return format(date, "MMMM yyyy", { locale });
      }
      if (i18n.language === "es") {
        return format(date, "MMMM 'de' yyyy", { locale });
      }
      if (i18n.language === "it") {
        return format(date, "MMMM yyyy", { locale });
      }
      if (i18n.language === "pt" || i18n.language === "pt-BR") {
        return format(date, "MMMM 'de' yyyy", { locale });
      }
      if (i18n.language === "ru") {
        return format(date, "LLLL yyyy", { locale });
      }
      if (i18n.language === "nl") {
        return format(date, "MMMM yyyy", { locale });
      }

      // Middle Eastern & South Asian languages
      if (i18n.language === "ar") {
        return format(date, "MMMM yyyy", { locale });
      }
      if (i18n.language === "hi") {
        return format(date, "MMMM yyyy", { locale });
      }

      // Southeast Asian languages
      if (i18n.language === "th") {
        return format(date, "MMMM yyyy", { locale });
      }
      if (i18n.language === "vi") {
        return format(date, "'Tháng' M 'năm' yyyy", { locale });
      }
      if (i18n.language === "id") {
        return format(date, "MMMM yyyy", { locale });
      }

      // Nordic languages
      if (i18n.language === "sv") {
        return format(date, "MMMM yyyy", { locale });
      }
      if (i18n.language === "fi") {
        return format(date, "MMMM yyyy", { locale });
      }
      if (i18n.language === "da") {
        return format(date, "MMMM yyyy", { locale });
      }
      if (i18n.language === "no" || i18n.language === "nb") {
        return format(date, "MMMM yyyy", { locale });
      }

      // Eastern European languages
      if (i18n.language === "pl") {
        return format(date, "LLLL yyyy", { locale });
      }
      if (i18n.language === "cs") {
        return format(date, "LLLL yyyy", { locale });
      }
      if (i18n.language === "hu") {
        return format(date, "yyyy. MMMM", { locale });
      }

      // Turkish
      if (i18n.language === "tr") {
        return format(date, "MMMM yyyy", { locale });
      }

      // Default to English format
      return format(date, "MMMM yyyy", { locale });
    },
    formatWeekdayName: (date: Date) => {
      return format(date, "EEE", { locale });
    },
  };

  return (
    <DayPicker
      locale={locale}
      formatters={formatters}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(buttonVariants({ variant: "ghost" }), "h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
        day_range_end: "day-range-end",
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="size-4" />,
        IconRight: () => <ChevronRight className="size-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
