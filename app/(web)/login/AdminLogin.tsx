import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Input, Button } from "@shadcn/ui";
import { Eye, EyeOff } from "react-feather"; // Use Feather icons or Heroicons

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // For handling any login errors
  const [formErrors, setFormErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setTranslate(true);
    }, 1000);
  }, []);

  const validateForm = () => {
    const errors: { username?: string; password?: string } = {};
    if (!username) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";
    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null); // Reset any previous error messages
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Simulate a login API call
      const response = await mockLoginAPI(username, password);

      if (response.success) {
        // Redirect on successful login
        router.push("/admin-dashboard");
      } else {
        // Set an error message if login fails
        setErrorMessage(response.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Mock API function to simulate login
  const mockLoginAPI = async (username: string, password: string) => {
    return new Promise<{ success: boolean; message?: string }>((resolve) =>
      setTimeout(() => {
        if (username === "admin" && password === "Admin@123") {
          resolve({ success: true });
        } else {
          resolve({ success: false, message: "Invalid credentials" });
        }
      }, 1000)
    );
  };

  return (
    <div className="bg-[#04bd7d] h-screen w-screen flex items-center justify-center">
      <a href="/">
        <Button className="w-32 hover:scale-105 transition-all duration-150 rounded-lg flex items-center justify-center text-white text-base py-1 bg-[#FF2400]">
          Home
        </Button>
      </a>
      <div className="grid grid-cols-2">
        <div className="h-96 w-96 bg-white flex items-center justify-center duration-1000 transition-all rounded-3xl shadow-2xl">
          <h1 className="text-[3rem] font-bold text-center">
            Admin
            <br />
            Login
          </h1>
        </div>
        <form
          onSubmit={onSubmit}
          className={`${
            loading ? "h-[27rem]" : "h-96"
          } w-96 bg-[#2c2f35] flex flex-col items-center justify-center duration-1000 transition-all space-y-6 rounded-3xl shadow-2xl`}
        >
          <h1 className="text-white text-3xl font-semibold">Admin</h1>
          <div className="space-y-1">
            <p className="text-[#515966] font-bold text-sm">Username</p>
            <div
              className={`bg-[#515966] rounded-lg w-[14rem] flex items-center ${
                formErrors.username ? "border border-red-500" : ""
              }`}
            >
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
              />
            </div>
            {formErrors.username && (
              <small className="text-red-500">{formErrors.username}</small>
            )}
          </div>
          <div className="space-y-1">
            <p className="text-[#515966] font-bold text-sm">Password</p>
            <div
              className={`bg-[#515966] rounded-lg px-2 flex items-center ${
                formErrors.password ? "border border-red-500" : ""
              }`}
            >
              <Input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#515966] text-white rounded-lg outline-none py-2 placeholder:text-sm"
              />
              {showPassword ? (
                <Eye
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer"
                />
              ) : (
                <EyeOff
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer"
                />
              )}
            </div>
            {formErrors.password && (
              <small className="text-red-500">{formErrors.password}</small>
            )}
          </div>
          <Button
            type="submit"
            className="w-32 hover:scale-105 transition-all duration-150 rounded-lg flex items-center justify-center text-white text-base py-1 bg-[#04bd7d]"
          >
            Login
          </Button>

          {/* Loading Spinner from Tailwind */}
          {loading && (
            <div className="flex items-center justify-center mt-4">
              <div className="w-10 h-10 border-4 border-t-transparent border-[#ffffff] rounded-full animate-spin"></div>
            </div>
          )}

          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
