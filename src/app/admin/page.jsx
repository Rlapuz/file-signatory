import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { DashboardAdmin } from "@/components/admin-components/local/DashboardAdmin";

export const AdminPage = async () => {
  const session = await getServerSession(authOptions);

  if (session.user.role !== "admin") {
    return (
      <section>
        <h1>You are not authorized here!!!</h1>
      </section>
    );
  }

  return (
    <>
      <DashboardAdmin />
    </>
  );
};

export default AdminPage;
