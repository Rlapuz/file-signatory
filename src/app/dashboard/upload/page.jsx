import { Filestack } from "@/components/local/Filestack";
import { UploadCare } from "@/components/local/UploadCare";
import React from "react";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Meneses | Upload",
};

export const UploadPage = () => {
  return (
    <>
      {/* <UploadCare /> */}
      <ToastContainer />
      <Filestack />
    </>
  );
};

export default UploadPage;
