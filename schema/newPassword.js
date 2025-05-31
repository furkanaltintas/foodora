import * as Yup from "yup";

export const newPasswordSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character"
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), "null"], "Passwords must match"),
});
