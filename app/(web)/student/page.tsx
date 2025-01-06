"use client";

import { useState } from "react";
import { Clipboard, Lock } from "lucide-react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import { UpdatePassword } from "@/components/UpdatePassword";
import GetMarksheet from "@/components/student/GetMarksheet";

export default function Dashboard() {
  const [activeView, setActiveView] = useState("getMarksheet");

  const sidebarItems = [
    { icon: Clipboard, label: "Get Marksheet", value: "getMarksheet" },
    { icon: Lock, label: "Update Password", value: "updatePassword" },
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
            {activeView === "getMarksheet" && <GetMarksheet />}
            {activeView === "updatePassword" && <UpdatePassword />}
          </main>
        </div>
        <SidebarInset className="flex-1 overflow-auto"></SidebarInset>
      </div>
    </SidebarProvider>
  );
}
