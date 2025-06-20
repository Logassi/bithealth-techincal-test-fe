import { object, string } from "yup";

const LoginSchema = object({
  email: string().email("Invalid email format").required("Email is required"),
  password: string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

export default LoginSchema;
