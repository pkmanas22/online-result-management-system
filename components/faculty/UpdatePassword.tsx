"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";

export function UpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {data : session} = useSession();
  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if(!session) {
        console.log("User is not logged in")
        return ;
      }
      const res = await fetch("api/faculty/updatePassword", {
        method: "POST",
        body: JSON.stringify({
          currentPassword,
          newPassword,
          id: session.user.id
        }),
      });
      console.log(res);
      console.log("data" , session);
      
      if(!res.ok) {
        console.log("Failed to update password");
        return;
      }else{
        alert("Password updated successfully");
        console.log("Password update submitted");
      }
    } catch (error) {
      console.log("Failed to update password", error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Update Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Update Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
