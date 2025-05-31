import { useFormik } from "formik"
import Input from "@/components/form/Input"
import Title from "@/components/ui/Title"
import Link from "next/link"
import { adminSchema } from "@/schema/admin"
import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/router"

const Index = () => {
    const { push } = useRouter()

    const onSubmit = async (values, actions) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin`, values)
            if (res.status === 200) {
                console.log(res)
                actions.resetForm();
                toast.success("Admin Login Successfull")
                push("/admin/profile")
            } else {
                toast.error(res.data.message)
            }

        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)
        }
    }

    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit,
        validationSchema: adminSchema
    })

    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Your Username",
            value: values.username,
            errorMessage: errors.username,
            touched: touched.username
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Your Password",
            value: values.password,
            errorMessage: errors.password,
            touched: touched.password
        },
    ]

    return (
        <div className="container mx-auto py-5">
            <div className="flex flex-col items-center my-20 mx-auto md:w-1/2 w-full">
                <Title className="text-[40px] mb-6">Admin Login</Title>
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
                        <button className="btn-primary">LOGIN</button>
                        <Link href="/">
                            <span className="text-sm underline cursor-pointer text-secondary hover:text-primary transition-all">
                                Home Page</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export const getServerSideProps = async (ctx) => {
    const token = ctx.req.cookies.token
    if (token) {
        return {
            redirect: {
                destination: "/admin/profile",
                permanent: false
            }
        }
    }
    return {
        props: {}
    }
}

export default Index