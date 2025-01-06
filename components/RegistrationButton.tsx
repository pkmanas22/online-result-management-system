"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { allDepartments } from "@/lib/types";
import { signIn } from "next-auth/react";

export default function RegistrationButton() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    year: "",
    department: "",
    contactNumber: "",
    rollNo: "",
  });

  const [errors, setErrors] = useState<string | null>(null);

  const resetFormData = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      year: "",
      department: "",
      contactNumber: "",
      rollNo: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Registration successful", data);

        const res = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          role: "student",
          callbackUrl: `/student`,
          redirect: true,
        });

        if (res?.error) {
          alert("Invalid credentials");
          return;
        }

        // Reset form data after successful login
        resetFormData();
        setOpen(false);
      } else {
        setErrors(data.error || "Registration failed");
      }
    } catch (error) {
      setErrors("An unexpected error occurred. Please try again later.");
      console.error("Error during registration:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full border-gray-800 text-gray-800 hover:bg-gray-100"
        >
          Register
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Register as Student</DialogTitle>
          <DialogDescription>
            Enter your details to create a new account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="contactNumber">Phone Number</Label>
            <Input
              id="contactNumber"
              name="contactNumber"
              type="tel"
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="rollNo">Roll Number</Label>
            <Input
              id="rollNo"
              name="rollNo"
              type="text"
              value={formData.rollNo}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="department">Department</Label>
            <Select
              value={formData.department}
              onValueChange={(value) => handleSelectChange("department", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {allDepartments.map((department, idx) => (
                  <SelectItem key={idx} value={department}>
                    {department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="year">Year</Label>
            <Select
              value={formData.year}
              onValueChange={(value) => handleSelectChange("year", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1st Year</SelectItem>
                <SelectItem value="2">2nd Year</SelectItem>
                <SelectItem value="3">3rd Year</SelectItem>
                <SelectItem value="4">4th Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {errors && <p className="text-red-500">{errors}</p>}
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
