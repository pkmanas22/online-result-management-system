import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import LoginButton from "@/components/LoginButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl space-y-8 ">
        <header className="flex items-center justify-center space-x-4 bg-white shadow-md rounded-full p-4">
          <Image
            src="/logo.png"
            width={48}
            height={48}
            className="rounded-full"
            alt="OUTR Logo"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
            ODISHA UNIVERSITY OF TECHNOLOGY AND RESEARCH
          </h1>
          <Image
            src="/logo.png"
            width={48}
            height={48}
            className="rounded-full"
            alt="OUTR Logo"
          />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-60">
          {[
            { role: "Student", hasRegister: true },
            { role: "Faculty", hasRegister: false },
            { role: "Admin", hasRegister: false },
          ].map(({ role, hasRegister }) => (
            <Card
              key={role}
              className="bg-white shadow-lg border-gray-200 h-full flex flex-col justify-evenly"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-gray-800">
                  {role}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <LoginButton role={role} />
                {hasRegister && (
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-gray-800 text-gray-800 hover:bg-gray-100"
                  >
                    <Link href="#">Register</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
