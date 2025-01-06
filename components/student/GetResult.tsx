"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Exam {
  _id: string;
  examName: string;
}

interface Result {
  examName: string;
  subjectCode: string;
  totalMarks: number;
  marksObtained: number;
  studentName: string;
  rollNo: string;
}

export default function GetResult() {
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [result, setResult] = useState<Result | null>(null);

  const studentId = "100";

  const mockResults: Record<string, Result> = {
    exam1: {
      examName: "Mathematics",
      subjectCode: "MATH101",
      totalMarks: 100,
      marksObtained: 85,
      studentName: "John Doe",
      rollNo: studentId,
    },
    exam2: {
      examName: "Physics",
      subjectCode: "PHY101",
      totalMarks: 100,
      marksObtained: 78,
      studentName: "John Doe",
      rollNo: studentId,
    },
  };

  const handleExamSelect = (examId: string) => {
    setSelectedExam(examId);
    setResult(null);
  };

  const handleGetResult = async () => {
    if (selectedExam) {
      // Simulate fetching result
      const mockResult = mockResults[selectedExam];
      if (mockResult) {
        setResult(mockResult);
      } else {
        console.error("Failed to fetch result");
      }
    }
  };

  const calculatePercentage = () => {
    if (result) {
      return ((result.marksObtained / result.totalMarks) * 100).toFixed(2);
    }
    return "0.00";
  };

  const mockExams: Exam[] = [
    { _id: "exam1", examName: "Mathematics" },
    { _id: "exam2", examName: "Physics" },
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Get Your Result</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-6">
          <Select onValueChange={handleExamSelect}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select an exam" />
            </SelectTrigger>
            <SelectContent>
              {mockExams.map((exam) => (
                <SelectItem key={exam._id} value={exam._id}>
                  {exam.examName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleGetResult} disabled={!selectedExam}>
            Get My Result
          </Button>
        </div>

        {result && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exam Name</TableHead>
                <TableHead>Subject Code</TableHead>
                <TableHead>Total Marks</TableHead>
                <TableHead>Marks Obtained</TableHead>
                <TableHead>Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{result.examName}</TableCell>
                <TableCell>{result.subjectCode}</TableCell>
                <TableCell>{result.totalMarks}</TableCell>
                <TableCell>{result.marksObtained}</TableCell>
                <TableCell>{calculatePercentage()}%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
