import { Retrieve } from "@/components/local/Retrieve";
import { RetrieveSignatory } from "@/components/local/RetrieveSignatory";
import React from "react";

export const metadata = {
  title: "Meneses | Retrieve",
};

export const RetrievePage = () => {
  return (
    <>
      <div className="flex flex-col gap-5">
        <div>
          <Retrieve />
        </div>
        <hr />
        <div>
          <RetrieveSignatory />
        </div>
      </div>
    </>
  );
};
export default RetrievePage;
