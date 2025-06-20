import { object, string } from "yup";

const RegisterSchema = object({
  email: string().email("Invalid email format").required("Email is required"),
  userName: string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters long"),
  password: string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

export default RegisterSchema;
