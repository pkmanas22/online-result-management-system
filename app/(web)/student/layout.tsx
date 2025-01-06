import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata = {
  title: "Student Dashboard",
  description: "Student dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
