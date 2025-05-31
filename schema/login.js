import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character"
    ),
});
