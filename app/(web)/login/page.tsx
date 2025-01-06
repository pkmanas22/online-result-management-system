"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginButton from "@/components/LoginButton";
import RegistrationButton from "@/components/RegistrationButton";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const navigateToLandingPage = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl space-y-12"
      >
        <header
          className="flex items-center justify-center space-x-4 bg-white bg-opacity-80 backdrop-blur-md shadow-lg rounded-2xl p-6 cursor-pointer"
          onClick={navigateToLandingPage} // Navigate to landing page when clicked
        >
          <Image
            src="/logo.png"
            width={80}
            height={80}
            className="rounded-full"
            alt="OUTR Logo"
          />
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 text-center">
            ODISHA UNIVERSITY OF TECHNOLOGY AND RESEARCH
          </h1>
          <Image
            src="/logo.png"
            width={80}
            height={80}
            className="rounded-full"
            alt="OUTR Logo"
          />
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 h-60">
          {["Student", "Faculty", "Admin"].map((role, index) => (
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white bg-opacity-80 backdrop-blur-md shadow-lg border-0 overflow-hidden h-full">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
                  <CardTitle className="text-2xl md:text-3xl font-bold text-center">
                    {role}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-3 p-6 py-10">
                  <LoginButton role={role} />
                  {role === "Student" && <RegistrationButton />}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
