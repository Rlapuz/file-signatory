import { FacultyMember } from "@/components/admin-components/local/FacultyMember";
import React from "react";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Meneses | Admin Accounts",
};

export const AccountPage = () => {
  return (
    <>
      <ToastContainer />
      <FacultyMember />
    </>
  );
};

export default AccountPage;
