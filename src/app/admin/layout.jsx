import { Footer } from "@/components/global/Footer";
import { SidebarAdmin } from "@/components/admin-components/global/SidebarAdmin";
import { Navbar } from "@/components/global/Navbar";
import { Sidebar } from "@/components/global/Sidebar";

export const AdminLayout = ({ children }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex gap-3">
          {/* <Sidebar /> */}
          <SidebarAdmin />
          <div className="w-full flex flex-col gap-7">
            <Navbar />
            <main>{children}</main>
          </div>
        </div>
        <footer className="w-full">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default AdminLayout;
