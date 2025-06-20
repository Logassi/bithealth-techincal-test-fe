"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import RegisterSchema from "./schema";
import IRegister from "../types";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import ErrorHandler from "@/utils/error.handler";
import axiosInstance from "@/libs/axios.lib";

export default function RegisterForm() {
  const router = useRouter();

  const handleRegister = async (params: IRegister) => {
    try {
      const response = await axiosInstance.post("/api/register", params);

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "You can now log in with your credentials.",
        showConfirmButton: false,
        timer: 4500,
      }).then(() => {
        router.push("/login"); // Redirect to login page after success
      });
    } catch (error) {
      // console.log(error);
      ErrorHandler(error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-purple-500 to-indigo-600 text-white py-10 px-6 rounded-lg shadow-lg">
      {/* Logo */}
      <h1
        className="text-4xl font-bold mb-6 cursor-pointer hover:opacity-90 transition"
        onClick={() => router.push("/")}
      >
        Logo
      </h1>

      {/* Form Header */}
      <h2 className="text-2xl font-semibold mb-4">Let's Begin</h2>
      <p className="mb-8 text-gray-200">
        Create your account to start your journey with us!
      </p>

      <Formik
        initialValues={{
          email: "",
          userName: "",
          password: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={handleRegister}
      >
        {({ isSubmitting }) => (
          <Form className="w-full max-w-md">
            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Email</label>
              <Field
                type="text"
                name="email"
                className="w-full px-4 py-2 text-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            {/* User Name Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                User Name
              </label>
              <Field
                type="text"
                name="userName"
                className="w-full px-4 py-2 text-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <ErrorMessage
                name="userName"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Password</label>
              <Field
                type="password"
                name="password"
                className="w-full px-4 py-2 text-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-md font-semibold ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 transition"
              } text-white`}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
