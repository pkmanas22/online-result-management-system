import { useState } from "react";
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

// Define the interface for form data
interface AddSubjectFormData {
  subjectName: string;
  subjectCode: string;
  department: string;
}

const AddSubject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Error state to hold error message

  // Initialize react-hook-form
  const methods = useForm<AddSubjectFormData>({
    defaultValues: {
      subjectName: "",
      subjectCode: "",
      department: "",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<AddSubjectFormData> = async (data) => {
    setError(null); // Reset error state
    setLoading(true);

    try {
      const { subjectName, subjectCode, department } = data;

      const res = await fetch("/api/admin/addSubject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subjectName,
          subjectCode,
          department,
        }),
      });

      const responseData = await res.json();

      if (!res.ok) {
        // Set the server error message
        alert(responseData.error || "Failed to add subject");
      } else {
        alert("Subject added successfully");
        reset(); // Reset the form after successful submission
      }
    } catch (err) {
      // Catch error from fetch or other unexpected errors
      alert("Some error occurred");
      console.error("Error adding subject:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-5 mt-5">
      <div className="flex items-center text-gray-400 space-x-2">
        <h1>Add Subject</h1>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        {/* Wrap the form inside FormProvider to provide context */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Controller
                name="subjectName"
                control={control}
                rules={{ required: "Subject Name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Subject Name" {...field} />
                    </FormControl>
                    <FormMessage>
                      {errors.subjectName && errors.subjectName.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <Controller
                name="subjectCode"
                control={control}
                rules={{ required: "Subject Code is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Subject Code" {...field} />
                    </FormControl>
                    <FormMessage>
                      {errors.subjectCode && errors.subjectCode.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

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
                        onValueChange={field.onChange}
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
            </div>

            <div className="mt-5 flex space-x-3">
              <Button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Submit"}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  reset(); // Reset form values on clear
                  setError(null); // Reset error state
                }}
              >
                Clear
              </Button>
            </div>

            {loading && <div className="mt-4">Loading...</div>}

            {error && (
              <div className="mt-4 text-red-500">
                {error} {/* Display the error message */}
              </div>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default AddSubject;
