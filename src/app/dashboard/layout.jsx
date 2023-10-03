import { Footer } from "@/components/global/Footer";
import { Navbar } from "@/components/global/Navbar";
import { Sidebar } from "@/components/global/Sidebar";

export const Dashboardlayout = ({ children }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex gap-3">
          <Sidebar />
          <div className="w-full flex flex-col gap-7">
            <Navbar />
            {children}
          </div>
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Dashboardlayout;
