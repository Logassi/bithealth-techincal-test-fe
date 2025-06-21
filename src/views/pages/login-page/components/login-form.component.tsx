"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import ILogin from "../types";
import LoginSchema from "./schema";
import ErrorHandler from "@/utils/error.handler";
import axiosInstance from "@/libs/axios.lib";
import useAuthStore, { IUser } from "@/stores/user.store";
import { getCookie, setCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

export default function LoginForm() {
  const { onAuthSuccess } = useAuthStore();
  const router = useRouter();

  const handleLogin = async (params: ILogin) => {
    try {
      const { data } = await axiosInstance.post("/v1/user/login", params);

      // console.log(data);
      // const access_token = (getCookie("access_token") as string) || "";
      const access_token = data.access_token;

      // console.log(`the access token : ${access_token}`);

      if (access_token) {
        // console.log("masuk handle global store");
        const user: IUser = jwtDecode(access_token);
        // console.log(`user is : ${user.userName}`);

        setCookie("access_token", access_token);
        // const test = (getCookie("access_token") as string) || "no cookies";

        // console.log(`Cookies set : ${test}`);

        onAuthSuccess(user);

        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "You may now access your dashboard.",
          showConfirmButton: false,
          timer: 3000,
        }).then(() => {
          router.push("/dashboard"); // Redirect to login page after success
        });
      }
      // await handleCookie(onAuthSuccess);
    } catch (error) {
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
      <h2 className="text-2xl font-semibold mb-4">Welcome Back</h2>
      <p className="mb-8 text-gray-200">
        Good to see you again! Log in to access your account.
      </p>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
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
              {isSubmitting ? "Logging-in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
