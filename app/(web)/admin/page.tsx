"use client";

import { useState } from "react";
import { User, FileText, Book, Lock } from "lucide-react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import AddProfessor from "@/components/admin/AddProfessor";
import AddExam from "@/components/admin/AddExam";
import AddSubject from "@/components/admin/AddSubject";
import { UpdatePassword } from "@/components/UpdatePassword";

export default function Dashboard() {
  const [activeView, setActiveView] = useState("addProfessor");

  const sidebarItems = [
    { icon: User, label: "Add Professor", value: "addProfessor" },
    { icon: FileText, label: "Add Exam", value: "addExam" },
    { icon: Book, label: "Add Subject", value: "addSubject" },
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
          <Header/>
          <main className="p-6">
            {activeView === "addProfessor" && <AddProfessor />}
            {activeView === "addExam" && <AddExam />}
            {activeView === "addSubject" && <AddSubject />}
            {activeView === "updatePassword" && <UpdatePassword />}
          </main>
        </div>
        <SidebarInset className="flex-1 overflow-auto"></SidebarInset>
      </div>
    </SidebarProvider>
  );
}