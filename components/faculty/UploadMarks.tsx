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

interface Exam {
  _id: string;
  examName: string;
  subjectCode: string;
  department: string;
  totalMarks: number;
  year: string;
  date: string;
}

export function UploadMarks() {
  const [rollNo, setRollNo] = useState("");
  const [studentName, setStudentName] = useState("");
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [securedMarks, setSecuredMarks] = useState("");

  useEffect(() => {
    // Simulate fetching exams
    const mockExams: Exam[] = [
      {
        _id: "exam1",
        examName: "Mathematics",
        subjectCode: "MATH101",
        department: "Science",
        totalMarks: 100,
        year: "2025",
        date: "2025-01-10",
      },
      {
        _id: "exam2",
        examName: "Physics",
        subjectCode: "PHY101",
        department: "Science",
        totalMarks: 100,
        year: "2025",
        date: "2025-01-15",
      },
    ];
    setExams(mockExams);
  }, []);

  useEffect(() => {
    // Simulate fetching student name
    if (rollNo == "2580") {
      setStudentName("John Doe");
    } else {
      setStudentName("");
    }
  }, [rollNo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy submit logic
    console.log("Marks uploaded:", {
      rollNo,
      studentName,
      selectedExam,
      securedMarks,
    });
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
          {studentName && (
            <div className="space-y-2">
              <Label>Student Name</Label>
              <p className="text-sm font-medium">{studentName}</p>
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
                    {exam.examName} - {exam.subjectCode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedExam && (
            <>
              <div className="space-y-2">
                <Label>Department: </Label>
                <span className="text-sm font-medium">
                  {exams.find((exam) => exam._id === selectedExam)?.department}
                </span>
              </div>
              <div className="space-y-2">
                <Label>Total Marks: </Label>
                <span className="text-sm font-medium">
                  {exams.find((exam) => exam._id === selectedExam)?.totalMarks}
                </span>
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
