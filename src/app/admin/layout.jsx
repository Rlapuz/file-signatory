import { Footer } from "@/components/global/Footer";
import { SidebarAdmin } from "@/components/admin-components/global/SidebarAdmin";
import { NavbarAdmin } from "@/components/admin-components/global/NavbarAdmin";

export const AdminLayout = ({ children }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex gap-3">
          <SidebarAdmin />
          <div className="w-full flex flex-col gap-7">
            <NavbarAdmin />
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
