import { useFormik } from "formik"
import Title from "../ui/Title"
import Input from "../form/Input"
import { newPasswordSchema } from "@/schema/newPassword"
import { toast } from "react-toastify"
import axios from "axios"

const Password = ({ user }) => {
    const onSubmit = async (values, actions) => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`, values)
            toast.success("Password changed successfully")
            actions.resetForm()
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong")
        }
    }

    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        enableReinitialize: true,
        initialValues: {
            password: "",
            confirmPassword: ""
        },
        onSubmit,
        validationSchema: newPasswordSchema
    })

    const inputs = [
        {
            id: 1,
            name: "password",
            type: "password",
            placeholder: "Your Password",
            value: values.password,
            errorMessage: errors.password,
            touched: touched.password
        },
        {
            id: 2,
            name: "confirmPassword",
            type: "password",
            placeholder: "Your Confirm Password",
            value: values.confirmPassword,
            errorMessage: errors.confirmPassword,
            touched: touched.confirmPassword
        },
    ]

    return (
        <form onSubmit={handleSubmit}>
            <Title className="text-[40px] text-center md:text-start">Password</Title>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
                {
                    inputs.map((input) => (
                        <Input key={input.id} {...input} onChange={handleChange} onBlur={handleBlur} />
                    ))
                }
            </div>
            <button type="submit" className="btn-primary mt-4">Update</button>
        </form>
    )
}

export default Password