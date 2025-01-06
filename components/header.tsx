"use client";

import { Bell, ChevronDown, User, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Header() {
  const { data: session } = useSession()
  const router = useRouter();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-background border-b">
      <div className="flex items-center space-x-4">
        <SidebarTrigger />
        {session?.user?.name && (
          <h1 className="text-2xl font-bold">Welcome, {session?.user?.name}</h1>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <Button
          onClick={() => {
            router.push("/dashboard");
          }}
          variant="ghost"
          size="icon"
        >
          <Home className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>{session?.user?.name || ""}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                await signOut({ callbackUrl: "/login" });
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
