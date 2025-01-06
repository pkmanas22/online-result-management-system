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
interface AddProfessorFormData {
  name: string;
  email: string;
  password: string;
  department: string;
  contactNumber: string;
}

const AddProfessor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [value, setValue] = useState<AddProfessorFormData>({
    name: "",
    email: "",
    password: "",
    department: "",
    contactNumber: "",
  });

  const departments = ["Computer Science", "Mathematics", "Physics"]; // Example departments

  // Initialize react-hook-form
  const methods = useForm<AddProfessorFormData>();
  const { control, handleSubmit } = methods;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit: SubmitHandler<AddProfessorFormData> = (data) => {
    setError({});
    setLoading(true);

    // Simulate an API call or some action
    setTimeout(() => {
      setLoading(false);
      // Reset form after successful submission
      setValue({
        name: "",
        email: "",
        password: "",
        department: "",
        contactNumber: "",
      });
    }, 2000);
  };

  return (
    <div className="flex flex-col space-y-5 mt-5">
      <div className="flex items-center text-gray-400 space-x-2">
        <h1>Add Professor</h1>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        {/* Wrap the form inside FormProvider to provide context */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Full Name"
                        {...field}
                        value={value.name}
                        onChange={(e) =>
                          setValue({ ...value, name: e.target.value })
                        }
                      />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />

              <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        value={value.email}
                        onChange={(e) =>
                          setValue({ ...value, email: e.target.value })
                        }
                      />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />

              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        {...field}
                        value={value.password}
                        onChange={(e) =>
                          setValue({ ...value, password: e.target.value })
                        }
                      />
                    </FormControl>
                    <FormMessage></FormMessage>
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
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />

              <Controller
                name="contactNumber"
                control={control}
                rules={{ required: "Contact Number is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={value.contactNumber}
                        onChange={(e) =>
                          setValue({ ...value, contactNumber: e.target.value })
                        }
                      />
                    </FormControl>
                    <FormMessage></FormMessage>
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
                    name: "",
                    email: "",
                    password: "",
                    department: "",
                    contactNumber: "",
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

export default AddProfessor;
