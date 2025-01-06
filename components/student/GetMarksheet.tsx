"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Subject {
  subjectCode: string;
  subjectName: string;
  totalMarks: number;
  marksObtained: number;
}

interface Marksheet {
  studentName: string;
  rollNo: string;
  examName: string;
  subjects: Subject[];
}

export default function GetMarksheet() {
    const examName = "exam1";
    const studentId = "100";

  const [marksheet, setMarksheet] = useState<Marksheet | null>(null);

  const mockMarksheet: Record<string, Marksheet> = {
    exam1: {
      studentName: "John Doe",
      rollNo: studentId,
      examName: "Mathematics Exam 2025",
      subjects: [
        {
          subjectCode: "MATH101",
          subjectName: "Algebra",
          totalMarks: 100,
          marksObtained: 90,
        },
        {
          subjectCode: "MATH102",
          subjectName: "Calculus",
          totalMarks: 100,
          marksObtained: 85,
        },
        {
          subjectCode: "MATH103",
          subjectName: "Geometry",
          totalMarks: 100,
          marksObtained: 92,
        },
      ],
    },
    exam2: {
      studentName: "John Doe",
      rollNo: studentId,
      examName: "Physics Exam 2025",
      subjects: [
        {
          subjectCode: "PHY101",
          subjectName: "Mechanics",
          totalMarks: 100,
          marksObtained: 80,
        },
        {
          subjectCode: "PHY102",
          subjectName: "Thermodynamics",
          totalMarks: 100,
          marksObtained: 75,
        },
        {
          subjectCode: "PHY103",
          subjectName: "Electromagnetism",
          totalMarks: 100,
          marksObtained: 88,
        },
      ],
    },
  };

  const handleGetMarksheet = () => {
    const examMarksheet = mockMarksheet[examName];
    if (examMarksheet) {
      setMarksheet(examMarksheet);
    } else {
      console.error("Marksheet not found");
    }
  };

  const calculateTotalPercentage = (subjects: Subject[]) => {
    const totalMarks = subjects.reduce(
      (acc, subject) => acc + subject.totalMarks,
      0
    );
    const totalMarksObtained = subjects.reduce(
      (acc, subject) => acc + subject.marksObtained,
      0
    );
    return ((totalMarksObtained / totalMarks) * 100).toFixed(2);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Get Your Marksheet</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Button onClick={handleGetMarksheet}>
            Get Marksheet for {examName}
          </Button>
        </div>

        {marksheet && (
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {marksheet.studentName} - {marksheet.examName}
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject Code</TableHead>
                  <TableHead>Subject Name</TableHead>
                  <TableHead>Total Marks</TableHead>
                  <TableHead>Marks Obtained</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {marksheet.subjects.map((subject) => (
                  <TableRow key={subject.subjectCode}>
                    <TableCell>{subject.subjectCode}</TableCell>
                    <TableCell>{subject.subjectName}</TableCell>
                    <TableCell>{subject.totalMarks}</TableCell>
                    <TableCell>{subject.marksObtained}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 text-sm font-medium">
              <p>
                Total Percentage: {calculateTotalPercentage(marksheet.subjects)}
                %
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
