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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSession } from "next-auth/react";

interface ExamDetails {
  examName: string;
  department: string;
  subject: string;
  totalMarks: number;
  date: string;
}

interface Mark {
  examId: string;
  studentId: string;
  securedMarks: number;
  examDetails: ExamDetails;
}

export default function GetMarksheet() {
  const [marksheet, setMarksheet] = useState<Mark[] | null>(null);
  const [showCard, setShowCard] = useState(false); // State to control card visibility
  const [loading, setLoading] = useState(false); // State to track loading status
  const { data: session } = useSession();

  const handleGetMarksheet = async () => {
    try {
      setLoading(true); // Set loading to true when fetching starts
      const studentId = session?.user?.id as string;
      const response = await fetch(`/api/student/marks?id=${studentId}`);
      const data = await response.json();
      setMarksheet(data.marks);
      setShowCard(true); // Show the card after fetching marks
    } catch (error) {
      console.error("Failed to fetch marks:", error);
    } finally {
      setLoading(false); // Set loading to false when fetching ends
    }
  };

  const calculateTotalPercentage = (marks: Mark[]) => {
    const totalMarks = marks.reduce(
      (acc, mark) => acc + mark.examDetails.totalMarks,
      0
    );
    const totalSecuredMarks = marks.reduce(
      (acc, mark) => acc + mark.securedMarks,
      0
    );
    return ((totalSecuredMarks / totalMarks) * 100).toFixed(2);
  };

  const getGrade = (marks: number) => {
    if (marks >= 91) return "O";
    if (marks >= 80) return "A+";
    if (marks >= 70) return "A";
    if (marks >= 60) return "B+";
    if (marks >= 50) return "B";
    if (marks >= 40) return "C";
    return "F";
  };

  return (
    <>
      <div className="mb-6 text-center">
        <Button
          onClick={handleGetMarksheet}
          className="bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Get your Marksheet
        </Button>
      </div>

      {/* Show a spinner while loading */}
      {loading && (
        <div className="flex justify-center items-center my-6">
          <div className="animate-spin rounded-full border-t-2 border-b-2 border-indigo-600 w-12 h-12"></div>
        </div>
      )}

      {/* Show Card only if showCard is true */}
      {showCard && !loading && (
        <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
          {marksheet ? (
            <>
              <CardContent className="p-6">
                <CardHeader className="border-b border-gray-300 py-4 px-6 text-center">
                  <h2 className="text-3xl font-bold text-indigo-600">
                    Odisha University of Research & Technology, Bhubaneswar
                  </h2>
                  <p className="text-lg text-gray-500 mt-1">
                    ExamEase Portal - OUTR
                  </p>
                </CardHeader>
                <div>
                  <h3 className="text-xl font-semibold my-4 text-center">
                    Marksheet for {marksheet[0].examDetails.department} -{" "}
                    {marksheet[0].examDetails.examName}
                  </h3>
                  <Table className="shadow-md rounded-md overflow-hidden">
                    <TableHeader>
                      <TableRow className="bg-gray-100">
                        <TableHead className="py-3 px-4 text-sm text-left">
                          Subject
                        </TableHead>
                        <TableHead className="py-3 px-4 text-sm text-left">
                          Subject Code
                        </TableHead>
                        <TableHead className="py-3 px-4 text-sm text-left">
                          Total Marks
                        </TableHead>
                        <TableHead className="py-3 px-4 text-sm text-left">
                          Marks Obtained
                        </TableHead>
                        <TableHead className="py-3 px-4 text-sm text-left">
                          Grade
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {marksheet.map((mark) => {
                        return (
                          <TableRow key={mark.examId} className="border-t">
                            <TableCell className="py-3 px-4 text-sm">
                              {mark.examDetails.subject.split("-")[0]}
                            </TableCell>
                            <TableCell className="py-3 px-4 text-sm">
                              {mark.examDetails.subject.split("-")[1]}
                            </TableCell>
                            <TableCell className="py-3 px-4 text-sm">
                              {mark.examDetails.totalMarks}
                            </TableCell>
                            <TableCell className="py-3 px-4 text-sm">
                              {mark.securedMarks}
                            </TableCell>
                            <TableCell className="py-3 px-4 text-sm">
                              {getGrade(mark.securedMarks)}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                  <div className="mt-6 text-center text-lg font-medium text-gray-700">
                    <p>
                      Total Percentage: {calculateTotalPercentage(marksheet)} %
                    </p>
                  </div>
                </div>
              </CardContent>

              <div className="my-6 text-center">
                <Button
                  onClick={() => {
                    window.print();
                  }}
                  className="bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Print Marksheet
                </Button>
              </div>
            </>
          ) : (
            <CardContent className="text-center p-10">
              <p>
                No marksheet available. Maybe your result is not published yet.
              </p>
            </CardContent>
          )}
        </Card>
      )}
    </>
  );
}
