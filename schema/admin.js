import * as Yup from "yup";

export const adminSchema = Yup.object({
  username: Yup.string()
  .required("Username is required")
  .min(3, "Username must be at least 3 characters"),
  
  password: Yup.string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters"),
});


// password: Yup.string()
//     .required("Password is required")
//     .min(8, "Password must be at least 8 characters")
//     .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
//       "Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character"
//     )
