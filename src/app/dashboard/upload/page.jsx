import { Filestack } from "@/components/local/Filestack";
import { UploadCare } from "@/components/local/UploadCare";
import React from "react";

export const metadata = {
  title: "Meneses | Upload",
};

export const UploadPage = () => {
  return (
    <>
      {/* <UploadCare /> */}
      <Filestack />
    </>
  );
};

export default UploadPage;
