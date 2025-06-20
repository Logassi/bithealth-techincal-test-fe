import React from "react";
import LoginForm from "./components/login-form.component";

export default function LoginView() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side - Image (Hidden on Small Screens) */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-50">
        <img
          src="/loginIMG.jpg"
          alt="Decorative"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex flex-1 items-center justify-center bg-white">
        <LoginForm />
      </div>
    </div>
  );
}
