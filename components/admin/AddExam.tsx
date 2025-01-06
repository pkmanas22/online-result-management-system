import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  useForm,
  Controller,
  FormProvider,
  SubmitHandler,
} from "react-hook-form";
import { allDepartments } from "@/lib/types";

// Define the interface for the form data
interface FormData {
  examName: string;
  subject: string;
  department: string;
  totalMarks: number;
  date: string;
}

const AddExam = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<string[]>([]); // Store subjects

  // Initialize react-hook-form with default values
  const methods = useForm<FormData>({
    defaultValues: {
      department: "MCA", // Default department
      subject: "", // Empty subject by default
    },
  });
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = methods;

  // Watch for department change
  const department = watch("department");

  const fetchSubjects = async (department: string) => {
    try {
      const response = await fetch(`/api/subject?department=${department}`);
      const data = await response.json();

      if (response.ok) {
        setSubjects(data.subjects); // Set subjects if the API call is successful
      } else {
        setSubjects([]);
      }
    } catch (error) {
      console.error(error);
      setError("Error fetching subjects");
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setError(null);
    setLoading(true);

    try {
      const { examName, subject, department, totalMarks, date } = data;
      const res = await fetch("/api/admin/addExam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          examName,
          subject,
          department,
          totalMarks,
          date,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add exam");
      }

      const result = await res.json();

      if (result.success) {
        alert("Exam added successfully");
        reset(); // Reset form after successful submission
        setValue("examName", "")
        setValue("totalMarks", 0)
        setValue("date", "")
      } else {
        alert(result.error || "Error adding exam");
      }
    } catch (err) {
      alert("Error adding exam");
      console.error("Error adding exam:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (department) {
      fetchSubjects(department); // Fetch subjects based on the selected department
      setValue("subject", ""); // Reset the subject field whenever the department changes
    }
  }, [department, setValue]);

  const handleClear = () => {
    reset({
      department: "MCA", // Default department
      subject: "", // Empty subject
      examName: "",
      totalMarks: 0,
      date: "",
    });
    setSubjects([]);
    setError(null);
  };

  return (
    <div className="flex flex-col space-y-5 mt-5">
      <div className="flex items-center text-gray-400 space-x-2">
        <h1>Add Exam</h1>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              {/* Exam Name Field */}
              <Controller
                name="examName"
                control={control}
                rules={{ required: "Exam Name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exam Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Exam Name" {...field} />
                    </FormControl>
                    <FormMessage>
                      {errors.examName && errors.examName.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Department Field */}
              <Controller
                name="department"
                control={control}
                rules={{ required: "Department is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          setValue("subject", ""); // Reset subject when department changes
                        }}
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
                    </FormControl>
                    <FormMessage>
                      {errors.department && errors.department.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Subject Field */}
              <Controller
                name="subject"
                control={control}
                rules={{ required: "Subject is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={subjects.length === 0} // Disable if no subjects
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.length > 0 ? (
                            subjects.map((subject, idx) => (
                              <SelectItem key={idx} value={subject}>
                                {subject}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem disabled value="no-subject">
                              No subjects available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>
                      {errors.subject && errors.subject.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Total Marks Field */}
              <Controller
                name="totalMarks"
                control={control}
                rules={{ required: "Total Marks is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Marks</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage>
                      {errors.totalMarks && errors.totalMarks.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Date Field */}
              <Controller
                name="date"
                control={control}
                rules={{ required: "Date is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage>
                      {errors.date && errors.date.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-5 flex space-x-3">
              <Button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Submit"}
              </Button>
              <Button type="button" onClick={handleClear}>
                Clear
              </Button>
            </div>

            {loading && <div className="mt-4">Loading...</div>}

            {error && <div className="mt-4 text-red-500">{error}</div>}
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default AddExam;
