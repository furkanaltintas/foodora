import * as Yup from 'yup';

export const footerSchema = Yup.object({
  location: Yup.string().required("Location is required"),
  phoneNumber: Yup.string().required("Phone number is required").min(10, "Phone number must be at least 10 characters"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  desc: Yup.number().required("Description is required"),
  day: Yup.string().required("Da is required"),
  time: Yup.string().required("Time is required"),
})