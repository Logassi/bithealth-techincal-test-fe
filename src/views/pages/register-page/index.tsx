import React from "react";
import RegisterForm from "./components/register-form.component";

export default function RegisterView() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side - Form */}
      <div className="flex flex-1 items-center justify-center bg-gray-50">
        <RegisterForm />
      </div>

      {/* Right Side - Image (Hidden on Small Screens) */}
      <div className="hidden md:flex w-1/2">
        <img
          src="/registerIMG.jpg"
          alt="Decorative"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
