"use client";

import { useState } from "react";
import { Users, BarChart } from "lucide-react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import AddProfessor from "@/components/admin/AddProfessor";
import AddExam from "@/components/admin/AddExam";
import AddSubject from "@/components/admin/AddSubject";

export default function Dashboard() {
  const [activeView, setActiveView] = useState("addProfessor");

  const sidebarItems = [
    { icon: BarChart, label: "Add Professor", value: "addProfessor" },
    { icon: Users, label: "Add Exam", value: "addExam" },
    { icon: Users, label: "Add Subject", value: "addSubject" },
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
          <Header/>
          <main className="p-6">
            {activeView === "addProfessor" && <AddProfessor />}
            {activeView === "addExam" && <AddExam />}
            {activeView === "addSubject" && <AddSubject />}
          </main>
        </div>
        <SidebarInset className="flex-1 overflow-auto"></SidebarInset>
      </div>
    </SidebarProvider>
  );
}