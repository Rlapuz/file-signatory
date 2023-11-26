import { ViewFiles } from "@/components/local/ViewFiles";
import React from "react";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Meneses | ViewFIles",
};

export const ViewFilesPage = () => {
  return (
    <>
      <ToastContainer />
      <ViewFiles />
    </>
  );
};

export default ViewFilesPage;
