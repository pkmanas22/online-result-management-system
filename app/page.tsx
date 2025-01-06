"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <BackgroundBeamsWithCollision>
        <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
          Effortless Examination Management{" "}
          <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
            <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              <span className="">Seamlessly Simplified.</span>
            </div>
            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
              <span className="">Seamlessly Simplified.</span>
            </div>
          </div>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Manage results with ease using ExamEase. A fast, secure, and
            intuitive platform for students, professors, and administrators.
          </p>
          <Link href="/login">
          <button className="mt-6 py-3 px-6 bg-blue-700 text-white hover:bg-blue-600 rounded-md">
            Login Now
            </button>
          </Link>
        </h2>
      </BackgroundBeamsWithCollision>

      <main className="container mx-auto px-6 md:px-12 py-12">
        <HeroSection />
        <FeaturesSection />
      </main>

      <footer className="py-6 text-gray-700 text-sm text-center">
        <p>&copy; {new Date().getFullYear()} ExamEase. All rights reserved.</p>
      </footer>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="text-center mb-20">
      <h2 className="text-3xl font-semibold mb-4">
        Streamline Your Academic Results
      </h2>
      <p className="text-xl text-gray-600 mb-8">
        Efficient management for admins, professors, and students
      </p>
      <div className="w-32 h-32 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
        <span className="text-4xl">🎓</span>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "Admin Dashboard",
      description: "Add professors, subjects, and manage exams with ease.",
      icon: "👨‍💼",
    },
    {
      title: "Professor Portal",
      description: "Update student marks and manage course information.",
      icon: "👩‍🏫",
    },
    {
      title: "Student Access",
      description: "Create accounts and check results securely.",
      icon: "👨‍🎓",
    },
  ];

  return (
    <section className="mb-20">
      <h2 className="text-2xl font-semibold text-center mb-10">
        Features for Every Role
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="transition-shadow duration-300 hover:shadow-lg h-36">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="text-2xl mr-2">{feature.icon}</span>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
