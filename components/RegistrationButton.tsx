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
import { UserPlus, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

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
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);

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
          setIsLoading(false);
          return;
        }

        resetFormData();
        setOpen(false);
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (error) {
      alert("An unexpected error occurred. Please try again later.");
      console.error("Error during registration:", error);
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full border-blue-500 text-blue-500 hover:bg-blue-50 font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          <UserPlus className="mr-2 h-5 w-5" />
          Register
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Register as Student</DialogTitle>
          <DialogDescription>
            Enter your details to create a new account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(formData).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Label htmlFor={key} className="capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </Label>
              {key === "department" ? (
                <Select
                  value={value}
                  onValueChange={(value) => handleSelectChange(key, value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder={`Select ${key}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {allDepartments.map((department, idx) => (
                      <SelectItem key={idx} value={department}>
                        {department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : key === "year" ? (
                <Select
                  value={value}
                  onValueChange={(value) => handleSelectChange(key, value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder={`Select ${key}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4].map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}st Year
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id={key}
                  name={key}
                  type={key === "password" ? "password" : "text"}
                  value={value}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              )}
            </motion.div>
          ))}
          {errors && <p className="text-red-500">{errors}</p>}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.8 }}
          >
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Register"
              )}
            </Button>
          </motion.div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
