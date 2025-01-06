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

// Define the interface for form data
interface AddProfessorFormData {
  name: string;
  email: string;
  password: string;
  department: string;
  contactNumber: string;
  subject: string; // New field for subject selection
}

const AddProfessor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<string[]>([]); // State for storing subjects

  // Initialize react-hook-form with default values
  const methods = useForm<AddProfessorFormData>({
    defaultValues: {
      department: "MCA", // Default department is MCA
      subject: "", // Empty subject by default
    },
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue, // To update form values programmatically
    watch, // Watch to listen to form values
  } = methods;

  // Watch for department change
  const department = watch("department");

  const fetchSubjects = async (department: string) => {
    try {
      // Simulate an API call to fetch subjects based on department
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

  const onSubmit: SubmitHandler<AddProfessorFormData> = async (data) => {
    setError(null);
    setLoading(true);

    // Extract the form data
    const { name, email, password, department, contactNumber, subject } = data;

    // Perform API call to add the professor
    try {
      const res = await fetch("/api/admin/addFaculty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          department,
          contactNumber,
          subject,
        }),
      });

      if (!res.ok) {
        alert("Failed to add professor");
      } else {
        alert("Professor added successfully");
        reset(); // Reset the form after successful submission
      }
    } catch (err) {
      setError("Some error occurred");
      console.error("Error adding professor:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (department) {
      fetchSubjects(department); // Fetch subjects based on the selected department
      setValue("subject", ""); // Reset the subject field whenever the department changes
    }
  }, [department, setValue]); // Now listens to department change

  const handleClear = () => {
    reset({
      department: "MCA", // Default department is MCA
      subject: "", // Empty subject by default
      contactNumber: "", // Reset contact number
      name: "", // Reset name
      email: "", // Reset email
      password: "", // Reset password
    });
    setSubjects([]); // Clear the subjects state
    setError(null); // Clear any error messages
  };


  return (
    <div className="flex flex-col space-y-5 mt-5">
      <div className="flex items-center text-gray-400 space-x-2">
        <h1>Add Professor</h1>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              {/* Name Field */}
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Name" {...field} />
                    </FormControl>
                    <FormMessage>
                      {errors.name && errors.name.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage>
                      {errors.email && errors.email.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Default Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {errors.password && errors.password.message}
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
                            <SelectItem disabled value={"no-subject"}>
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

              {/* Contact Number Field */}
              <Controller
                name="contactNumber"
                control={control}
                rules={{ required: "Contact Number is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage>
                      {errors.contactNumber && errors.contactNumber.message}
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

export default AddProfessor;
