import { object, string } from "yup";

const RegisterSchema = object({
  name: string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters long"),
  email: string().email("Invalid email format").required("Email is required"),
  password: string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  role_id: string()
    .oneOf(["1", "2"], "Role must be either Admin or Staff")
    .required("Role is required"),
});

export default RegisterSchema;
