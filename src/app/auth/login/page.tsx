"use client";
import LoginForm from "@/app/features/auth/components/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="w-full flex flex-col justify-center items-center gap-2">
        <div className="w-48 lg:w-full flex lg:flex-row justify-center h-32 lg:mb-2">
          <Image
            src="/assets/img/hriss.png"
            alt="Logo"
            width={200}
            height={200}
          />
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
