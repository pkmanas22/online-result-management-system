import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata = {
  title: "Faculty Dashboard",
  description: "Faculty dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
