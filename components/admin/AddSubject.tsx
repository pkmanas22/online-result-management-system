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

// Define the interface for form data
interface AddSubjectFormData {
  subjectName: string;
  subjectCode: string;
  department: string;
}

const AddSubject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [value, setValue] = useState<AddSubjectFormData>({
    subjectName: "",
    subjectCode: "",
    department: "",
  });

  const departments = ["Computer Science", "Mathematics", "Physics"]; // Example departments

  // Initialize react-hook-form
  const methods = useForm<AddSubjectFormData>();
  const { control, handleSubmit } = methods;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit: SubmitHandler<AddSubjectFormData> = (data) => {
    setError({});
    setLoading(true);

    // Simulate an API call or some action
    setTimeout(() => {
      setLoading(false);
      // Reset form after successful submission
      setValue({
        subjectName: "",
        subjectCode: "",
        department: "",
      });
    }, 2000);
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
                      <Input
                        placeholder="Subject Name"
                        {...field}
                        value={value.subjectName}
                        onChange={(e) =>
                          setValue({ ...value, subjectName: e.target.value })
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
            </div>

            <div className="mt-5 flex space-x-3">
              <Button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Submit"}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setValue({
                    subjectName: "",
                    subjectCode: "",
                    department: "",
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

export default AddSubject;
