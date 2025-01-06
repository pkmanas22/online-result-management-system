"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";

interface Exam {
  _id: string;
  examName: string;
  subject: string;
  department: string;
  totalMarks: number;
  date: string;
}

interface Student {
  _id: string;
  name: string;
}

export function UploadMarks() {
  const [rollNo, setRollNo] = useState("");
  const [student, setStudent] = useState<Student | null>(null);
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [securedMarks, setSecuredMarks] = useState("");
  const [facultyDetails, setFacultyDetails] = useState<{
    department: string;
    subject: string;
  } | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      const fetchFacultyDetails = async () => {
        try {
          const res = await fetch(`/api/profile`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: session.user?.id,
              role: "faculty",
            }),
          });

          if (!res.ok) {
            throw new Error("Failed to fetch faculty details");
          }

          const data = await res.json();
          setFacultyDetails(data.user);
        } catch (error) {
          alert((error as Error).message || "Error occurred");
          // console.error("Error fetching faculty details:", error);
        }
      };

      fetchFacultyDetails();
    }
  }, [session]);

  useEffect(() => {
    if (facultyDetails) {
      const { department, subject } = facultyDetails;
      fetch(`/api/faculty/exams?department=${department}&subject=${subject}`)
        .then((res) => res.json())
        .then((data) => {
          setExams(data.exams);
        })
        .catch((error) => {
          alert((error as Error).message || "Error occurred");
          // console.error("Error fetching exams:", error);
        });
    }
  }, [facultyDetails]);

  useEffect(() => {
    if (rollNo) {
      // Fetch the student details based on the roll number
      fetch(`/api/faculty/getStudent?rollNo=${rollNo}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setStudent(data); // Set student object directly
          } else {
            setStudent(null);
          }
        })
        .catch((error) => {
          alert((error as Error).message || "Error occurred");
          // console.error("Error fetching student details:", error);
        });
    }
  }, [rollNo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/faculty/uploadMark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          examId: selectedExam,
          studentId: student ? student._id : "",
          securedMarks,
        }),
      });

      if (!res.ok) {
        // console.error("Failed to upload marks");
        return;
      }

      alert("Marks uploaded successfully");
      setRollNo("");
      setSelectedExam("");
      setSecuredMarks("");
      setStudent(null); // Clear student details after submission
    } catch (error) {
      alert((error as Error).message || "Error while submit");
      // console.error("Failed to upload marks", error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Upload Marks</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rollNo">Roll Number</Label>
            <Input
              id="rollNo"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              required
            />
          </div>
          {student && (
            <div className="space-y-2">
              <Label>Student Name</Label>
              <p className="text-sm font-medium">{student.name}</p>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="exam">Exam</Label>
            <Select value={selectedExam} onValueChange={setSelectedExam}>
              <SelectTrigger>
                <SelectValue placeholder="Select an exam" />
              </SelectTrigger>
              <SelectContent>
                {exams.map((exam) => (
                  <SelectItem key={exam._id} value={exam._id}>
                    {exam.examName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedExam && (
            <>
              <div className="space-y-2">
                <Label>Department</Label>
                <p className="text-sm font-medium">
                  {exams.find((exam) => exam._id === selectedExam)?.department}
                </p>
              </div>
              <div className="space-y-2">
                <Label>Subject</Label>
                <p className="text-sm font-medium">
                  {exams.find((exam) => exam._id === selectedExam)?.subject}
                </p>
              </div>
              <div className="space-y-2">
                <Label>Total Marks</Label>
                <p className="text-sm font-medium">
                  {exams.find((exam) => exam._id === selectedExam)?.totalMarks}
                </p>
              </div>
            </>
          )}
          <div className="space-y-2">
            <Label htmlFor="securedMarks">Secured Marks</Label>
            <Input
              id="securedMarks"
              type="number"
              value={securedMarks}
              onChange={(e) => setSecuredMarks(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Upload Marks
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
