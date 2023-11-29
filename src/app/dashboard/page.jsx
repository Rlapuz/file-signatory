import { DashboardAdmin } from "@/components/admin-components/local/DashboardAdmin";
import { Dashboard } from "@/components/local/Dashboard";
// import { Suspense } from "react";

export const metadata = {
  title: "Meneses | Dashboard",
};

const DashboardPage = () => {
  return (
    <>
      {/* <Dashboard /> */}
      <DashboardAdmin />
    </>
  );
};

export default DashboardPage;
