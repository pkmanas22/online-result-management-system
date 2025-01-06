"use client";

import { useState } from "react";
import { Users, BarChart } from "lucide-react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import { UploadMarks } from "@/components/faculty/UploadMarks";
import { UpdatePassword } from "@/components/faculty/UpdatePassword";

export default function Dashboard() {
  const [activeView, setActiveView] = useState("");

  const sidebarItems = [
    { icon: BarChart, label: "Upload marks", value: "uploadMarks" },
    { icon: Users, label: "Update Password", value: "updatePassword" },
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        <AppSidebar
          items={sidebarItems}
          activeView={activeView}
          setActiveView={setActiveView}
        />
        <div className="flex flex-col w-screen overflow-y-scroll">
          <Header />
          <main className="p-6">
            {activeView === "uploadMarks" && <UploadMarks />}
            {activeView === "updatePassword" && <UpdatePassword />}
          </main>
        </div>
        <SidebarInset className="flex-1 overflow-auto"></SidebarInset>
      </div>
    </SidebarProvider>
  );
}