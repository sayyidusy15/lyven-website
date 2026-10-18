import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminDashboard from "./AdminDashboard";
import { getAdminUser } from "../../lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin Workspace | Lyven",
  description: "Private Lyven content workspace.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await getAdminUser())) redirect("/admin/login");
  return <AdminDashboard />;
}
