import Title from "../ui/Title"
import { useFormik } from "formik"
import { profileSchema } from "@/schema/profile"
import Input from "../form/Input"
import axios from "axios"
import { toast } from "react-toastify"

const Account = ({ user }) => {
    const onSubmit = async (values, actions) => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`, values)
            toast.success("Profile updated successfully")
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong")
        }
    }

    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        enableReinitialize: true,
        initialValues: {
            fullName: user?.fullName,
            phoneNumber: user?.phoneNumber,
            email: user?.email,
            address: user?.address,
            job: user?.job,
            bio: user?.bio,
        },
        onSubmit,
        validationSchema: profileSchema
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
            name: "phoneNumber",
            type: "number",
            placeholder: "Your Phone Number",
            value: values.phoneNumber,
            errorMessage: errors.phoneNumber,
            touched: touched.phoneNumber
        },
        {
            id: 3,
            name: "email",
            type: "email",
            placeholder: "Your Email Address",
            value: values.email,
            errorMessage: errors.email,
            touched: touched.email
        },
        {
            id: 4,
            name: "address",
            type: "text",
            placeholder: "Your Address",
            value: values.address,
            errorMessage: errors.address,
            touched: touched.address
        },
        {
            id: 5,
            name: "job",
            type: "text",
            placeholder: "Your Job",
            value: values.job,
            errorMessage: errors.job,
            touched: touched.job
        },
        {
            id: 6,
            name: "bio",
            type: "text",
            placeholder: "Your Bio",
            value: values.bio,
            errorMessage: errors.bio,
            touched: touched.bio
        },
    ]

    return (
        <form onSubmit={handleSubmit}>
            <Title className="text-[40px] text-center md:text-start">Account Settings</Title>
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

export default Account