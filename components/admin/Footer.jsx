import { footerSchema } from "@/schema/footer";
import { useFormik } from "formik";
import Title from "../ui/Title";
import Input from "../form/Input";
import { useState } from "react";


const Footer = () => {

    const [linkAddress, setLinkAddress] = useState("");
    const [iconName, setIconName] = useState("");
    const [icons, setIcons] = useState([
        "fab fa-facebook-f", "fab fa-twitter", "fab fa-instagram", "fab fa-linkedin-in",
    ]);

    const onSubmit = async (values, actions) => {
        await new Promise((resolve) => setTimeout(resolve, 4000))
        actions.resetForm();
    }

    const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            location: "",
            email: "",
            phoneNumber: "",
            desc: "",
            day: "",
            time: "",
        },
        onSubmit,
        validationSchema: footerSchema
    })

    const inputs = [
        {
            id: 1,
            name: "location",
            type: "text",
            placeholder: "Your Location",
            value: values.location,
            errorMessage: errors.location,
            touched: touched.location
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Your Email Address",
            value: values.email,
            errorMessage: errors.email,
            touched: touched.email
        },
        {
            id: 3,
            name: "phoneNumber",
            type: "number",
            placeholder: "Your Phone Number",
            value: values.phoneNumber,
            errorMessage: errors.phoneNumber,
            touched: touched.phoneNumber
        },
        {
            id: 4,
            name: "desc",
            type: "text",
            placeholder: "Your Description",
            value: values.desc,
            errorMessage: errors.desc,
            touched: touched.desc
        },
        {
            id: 5,
            name: "day",
            type: "text",
            placeholder: "Update Day",
            value: values.day,
            errorMessage: errors.day,
            touched: touched.day
        },
        {
            id: 6,
            name: "time",
            type: "text",
            placeholder: "Update Time",
            value: values.time,
            errorMessage: errors.time,
            touched: touched.time
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
            <div className="mt-4 flex justify-between md:items-center md:flex-row flex-col gap-4">
                <div className="flex items-center gap-4">
                    <Input placeholder="Link Address" defaultValue="https://" value={linkAddress} onChange={e => setLinkAddress(e.target.value)} />
                    <Input placeholder="Icon Name" defaultValue="fa fa-" value={iconName} onChange={e => setIconName(e.target.value)} />
                    <button className="btn-primary w-full" type="button" onClick={() => {
                        setIcons([...icons, iconName]);
                        setIconName("");
                        setLinkAddress("");
                    }}>Icon Add</button>
                </div>
                <ul className="flex items-center justify-center md:justify-normal gap-8">
                    {
                        icons.length > 0 ? (
                            icons.map((icon, index) => (
                                <li key={index}>
                                    <i className={`${icon} text-2xl`}></i>
                                    <button className="text-danger" onClick={() => setIcons(icons.filter((item) => item !== icon))}>
                                        <i className="fa fa-trash text-xl ml-2"></i>
                                    </button>
                                </li>
                            ))
                        ) : (
                            <p className="text-danger">No icons added</p>
                        )
                    }
                </ul>
            </div>
            <button type="submit" className="btn-primary mt-4 w-full md:w-fit">Update</button>
        </form>
    )
}

export default Footer