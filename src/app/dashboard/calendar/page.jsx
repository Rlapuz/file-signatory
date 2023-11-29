import { Calendar } from "@/components/local/Calendar";
import { CalendarClient } from "@/components/local/CalendarClient";
import React from "react";

export const metadata = {
  title: "Meneses | Calendar",
};

export const CalendarPage = () => {
  return (
    <>
      <Calendar />
      {/* <CalendarClient /> */}
    </>
  );
};

export default CalendarPage;
