import Sidebar from "@/components/admin/Sidebar";
import { getCurrentUser } from "../server-actions/getCurrentUser";

async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await getCurrentUser();
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
}

export default AdminLayout;
