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
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <BackgroundBeamsWithCollision>
        <HeroSection />
      </BackgroundBeamsWithCollision>

      <main className="container mx-auto px-6 md:px-12 py-12">
        <FeaturesSection />
        <TestimonialsSection />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="text-center py-20 md:py-32 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-6"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
          Effortless Examination Management{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-500">
            Seamlessly Simplified
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Manage results with ease using ExamEase, OUTR. A fast, secure, and intuitive
          platform for students, professors, and administrators.
        </p>
        <div className="flex justify-center space-x-4">
          <Button
            asChild
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Link href="/login">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#features">Learn More</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "Admin Dashboard",
      description:
        "Add professors, subjects, and manage exams with ease. The intuitive dashboard allows admins to effortlessly oversee all exam-related activities.",
      icon: "👨‍💼",
    },
    {
      title: "Professor Portal",
      description:
        "Update student marks and manage course information. Professors can add or modify marks for students, as well as maintain course details with simple actions.",
      icon: "👩‍🏫",
    },
    {
      title: "Student Access",
      description:
        "Create accounts and check results securely. Students can easily view their marks, track progress, and stay up to date with their academic performance.",
      icon: "👨‍🎓",
    },
    {
      title: "Exam Scheduling",
      description:
        "Admins can schedule exams and set deadlines. Manage exam dates and times to ensure a seamless examination process.",
      icon: "📅",
    },
    {
      title: "Secure Data Storage",
      description:
        "All exam data is stored securely, ensuring privacy for students and integrity for exam results.",
      icon: "🔒",
    },
    {
      title: "Customizable Reports",
      description:
        "Generate customizable reports based on exam results, student performance, and more, making data analysis easy and efficient.",
      icon: "📊",
    },
  ];

  return (
    <section id="features" className="py-20">
      <h2 className="text-3xl font-bold text-center mb-12">
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
            <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <span className="text-3xl mr-3">{feature.icon}</span>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "ExamEase has revolutionized how we manage exams. It's intuitive and saves us so much time!",
      author: "Mr. Manjit Kumar Nayak",
      role: "Asst. Professor, School of Computer Science",
    },
    {
      quote:
        "As a student, I love how easy it is to access my results and track my progress throughout the semester.",
      author: "Manas Kumar Pradhan",
      role: "1st Year MCA Student",
    },
    {
      quote:
        "The admin features are comprehensive and have streamlined our entire examination process.",
      author: "Dr. Bibhuti Bhusan Biswal",
      role: "Vice Chancellor, OUTR",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 rounded-3xl">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-bold text-center mb-12">
          What People Are Saying
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <blockquote className="text-lg italic mb-4">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                  <footer>
                    <strong className="font-semibold">
                      {testimonial.author}
                    </strong>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </footer>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
