import React, { useState } from "react";
import { useRouter } from "next/router";

// ShadCN/UI Components
import { Button, Input } from "@shadcn/ui";
import { Eye, EyeOff } from "react-feather"; // Importing icons from react-feather, which works well with ShadCN/UI

// Custom Loading Spinner
const LoadingSpinner: React.FC = () => (
  <div className="w-16 h-16 border-4 border-t-4 border-white rounded-full animate-spin"></div>
);

const StudentLogin: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate an API call to handle login (you can replace this with actual logic)
    setTimeout(() => {
      setLoading(false);
      // On success, navigate to another page (e.g., dashboard)
      router.push("/dashboard"); // Change this URL as necessary
    }, 2000);
  };

  return (
    <div className="bg-[#d65158] h-screen w-screen flex items-center justify-center">
      <a href="/">
        <Button className="w-32 hover:scale-105 transition-all duration-150 rounded-lg flex items-center justify-center text-white text-base py-1 bg-[#FF2400]">
          Home
        </Button>
      </a>
      <div className="grid grid-cols-2">
        <div className="h-96 w-96 bg-white flex items-center justify-center duration-1000 transition-all rounded-3xl shadow-2xl">
          <h1 className="text-[3rem] font-bold text-center">
            Student
            <br />
            Login
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className={`${
            loading ? "h-[27rem]" : "h-96"
          } w-96 bg-[#2c2f35] flex flex-col items-center justify-center duration-1000 transition-all space-y-6 rounded-3xl shadow-2xl`}
        >
          <h1 className="text-white text-3xl font-semibold">Student</h1>

          <div className="space-y-1">
            <p className="text-[#515966] font-bold text-sm">Username</p>
            <div className="bg-[#515966] rounded-lg w-[14rem] flex items-center">
              <Input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Username"
                className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-[#515966] font-bold text-sm">Password</p>
            <div className="bg-[#515966] rounded-lg px-2 flex items-center">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                className="bg-[#515966] text-white rounded-lg outline-none py-2 placeholder:text-sm"
              />
              <Button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                variant="ghost"
                className="text-white ml-2"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-32 hover:scale-105 transition-all duration-150 rounded-lg flex items-center justify-center text-white text-base py-1 bg-[#04bd7d]"
          >
            Login
          </Button>

          {loading && (
            <div className="flex justify-center mt-4">
              <LoadingSpinner />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
