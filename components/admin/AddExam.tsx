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
import { useForm, Controller, FormProvider } from "react-hook-form";

const AddExam = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    examName: "",
    subjectCode: "",
    department: "",
    totalMarks: 100,
    year: "",
    date: "",
  });

  const departments = ["Computer Science", "Mathematics", "Physics"]; // Example departments
  const years = ["2021", "2022", "2023", "2024"]; // Example years

  // Initialize react-hook-form
  const methods = useForm();
  const { control, handleSubmit } = methods;

  const onSubmit = (data) => {
    setError({});
    setLoading(true);

    // Simulate an API call or some action
    setTimeout(() => {
      setLoading(false);
      // Reset form after successful submission
      setValue({
        examName: "",
        subjectCode: "",
        department: "",
        totalMarks: 100,
        year: "",
        date: "",
      });
    }, 2000);
  };

  return (
    <div className="flex flex-col space-y-5 mt-5">
      <div className="flex items-center text-gray-400 space-x-2">
        <h1>Add Exam</h1>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        {/* Wrap the form inside FormProvider to provide context */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Controller
                name="examName"
                control={control}
                rules={{ required: "Exam Name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exam Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Exam Name"
                        {...field}
                        value={value.examName}
                        onChange={(e) =>
                          setValue({ ...value, examName: e.target.value })
                        }
                      />
                    </FormControl>
                    <FormMessage />
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
                      <Input
                        placeholder="Subject Code"
                        {...field}
                        value={value.subjectCode}
                        onChange={(e) =>
                          setValue({ ...value, subjectCode: e.target.value })
                        }
                      />
                    </FormControl>
                    <FormMessage />
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
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((department, idx) => (
                            <SelectItem key={idx} value={department}>
                              {department}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Controller
                name="totalMarks"
                control={control}
                rules={{ required: "Total Marks is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Marks</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={value.totalMarks}
                        onChange={(e) =>
                          setValue({ ...value, totalMarks: parseInt(e.target.value) })
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Controller
                name="year"
                control={control}
                rules={{ required: "Year is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((year, idx) => (
                            <SelectItem key={idx} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Controller
                name="date"
                control={control}
                rules={{ required: "Date is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={value.date}
                        onChange={(e) =>
                          setValue({ ...value, date: e.target.value })
                        }
                      />
                    </FormControl>
                    <FormMessage />
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
                  setValue({
                    examName: "",
                    subjectCode: "",
                    department: "",
                    totalMarks: 100,
                    year: "",
                    date: "",
                  });
                  setError({});
                }}
              >
                Clear
              </Button>
            </div>

            {loading && <div className="mt-4">Loading...</div>}

            {error && (
              <div className="mt-4 text-red-500">
                {/* {error.emailError || error.backendError} */}
                Some error occurred
              </div>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default AddExam;
