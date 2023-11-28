import { NotifValidation } from "@/components/global/NotifValidation";
import Notif from "@/components/local/Notif";
import React from "react";

export const metadata = {
  title: "Meneses | Notifications",
};

export const NotificationsPage = () => {
  return (
    <>
      {/* <NotifValidation /> */}
      <Notif />
    </>
  );
};

export default NotificationsPage;
