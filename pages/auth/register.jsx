import { useFormik } from "formik"
import { registerSchema } from "@/schema/register"
import { toast } from "react-toastify"
import Input from "@/components/form/Input"
import Title from "@/components/ui/Title"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/router"

const Register = () => {
    const { push } = useRouter()

    const onSubmit = async (values, actions) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, values);
            if (res.status === 201) {
                toast.success("Register Successfull");
                push("/auth/login")
                actions.resetForm();
            }
        } catch (err) {
            toast.error(err.response.data.message);
            console.log(err);
        }
    }

    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        onSubmit,
        validationSchema: registerSchema
    })

    const inputs = [
        {
            id: 1,
            name: "fullName",
            type: "text",
            placeholder: "Your Full Name",
            value: values.fullName,
            errorMessage: errors.fullName,
            touched: touched.fullName
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Your Email",
            value: values.email,
            errorMessage: errors.email,
            touched: touched.email
        },
        {
            id: 3,
            name: "password",
            type: "password",
            placeholder: "Your Password",
            value: values.password,
            errorMessage: errors.password,
            touched: touched.password
        },
        {
            id: 4,
            name: "confirmPassword",
            type: "password",
            placeholder: "Your Password Again",
            value: values.confirmPassword,
            errorMessage: errors.confirmPassword,
            touched: touched.confirmPassword
        },
    ]

    return (
        <div className="container mx-auto">
            <div className="flex flex-col items-center my-20 mx-auto md:w-1/2 w-full">
                <Title className="text-[40px] mb-6">Register</Title>
                <form className="flex flex-col gap-y-2 w-full" onSubmit={handleSubmit}>
                    {
                        inputs.map((input) => (
                            <Input
                                key={input.id}
                                name={input.name}
                                type={input.type}
                                placeholder={input.placeholder}
                                value={input.value}
                                errorMessage={input.errorMessage}
                                touched={input.touched}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        ))
                    }
                    <div className="flex flex-col w-full gap-y-3 mt-3">
                        <button type="submit" className="btn-primary">REGISTER</button>
                        <Link href="/auth/login">
                            <span className="text-sm underline cursor-pointer text-secondary hover:text-primary transition-all">Do you have a account?</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register